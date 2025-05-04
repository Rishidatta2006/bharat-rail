
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Clock, TrainFront, Ticket } from 'lucide-react';
import { getStations, searchTrains } from '@/utils/db';

// Map states to Tatkal booking times
const stateTatkalTimings = {
  'Tamil Nadu': '10:00',
  'Maharashtra': '10:30',
  'Karnataka': '11:00',
  'Telangana': '11:30',
  'Delhi': '10:15',
  'West Bengal': '10:45',
  'Gujarat': '11:15',
  'Andhra Pradesh': '11:45',
  'Uttar Pradesh': '10:00',
  'Kerala': '10:30',
  'Punjab': '11:00',
  'Rajasthan': '11:30',
  'Madhya Pradesh': '10:15',
  'Other': '12:00'
};

const Tatkal = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');
  const [tatkalTrains, setTatkalTrains] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const stations = getStations();
  const statesList = [...new Set(stations.map((station) => station.state))].filter(Boolean);

  // Get unique tatkal timings
  const uniqueTimings = [...new Set(Object.values(stateTatkalTimings))].sort();

  // Filter trains by state or timing
  const handleSearch = () => {
    setIsLoading(true);
    
    try {
      const allTrains = searchTrains('', '', '').data;
      
      let filteredTrains = allTrains.filter((train: any) => 
        train.tatkal_available === 'Yes'
      );
      
      // Apply state filter
      if (selectedState) {
        filteredTrains = filteredTrains.filter((train: any) => {
          const route = searchTrains('', '', '').data.find((t: any) => t.id === train.id);
          if (route) {
            const startingStationName = route.from;
            const startingStation = stations.find(station => station.name === startingStationName);
            return startingStation && startingStation.state === selectedState;
          }
          return false;
        });
      }
      
      // Apply timing filter
      if (selectedTiming) {
        filteredTrains = filteredTrains.filter((train: any) => {
          return train.tatkal_booking_start_time === selectedTiming;
        });
      }
      
      // Enhance train data with state information
      const enhancedTrains = filteredTrains.map((train: any) => {
        const startingStationName = train.from;
        const startingStation = stations.find(station => station.name === startingStationName);
        const state = startingStation ? startingStation.state : 'Unknown';
        
        return {
          ...train,
          starting_station_state: state,
          tatkal_booking_time: stateTatkalTimings[state as keyof typeof stateTatkalTimings] || '12:00'
        };
      });
      
      setTatkalTrains(enhancedTrains);
      
      if (enhancedTrains.length === 0) {
        toast({
          title: "No trains found",
          description: "No tatkal trains match your search criteria",
        });
      } else {
        toast({
          title: "Search complete",
          description: `Found ${enhancedTrains.length} tatkal trains`,
        });
      }
    } catch (error) {
      console.error("Error searching tatkal trains:", error);
      toast({
        title: "Search Error",
        description: "An error occurred while searching for tatkal trains",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load all tatkal trains on page load
  useEffect(() => {
    handleSearch();
  }, []);
  
  // Navigate to train booking with tatkal pre-selected
  const handleBookTrain = (train: any) => {
    navigate(`/trains?from=${train.from}&to=${train.to}&quota=TQ`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-primary-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <Ticket className="h-6 w-6 mr-2 text-primary-600" />
              <h1 className="text-3xl font-bold text-gray-900">Tatkal Booking</h1>
            </div>
            
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">
                  Search Tatkal Trains by State or Timing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="state" className="mb-1 block">Starting State</Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="All States" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All States</SelectItem>
                        {statesList.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="timing" className="mb-1 block">Tatkal Timing</Label>
                    <Select value={selectedTiming} onValueChange={setSelectedTiming}>
                      <SelectTrigger id="timing">
                        <SelectValue placeholder="All Timings" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Timings</SelectItem>
                        {uniqueTimings.map((time) => (
                          <SelectItem key={time} value={time}>{time} AM</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end">
                    <Button 
                      className="w-full" 
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
        
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">
            Tatkal Booking Timings by State
          </h2>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="text-gray-600 mb-4">
                This feature aims to reduce server congestion and improve fairness for users across different regions.
                Tatkal booking times are staggered based on the train's starting station state.
              </p>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>State</TableHead>
                    <TableHead>Tatkal Booking Opens At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(stateTatkalTimings).map(([state, time]) => (
                    <TableRow key={state}>
                      <TableCell className="font-medium">{state}</TableCell>
                      <TableCell>{time} AM</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <h2 className="text-2xl font-bold mb-6">
            Available Tatkal Trains ({tatkalTrains.length})
          </h2>
          
          {tatkalTrains.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Train Number</TableHead>
                    <TableHead>Train Name</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Starting State</TableHead>
                    <TableHead>Tatkal Time</TableHead>
                    <TableHead>Available Classes</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tatkalTrains.map((train) => (
                    <TableRow key={train.id}>
                      <TableCell className="font-medium">{train.train_number}</TableCell>
                      <TableCell>{train.train_name}</TableCell>
                      <TableCell>{train.from}</TableCell>
                      <TableCell>{train.to}</TableCell>
                      <TableCell>{train.starting_station_state}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {train.tatkal_booking_start_time} AM
                        </div>
                      </TableCell>
                      <TableCell>
                        {train.classes.join(', ')}
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          onClick={() => handleBookTrain(train)}
                        >
                          Book Tatkal
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                No tatkal trains found. Try different search criteria.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tatkal;
