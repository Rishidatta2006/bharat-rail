
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import TrainCard from '@/components/ui/TrainCard';
import { searchTrains } from '@/utils/db';

const Trains = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Function to handle the search
  const handleSearch = () => {
    if (!fromStation || !toStation) {
      toast({
        title: "Missing Information",
        description: "Please enter both from and to stations",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      // Search trains using the db utility
      const result = searchTrains(fromStation, toStation, journeyDate);
      
      if (result.success) {
        setSearchResults(result.data);
        toast({
          title: "Search Complete",
          description: result.message
        });
      } else {
        setSearchResults([]);
        toast({
          title: "No Trains Found",
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Error searching trains:", error);
      toast({
        title: "Search Error",
        description: "An error occurred while searching for trains",
        variant: "destructive"
      });
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Available Trains</h1>
            <Card className="bg-white shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input 
                    placeholder="From station" 
                    className="flex-1"
                    value={fromStation}
                    onChange={(e) => setFromStation(e.target.value)}
                  />
                  <Input 
                    placeholder="To station" 
                    className="flex-1"
                    value={toStation}
                    onChange={(e) => setToStation(e.target.value)}
                  />
                  <Input 
                    type="date"
                    placeholder="Journey date" 
                    className="flex-1"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                  />
                  <Button 
                    className="bg-primary-500 hover:bg-primary-600"
                    onClick={handleSearch}
                    disabled={isLoading}
                  >
                    {isLoading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {hasSearched && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                {searchResults.length > 0 
                  ? `Available Trains (${searchResults.length})`
                  : "No Trains Found"}
              </h2>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.map((train) => (
                    <TrainCard key={train.id} train={train} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    No trains found for this route. Try different stations or dates.
                  </p>
                </div>
              )}
            </>
          )}
          
          {!hasSearched && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 4, 6].map((id) => {
                const train = searchTrains('', '', '').data.find((t: any) => t.id === id);
                return train ? <TrainCard key={train.id} train={train} /> : null;
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trains;
