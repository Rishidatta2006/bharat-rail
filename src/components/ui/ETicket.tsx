
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Train, Ticket, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface ETicketProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    pnr: string;
    train: {
      name: string;
      number: string;
      from: string;
      to: string;
      departureTime: string;
      arrivalTime: string;
    };
    bookingDate: string;
    journeyDate: string;
    passengers: Array<{
      name: string;
      age: number;
      gender: string;
      seat: string;
      status: string;
    }>;
    class: string;
    coach?: string;
    status: string;
    fareDetails?: {
      baseFare: number;
      gst: number;
      total: number;
    };
  };
}

const ETicket: React.FC<ETicketProps> = ({ isOpen, onClose, ticket }) => {
  // Generate random coach number if not provided
  const coachNumber = ticket.coach || `${ticket.class.charAt(0)}${Math.floor(Math.random() * 10) + 1}`;
  
  // Format the journey date
  const formattedJourneyDate = ticket.journeyDate ? 
    format(new Date(ticket.journeyDate), 'dd MMM yyyy') : 
    'N/A';
  
  // Calculate fare details if not provided
  const fareDetails = ticket.fareDetails || {
    baseFare: 750,
    gst: 36,
    total: 786
  };
  
  // Function to simulate ticket download
  const handleDownload = () => {
    console.log('Downloading E-Ticket:', ticket);
    alert('E-Ticket downloaded successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            E-Ticket / Reservation Voucher
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-primary-50 p-3 rounded-lg border border-primary-100 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">PNR Number</p>
              <p className="font-bold text-lg">{ticket.pnr}</p>
            </div>
            <Badge 
              variant={ticket.status === 'Confirmed' ? 'secondary' : 
                      ticket.status === 'Waiting' ? 'outline' : 'destructive'}
              className={`
                ${ticket.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                  ticket.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'}
              `}
            >
              {ticket.status}
            </Badge>
          </div>
        </div>
        
        <Card className="border-2 border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Train className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-bold text-lg">{ticket.train.name}</p>
                    <p className="text-sm text-gray-500">Train #{ticket.train.number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Journey Date</p>
                  <p className="font-semibold">{formattedJourneyDate}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-semibold">{ticket.train.from}</p>
                  <p className="text-sm font-medium text-primary-600">{ticket.train.departureTime}</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-20 h-0.5 bg-gray-300 relative">
                    <div className="absolute -top-1.5 left-0 w-2 h-2 rounded-full bg-primary-500"></div>
                    <div className="absolute -top-1.5 right-0 w-2 h-2 rounded-full bg-secondary-500"></div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-semibold">{ticket.train.to}</p>
                  <p className="text-sm font-medium text-secondary-600">{ticket.train.arrivalTime}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="font-medium mb-2">Travel Details</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-semibold">{ticket.class}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Coach</p>
                    <p className="font-semibold">{coachNumber}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="font-medium mb-2">Passenger Details</p>
                <table className="w-full">
                  <thead className="text-xs text-gray-500">
                    <tr>
                      <th className="text-left pb-2">Name</th>
                      <th className="text-left pb-2">Age/Gender</th>
                      <th className="text-left pb-2">Seat</th>
                      <th className="text-left pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticket.passengers.map((passenger, idx) => (
                      <tr key={idx} className="text-sm">
                        <td className="py-1 font-medium">{passenger.name}</td>
                        <td className="py-1">{passenger.age}/{passenger.gender.charAt(0)}</td>
                        <td className="py-1">{passenger.seat || `${coachNumber}-${idx + 11}`}</td>
                        <td className="py-1">
                          <Badge 
                            variant={passenger.status === 'Confirmed' ? 'outline' : 
                                    passenger.status === 'Waiting' ? 'secondary' : 'destructive'}
                            className="font-normal"
                          >
                            {passenger.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <Separator />
              
              <div>
                <p className="font-medium mb-2">Fare Details</p>
                <div className="text-sm">
                  <div className="flex justify-between py-1">
                    <span>Base Fare</span>
                    <span>₹{fareDetails.baseFare}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>GST</span>
                    <span>₹{fareDetails.gst}</span>
                  </div>
                  <div className="flex justify-between py-1 font-semibold">
                    <span>Total Fare</span>
                    <span>₹{fareDetails.total}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 bg-gray-50 p-3 rounded text-xs text-gray-500">
                <p>This is a computer generated ticket and does not require a physical signature.</p>
                <p>For any assistance, call our helpline 139 or visit our website.</p>
              </div>
              
              <Button 
                variant="outline" 
                className="flex gap-2 items-center" 
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
                Download E-Ticket
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ETicket;
