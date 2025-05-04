
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { TrainFront, Clock, Calendar, User, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '@/utils/db';
import ETicket from './ETicket';

interface Train {
  id: number;
  train_name?: string;
  train_number?: string;
  name?: string;
  number?: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  days: string[];
  classes: string[];
  imageUrl?: string;
  fare?: Record<string, number>;
  tatkal_available?: string;
  tatkal_booking_start_time?: string;
}

interface TrainCardProps {
  train: Train;
}

interface PassengerInfo {
  name: string;
  age: string;
  gender: string;
}

const TrainCard = ({ train }: TrainCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [bookingType, setBookingType] = useState("Regular");
  const [passengers, setPassengers] = useState<PassengerInfo[]>([
    { name: '', age: '', gender: 'Male' }
  ]);
  const [journeyDate, setJourneyDate] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  
  // New state for e-ticket display
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);

  // Get the actual train name and number using fallbacks
  const trainName = train.train_name || train.name || '';
  const trainNumber = train.train_number || train.number || '';
  
  const handleCheckAvailability = () => {
    setIsDialogOpen(true);
  };

  // Add passenger
  const addPassenger = () => {
    if (passengers.length < 6) {
      setPassengers([...passengers, { name: '', age: '', gender: 'Male' }]);
    } else {
      toast({
        title: "Maximum passengers reached",
        description: "You can book for a maximum of 6 passengers at once",
      });
    }
  };

  // Remove passenger
  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      const updatedPassengers = [...passengers];
      updatedPassengers.splice(index, 1);
      setPassengers(updatedPassengers);
    }
  };

  // Update passenger info
  const updatePassenger = (index: number, field: keyof PassengerInfo, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  // Calculate total fare
  const calculateTotalFare = () => {
    if (!selectedClass || !train.fare) return 0;
    return (train.fare[selectedClass] || 0) * passengers.length;
  };

  // Handle booking submission
  const handleBookingSubmit = async () => {
    // Validate inputs
    if (!selectedClass) {
      toast({
        title: "Class required",
        description: "Please select a travel class",
        variant: "destructive"
      });
      return;
    }

    if (!journeyDate) {
      toast({
        title: "Date required",
        description: "Please select a journey date",
        variant: "destructive"
      });
      return;
    }

    // Validate all passengers have name and age
    const invalidPassenger = passengers.find(p => !p.name || !p.age);
    if (invalidPassenger) {
      toast({
        title: "Incomplete passenger details",
        description: "Please fill in name and age for all passengers",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);

    try {
      // Process booking
      const bookingData = {
        userId: 1, // Mock user ID (in a real app, this would come from authentication)
        trainId: train.id,
        bookingDate: new Date().toISOString().split('T')[0],
        journeyDate,
        passengers: passengers.map(p => ({
          name: p.name,
          age: parseInt(p.age),
          gender: p.gender,
          seat: "To be allocated",
          status: "Confirmed"
        })),
        class: selectedClass,
        totalFare: calculateTotalFare(),
        bookingType
      };

      const result = await createBooking(bookingData);
      
      if (result.success) {
        toast({
          title: "Booking Successful!",
          description: `PNR: ${result.booking.pnr}. Your ticket has been booked.`,
        });
        
        // Set ticket data for viewing
        setTicketData({
          pnr: result.booking.pnr,
          train: {
            name: trainName,
            number: trainNumber,
            from: train.from,
            to: train.to,
            departureTime: train.departureTime,
            arrivalTime: train.arrivalTime
          },
          bookingDate: new Date().toLocaleDateString(),
          journeyDate: journeyDate,
          passengers: bookingData.passengers.map((p: any, index: number) => ({
            ...p,
            seat: `${selectedClass[0]}${Math.floor(Math.random() * 10) + 1}-${index + 11}`
          })),
          class: selectedClass,
          coach: `${selectedClass[0]}${Math.floor(Math.random() * 10) + 1}`,
          status: 'Confirmed',
          fareDetails: {
            baseFare: calculateTotalFare(),
            gst: Math.round(calculateTotalFare() * 0.05),
            total: Math.round(calculateTotalFare() * 1.05)
          }
        });
        
        setIsDialogOpen(false);
        setIsTicketOpen(true);
      } else {
        toast({
          title: "Booking Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({
        title: "Booking Error",
        description: "An unexpected error occurred while processing your booking",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 overflow-hidden">
          {train.imageUrl ? (
            <img 
              src={train.imageUrl} 
              alt={trainName}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <TrainFront className="h-16 w-16 text-gray-400" />
            </div>
          )}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-md py-1 px-3 flex items-center space-x-1">
            <TrainFront className="h-4 w-4 text-primary-500" />
            <span className="text-sm font-semibold">{trainNumber}</span>
          </div>
          {train.tatkal_available === 'Yes' && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-orange-500 hover:bg-orange-600">
                Tatkal {train.tatkal_booking_start_time} AM
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">{trainName}</h3>
          
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="font-semibold">{train.from}</p>
              <p className="text-sm font-medium text-primary-600">{train.departureTime}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {train.duration}
              </div>
              <div className="w-20 h-0.5 bg-gray-300 relative">
                <div className="absolute -top-1.5 left-0 w-2 h-2 rounded-full bg-primary-500"></div>
                <div className="absolute -top-1.5 right-0 w-2 h-2 rounded-full bg-secondary-500"></div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-500">To</p>
              <p className="font-semibold">{train.to}</p>
              <p className="text-sm font-medium text-secondary-600">{train.arrivalTime}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {train.classes.map((cls) => (
              <Badge key={cls} variant="outline" className="text-xs">{cls}</Badge>
            ))}
          </div>
          
          <div className="text-sm text-gray-600">
            Runs on: {train.days.join(', ')}
          </div>
        </CardContent>
        
        <CardFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
          <span className="text-green-600 font-medium">Available</span>
          <Button onClick={handleCheckAvailability}>Book Now</Button>
        </CardFooter>
      </Card>

      {/* Booking Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Book Train Ticket</DialogTitle>
            <DialogDescription>
              {trainName} ({trainNumber}) - {train.from} to {train.to}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="travelClass">Travel Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger id="travelClass">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {train.classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        {cls} - ₹{train.fare?.[cls] || 0}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="journeyDate">Journey Date</Label>
                <Input
                  id="journeyDate"
                  type="date"
                  value={journeyDate}
                  onChange={(e) => setJourneyDate(e.target.value)}
                />
              </div>
            </div>
            
            {train.tatkal_available === 'Yes' && (
              <div className="space-y-2">
                <Label>Booking Type</Label>
                <RadioGroup 
                  value={bookingType} 
                  onValueChange={setBookingType}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Regular" id="regular" />
                    <Label htmlFor="regular">Regular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Tatkal" id="tatkal" />
                    <Label htmlFor="tatkal">
                      Tatkal (Opens at {train.tatkal_booking_start_time} AM)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Passenger Details</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addPassenger}
                  disabled={passengers.length >= 6}
                >
                  Add Passenger
                </Button>
              </div>
              
              {passengers.map((passenger, index) => (
                <div key={index} className="border p-3 rounded-md space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Passenger {index + 1}</span>
                    {passengers.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removePassenger(index)}
                        className="h-8 px-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`name-${index}`}>Name</Label>
                      <Input
                        id={`name-${index}`}
                        value={passenger.name}
                        onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                        placeholder="Passenger name"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label htmlFor={`age-${index}`}>Age</Label>
                        <Input
                          id={`age-${index}`}
                          value={passenger.age}
                          onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                          type="number"
                          min="1"
                          max="120"
                          placeholder="Age"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor={`gender-${index}`}>Gender</Label>
                        <Select 
                          value={passenger.gender} 
                          onValueChange={(value) => updatePassenger(index, 'gender', value)}
                        >
                          <SelectTrigger id={`gender-${index}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedClass && (
              <div className="mt-4 bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between items-center text-sm">
                  <span>Base Fare:</span>
                  <span>₹{train.fare?.[selectedClass] || 0} × {passengers.length}</span>
                </div>
                
                <div className="flex justify-between items-center font-bold mt-2 text-lg">
                  <span>Total Fare:</span>
                  <span>₹{calculateTotalFare()}</span>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleBookingSubmit} 
              disabled={isBooking}
              className="bg-primary-500 hover:bg-primary-600"
            >
              {isBooking ? "Processing..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* E-Ticket View */}
      {ticketData && (
        <ETicket 
          isOpen={isTicketOpen}
          onClose={() => setIsTicketOpen(false)}
          ticket={ticketData}
        />
      )}
    </>
  );
};

export default TrainCard;
