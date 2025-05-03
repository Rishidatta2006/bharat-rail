
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { getPNRStatus } from '@/utils/db';
import { Ticket, User, Calendar, TrainFront } from 'lucide-react';

interface PNRDetails {
  pnr: string;
  status: string;
  bookingDate: string;
  journeyDate: string;
  class: string;
  passengers: {
    name: string;
    age: number;
    gender: string;
    seat: string;
    status: string;
  }[];
  train: {
    name: string;
    number: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
  };
  bookingType: string;
  totalFare: number;
}

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pnrDetails, setPnrDetails] = useState<PNRDetails | null>(null);
  const [error, setError] = useState('');
  
  const { toast } = useToast();

  const handleCheckStatus = async () => {
    if (!pnrNumber.trim()) {
      toast({
        title: "PNR Required",
        description: "Please enter a PNR number",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await getPNRStatus(pnrNumber);
      
      if (result.success && result.booking) {
        setPnrDetails(result.booking as PNRDetails);
        toast({
          title: "PNR Status Retrieved",
          description: "Your booking details have been found",
        });
      } else {
        setPnrDetails(null);
        setError(result.message || "No booking found with this PNR");
        toast({
          title: "PNR Not Found",
          description: "No booking found with this PNR number",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error checking PNR status:", error);
      setPnrDetails(null);
      setError("An error occurred while checking PNR status");
      toast({
        title: "Error",
        description: "An error occurred while checking PNR status",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Sample PNRs for testing: 8456721890, 7651298340, 9823145670
  const samplePnrs = ['8456721890', '7651298340', '9823145670'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 flex items-center">
              <Ticket className="mr-3 h-8 w-8" /> PNR Status
            </h1>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input 
                    placeholder="Enter PNR Number" 
                    className="flex-1"
                    value={pnrNumber}
                    onChange={(e) => setPnrNumber(e.target.value)}
                    maxLength={10}
                  />
                  <Button 
                    onClick={handleCheckStatus}
                    disabled={isLoading}
                    className="bg-primary-500 hover:bg-primary-600 md:w-auto"
                  >
                    {isLoading ? "Checking..." : "Check Status"}
                  </Button>
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Test with sample PNRs:</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-1">
                    {samplePnrs.map(pnr => (
                      <Button 
                        key={pnr} 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPnrNumber(pnr)}
                      >
                        {pnr}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-8">
                {error}
              </div>
            )}
            
            {pnrDetails && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="bg-muted/30">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Ticket className="h-5 w-5" />
                        <span>PNR: {pnrDetails.pnr}</span>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        pnrDetails.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {pnrDetails.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                          <TrainFront className="h-4 w-4 mr-2" />
                          Train Details
                        </h3>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Train Name:</span>
                            <span className="font-medium">{pnrDetails.train.name}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Train Number:</span>
                            <span className="font-medium">{pnrDetails.train.number}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">From:</span>
                            <span className="font-medium">{pnrDetails.train.from}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">To:</span>
                            <span className="font-medium">{pnrDetails.train.to}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Departure:</span>
                            <span className="font-medium">{pnrDetails.train.departureTime}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Arrival:</span>
                            <span className="font-medium">{pnrDetails.train.arrivalTime}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Journey Details
                        </h3>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Journey Date:</span>
                            <span className="font-medium">{pnrDetails.journeyDate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Booking Date:</span>
                            <span className="font-medium">{pnrDetails.bookingDate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Class:</span>
                            <span className="font-medium">{pnrDetails.class}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Booking Type:</span>
                            <span className="font-medium">{pnrDetails.bookingType || 'Regular'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total Fare:</span>
                            <span className="font-medium">₹{pnrDetails.totalFare}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-semibold text-lg mb-3 flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Passenger Details
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 text-left">
                            <tr>
                              <th className="p-2 font-medium">No.</th>
                              <th className="p-2 font-medium">Name</th>
                              <th className="p-2 font-medium">Age</th>
                              <th className="p-2 font-medium">Gender</th>
                              <th className="p-2 font-medium">Seat</th>
                              <th className="p-2 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {pnrDetails.passengers.map((passenger, idx) => (
                              <tr key={idx} className="border-t">
                                <td className="p-2">{idx + 1}</td>
                                <td className="p-2">{passenger.name}</td>
                                <td className="p-2">{passenger.age}</td>
                                <td className="p-2">{passenger.gender}</td>
                                <td className="p-2">{passenger.seat}</td>
                                <td className="p-2">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    passenger.status === 'Confirmed' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-amber-100 text-amber-800'
                                  }`}>
                                    {passenger.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {pnrDetails.status === 'Confirmed' && (
                  <div className="flex justify-end">
                    <Button>
                      <Ticket className="mr-2 h-4 w-4" />
                      Print E-Ticket
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PNRStatus;
