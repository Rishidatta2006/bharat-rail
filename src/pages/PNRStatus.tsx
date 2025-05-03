
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PNRStatus = () => {
  const [pnrNumber, setPnrNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pnrDetails, setPnrDetails] = useState<null | {
    pnrNumber: string;
    trainName: string;
    trainNumber: string;
    from: string;
    to: string;
    date: string;
    departureTime: string;
    boardingPoint: string;
    class: string;
    status: string;
    passengers: Array<{id: number, seat: string, status: string}>;
  }>(null);
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnrNumber.trim() || pnrNumber.length !== 10) {
      toast({
        title: "Invalid PNR",
        description: "Please enter a valid 10-digit PNR number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call - in a real app, this would query your MySQL database
    setTimeout(() => {
      setIsLoading(false);
      
      // Sample data for demonstration
      setPnrDetails({
        pnrNumber: pnrNumber,
        trainName: "Rajdhani Express",
        trainNumber: "12301",
        from: "Delhi",
        to: "Mumbai",
        date: "2025-05-15",
        departureTime: "16:25",
        boardingPoint: "Delhi",
        class: "3A",
        status: "Confirmed",
        passengers: [
          { id: 1, seat: "B1, 22", status: "Confirmed" },
          { id: 2, seat: "B1, 23", status: "Confirmed" }
        ]
      });
      
      toast({
        title: "PNR Status Retrieved",
        description: `Found PNR: ${pnrNumber}`,
      });
    }, 1500);
  };

  const handleReset = () => {
    setPnrNumber('');
    setPnrDetails(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">PNR Status Enquiry</h1>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="pnr" className="block text-sm font-medium text-gray-700 mb-1">
                      Enter 10-digit PNR Number
                    </label>
                    <Input 
                      id="pnr"
                      type="text"
                      placeholder="e.g., 4513214789"
                      value={pnrNumber}
                      onChange={(e) => setPnrNumber(e.target.value)}
                      className="w-full"
                      maxLength={10}
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <Button type="submit" className="bg-primary-500 hover:bg-primary-600" disabled={isLoading}>
                      {isLoading ? 'Checking...' : (<><Search className="h-4 w-4 mr-1" /> Get Status</>)}
                    </Button>
                    {pnrDetails && (
                      <Button type="button" variant="outline" onClick={handleReset}>
                        Reset
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {pnrDetails && (
            <Card>
              <CardContent className="p-6">
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <h2 className="text-xl font-semibold mb-4">PNR Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">
                    <div>
                      <p className="text-sm text-gray-500">PNR Number</p>
                      <p className="font-medium">{pnrDetails.pnrNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Train Name</p>
                      <p className="font-medium">{pnrDetails.trainName} ({pnrDetails.trainNumber})</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Journey</p>
                      <p className="font-medium">{pnrDetails.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium">{pnrDetails.from}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium">{pnrDetails.to}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Class</p>
                      <p className="font-medium">{pnrDetails.class}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Boarding Point</p>
                      <p className="font-medium">{pnrDetails.boardingPoint}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Departure Time</p>
                      <p className="font-medium">{pnrDetails.departureTime}</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-3">Passenger Status</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Passenger</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Seat / Coach</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pnrDetails.passengers.map((passenger) => (
                        <tr key={passenger.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">Passenger {passenger.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{passenger.seat}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full ${passenger.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {passenger.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PNRStatus;
