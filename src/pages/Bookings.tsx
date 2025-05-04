import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { getTableData } from '@/utils/db';
import ETicket from '@/components/ui/ETicket';

// Define proper types for each database table
interface Booking {
  Booking_ID: string;
  Passenger_ID: string;
  Train_Number: number;
  Date_of_Journey: string;
  Source_Station: string;
  Destination_Station: string;
  Booking_Status: string;
}

interface Ticket {
  PNR: string;
  Booking_ID: string;
  Seat_No: string;
  Berth_Type: string;
  Class: string;
  Boarding_Point: string;
}

interface Train {
  Train_Number: number;
  Train_Name: string;
  Coaches: number;
}

interface Schedule {
  Train_Name: string;
  Train_Number: number;
  Arrival_Time: string;
  Departure_Time: string;
  Duration: number;
}

interface Passenger {
  Passenger_ID: string;
  First_Name: string;
  Last_Name: string;
  Email: string;
  Gender: string;
  Age: number;
  Phone_Number: string;
}

interface MyBooking {
  MyBooking_ID: number;
  Passenger_ID: string;
  PNR: string;
  Booking_Status: string;
}

interface Payment {
  Payment_ID: number;
  PNR: string;
  Amount: number;
  Payment_Method: string;
  Payment_Status: string;
}

interface Cancellation {
  Cancellation_ID: string;
  PNR: string;
  Refund_Amount: number;
}

interface UserBooking {
  id: string;
  pnr: string;
  trainName: string;
  trainNumber: string;
  from: string;
  to: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  passengers: number;
  status: string;
  class: string;
  totalFare: number;
  passengerName: string;
}

const Bookings = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userBookings, setUserBookings] = useState<UserBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Added state for e-ticket viewing
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState<any>(null);

  // Fetch bookings on component mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserBookings();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please login to view your bookings",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);

  // Function to fetch user bookings
  const fetchUserBookings = () => {
    try {
      // Get all mybookings
      const mybookingsData = getTableData('mybookings') as MyBooking[];
      
      // For each booking, get related data
      const bookingsWithDetails = mybookingsData.map((mybooking: MyBooking) => {
        // Get ticket details
        const ticket = (getTableData('ticket') as Ticket[]).find((t) => t.PNR === mybooking.PNR);
        
        if (!ticket) return null;
        
        // Get booking details
        const booking = (getTableData('booking') as Booking[]).find((b) => b.Booking_ID === ticket.Booking_ID);
        
        if (!booking) return null;
        
        // Get train details
        const train = (getTableData('train') as Train[]).find((t) => t.Train_Number === booking.Train_Number);
        
        if (!train) return null;
        
        // Get schedule details
        const schedule = (getTableData('schedule') as Schedule[]).find((s) => s.Train_Number === booking.Train_Number);
        
        // Get passenger details
        const passenger = (getTableData('passenger') as Passenger[]).find((p) => p.Passenger_ID === booking.Passenger_ID);
        
        return {
          id: booking.Booking_ID,
          pnr: mybooking.PNR,
          trainName: train.Train_Name,
          trainNumber: train.Train_Number.toString(),
          from: booking.Source_Station,
          to: booking.Destination_Station,
          date: booking.Date_of_Journey,
          departureTime: schedule ? schedule.Departure_Time.slice(0, 5) : "00:00",
          arrivalTime: schedule ? schedule.Arrival_Time.slice(0, 5) : "00:00",
          passengers: 1,
          status: mybooking.Booking_Status,
          class: ticket.Class,
          totalFare: 0, // Will be set from payment if available
          passengerName: passenger ? `${passenger.First_Name} ${passenger.Last_Name}` : "Passenger"
        };
      }).filter(Boolean) as UserBooking[];

      // Add fare information from payments
      const bookingsWithFare = bookingsWithDetails.map((booking: UserBooking) => {
        const payment = (getTableData('payment') as Payment[]).find((p) => p.PNR === booking.pnr);
        return {
          ...booking,
          totalFare: payment ? payment.Amount : Math.floor(Math.random() * 1500) + 500
        };
      });
      
      setUserBookings(bookingsWithFare);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Error",
        description: "Failed to load your bookings. Please try again later.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Handle cancel ticket
  const handleCancelTicket = (bookingId: string, pnr: string) => {
    try {
      // Update booking status to cancelled
      const mybookingsData = getTableData('mybookings') as MyBooking[];
      const bookingIndex = mybookingsData.findIndex((b) => b.PNR === pnr);
      
      if (bookingIndex !== -1) {
        mybookingsData[bookingIndex].Booking_Status = 'Cancelled';
        
        // Create cancellation record if it doesn't exist
        const cancellations = getTableData('cancellation') as Cancellation[];
        const existingCancellation = cancellations.find((c) => c.PNR === pnr);
        
        if (!existingCancellation) {
          const payment = (getTableData('payment') as Payment[]).find((p) => p.PNR === pnr);
          const refundAmount = payment ? Math.floor(payment.Amount * 0.8) : 100;
          
          const newCancellation = {
            Cancellation_ID: `CK${Math.floor(Math.random() * 10000000000)}`,
            PNR: pnr,
            Refund_Amount: refundAmount
          };
          
          (getTableData('cancellation') as Cancellation[]).push(newCancellation);
        }
        
        // Update the local state to reflect the changes
        setUserBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.pnr === pnr 
              ? { ...booking, status: 'Cancelled' } 
              : booking
          )
        );
        
        toast({
          title: "Ticket Cancelled",
          description: `Your booking (PNR: ${pnr}) has been cancelled successfully.`,
        });
      }
    } catch (error) {
      console.error("Error cancelling ticket:", error);
      toast({
        title: "Cancellation Failed",
        description: "Failed to cancel the ticket. Please try again later.",
        variant: "destructive"
      });
    }
  };

  // Updated viewETicket function
  const viewETicket = (pnr: string) => {
    // Find the booking details
    const booking = userBookings.find(b => b.pnr === pnr);
    
    if (!booking) {
      toast({
        title: "Error",
        description: "Booking details not found",
        variant: "destructive"
      });
      return;
    }
    
    // Get additional details
    const ticket = (getTableData('ticket') as any[]).find((t) => t.PNR === pnr);
    const payment = (getTableData('payment') as any[]).find((p) => p.PNR === pnr);
    
    // Create ticket data object for the e-ticket component
    const ticketData = {
      pnr: booking.pnr,
      train: {
        name: booking.trainName,
        number: booking.trainNumber,
        from: booking.from,
        to: booking.to,
        departureTime: booking.departureTime,
        arrivalTime: booking.arrivalTime
      },
      bookingDate: new Date().toLocaleDateString(),
      journeyDate: booking.date,
      passengers: [{
        name: booking.passengerName,
        age: 30, // Default age
        gender: 'Male', // Default gender
        seat: ticket ? ticket.Seat_No : 'Not assigned',
        status: booking.status
      }],
      class: ticket ? ticket.Class : booking.class,
      coach: ticket ? ticket.Seat_No.split('-')[0] : 'NA',
      status: booking.status,
      fareDetails: {
        baseFare: booking.totalFare,
        gst: Math.round(booking.totalFare * 0.05),
        total: Math.round(booking.totalFare * 1.05)
      }
    };
    
    // Open the e-ticket modal
    setCurrentTicket(ticketData);
    setIsTicketOpen(true);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading your bookings...</p>
            </div>
          ) : userBookings.length > 0 ? (
            <div className="space-y-6">
              {userBookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-xl">{booking.trainName}</h3>
                        <p className="text-gray-600">{booking.trainNumber}</p>
                      </div>
                      <div className="bg-primary-50 px-3 py-1 rounded-full">
                        <span className={`font-medium ${
                          booking.status === 'Confirmed' ? 'text-green-600' : 
                          booking.status === 'Waiting' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">PNR</p>
                        <p className="font-medium">{booking.pnr}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Journey Date</p>
                        <p className="font-medium">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Class</p>
                        <p className="font-medium">{booking.class}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Passenger</p>
                        <p className="font-medium">{booking.passengerName}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                      <div className="flex gap-8">
                        <div>
                          <p className="font-semibold text-lg">{booking.from}</p>
                          <p className="text-gray-600">{booking.departureTime}</p>
                        </div>
                        <div className="text-gray-400">→</div>
                        <div>
                          <p className="font-semibold text-lg">{booking.to}</p>
                          <p className="text-gray-600">{booking.arrivalTime}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Fare</p>
                        <p className="font-bold text-lg">₹{booking.totalFare}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4 justify-end">
                      {booking.status !== 'Cancelled' && (
                        <Button 
                          variant="outline" 
                          onClick={() => handleCancelTicket(booking.id, booking.pnr)}
                        >
                          Cancel Ticket
                        </Button>
                      )}
                      <Button onClick={() => viewETicket(booking.pnr)}>
                        View E-Ticket
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">You haven't made any bookings yet.</p>
              <Button onClick={() => navigate('/trains')}>Book a Train Ticket</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      {/* Add e-ticket modal */}
      {currentTicket && (
        <ETicket 
          isOpen={isTicketOpen}
          onClose={() => setIsTicketOpen(false)}
          ticket={currentTicket}
        />
      )}
    </div>
  );
};

export default Bookings;
