
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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

  // Sample bookings data - in a real app this would come from your MySQL database
  const bookings = isAuthenticated ? [
    {
      id: "BOK123456",
      trainName: "Rajdhani Express",
      trainNumber: "12301",
      from: "Delhi",
      to: "Mumbai",
      date: "2025-05-15",
      departureTime: "16:25",
      arrivalTime: "08:15",
      passengers: 2,
      status: "Confirmed",
      class: "3A",
      totalFare: 2450
    },
    {
      id: "BOK789012",
      trainName: "Shatabdi Express",
      trainNumber: "12002",
      from: "Delhi",
      to: "Lucknow",
      date: "2025-05-20",
      departureTime: "06:10",
      arrivalTime: "12:40",
      passengers: 1,
      status: "Waitlisted",
      class: "EC",
      totalFare: 1250
    }
  ] : [];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
          
          {bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-xl">{booking.trainName}</h3>
                        <p className="text-gray-600">{booking.trainNumber}</p>
                      </div>
                      <div className="bg-primary-50 px-3 py-1 rounded-full">
                        <span className={`font-medium ${booking.status === 'Confirmed' ? 'text-green-600' : 'text-amber-600'}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Journey Date</p>
                        <p className="font-medium">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Class</p>
                        <p className="font-medium">{booking.class}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Passengers</p>
                        <p className="font-medium">{booking.passengers}</p>
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
                      <Button variant="outline">Cancel Ticket</Button>
                      <Button>View E-Ticket</Button>
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
    </div>
  );
};

export default Bookings;
