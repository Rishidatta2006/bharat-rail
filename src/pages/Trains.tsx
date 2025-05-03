
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import TrainCard from '@/components/ui/TrainCard';
import { searchTrains, getStations } from '@/utils/db';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Trains = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // Get query parameters
  const fromQuery = queryParams.get('from') || '';
  const toQuery = queryParams.get('to') || '';
  const dateQuery = queryParams.get('date') || '';
  const classQuery = queryParams.get('class') || '';
  const quotaQuery = queryParams.get('quota') || 'GN';
  
  const stations = getStations().map(station => station.name);
  
  const [fromStation, setFromStation] = useState(fromQuery);
  const [toStation, setToStation] = useState(toQuery);
  const [journeyDate, setJourneyDate] = useState(dateQuery);
  const [travelClass, setTravelClass] = useState(classQuery);
  const [quota, setQuota] = useState(quotaQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const travelClasses = [
    { value: "Sleeper", label: "Sleeper Class" },
    { value: "AC", label: "AC Class" },
    { value: "General", label: "General Class" }
  ];

  const quotas = [
    { value: "GN", label: "General Quota (GN)" },
    { value: "TQ", label: "Tatkal Quota (TQ)" },
    { value: "LD", label: "Ladies Quota (LD)" },
    { value: "DF", label: "Defense Quota (DF)" },
    { value: "SR", label: "Senior Citizen Quota (SR)" }
  ];

  // Run search if URL has query parameters
  useEffect(() => {
    if (fromQuery && toQuery) {
      handleSearch();
    }
  }, []);

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
        // Filter by class if selected
        let filteredResults = result.data;
        if (travelClass) {
          filteredResults = filteredResults.filter((train: any) => 
            train.classes.includes(travelClass)
          );
        }
        
        // Apply tatkal filter if quota is TQ
        if (quota === 'TQ') {
          filteredResults = filteredResults.filter((train: any) => 
            train.tatkal_available === 'Yes'
          );
        }
        
        setSearchResults(filteredResults);
        toast({
          title: "Search Complete",
          description: `Found ${filteredResults.length} train(s) for this route`
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  <div className="lg:col-span-1">
                    <label className="text-sm font-medium block mb-1">From</label>
                    <Select value={fromStation} onValueChange={setFromStation}>
                      <SelectTrigger>
                        <SelectValue placeholder="From station" />
                      </SelectTrigger>
                      <SelectContent>
                        {stations.map((station) => (
                          <SelectItem key={station} value={station}>{station}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <label className="text-sm font-medium block mb-1">To</label>
                    <Select value={toStation} onValueChange={setToStation}>
                      <SelectTrigger>
                        <SelectValue placeholder="To station" />
                      </SelectTrigger>
                      <SelectContent>
                        {stations.map((station) => (
                          <SelectItem key={station} value={station}>{station}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <label className="text-sm font-medium block mb-1">Date</label>
                    <Input 
                      type="date"
                      placeholder="Journey date" 
                      value={journeyDate}
                      onChange={(e) => setJourneyDate(e.target.value)}
                    />
                  </div>
                  
                  <div className="lg:col-span-1">
                    <label className="text-sm font-medium block mb-1">Class</label>
                    <Select value={travelClass} onValueChange={setTravelClass}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any class</SelectItem>
                        {travelClasses.map((c) => (
                          <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <label className="text-sm font-medium block mb-1">Quota</label>
                    <Select value={quota} onValueChange={setQuota}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {quotas.map((q) => (
                          <SelectItem key={q.value} value={q.value}>{q.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <label className="text-sm font-medium block mb-1 opacity-0">Search</label>
                    <Button 
                      className="w-full bg-primary-500 hover:bg-primary-600"
                      onClick={handleSearch}
                      disabled={isLoading}
                    >
                      {isLoading ? "Searching..." : "Search"}
                    </Button>
                  </div>
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
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6">Popular Trains</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[17655, 17656, 17657].map((trainNumber) => {
                  const trainInfo = searchTrains('', '', '').data.find((t: any) => t.id === trainNumber);
                  return trainInfo ? <TrainCard key={trainInfo.id} train={trainInfo} /> : null;
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trains;
