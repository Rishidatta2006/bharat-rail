
import { Button } from '@/components/ui/button';
import TrainCard from '../ui/TrainCard';

const FeaturedTrains = () => {
  const featuredTrains = [
    {
      id: 1,
      name: 'Rajdhani Express',
      number: '12301',
      from: 'Delhi',
      to: 'Mumbai',
      departureTime: '16:25',
      arrivalTime: '08:15',
      duration: '15h 50m',
      days: ['Mon', 'Wed', 'Fri', 'Sun'],
      classes: ['SL', '3A', '2A', '1A'],
      imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Shatabdi Express',
      number: '12002',
      from: 'Chennai',
      to: 'Bangalore',
      departureTime: '06:00',
      arrivalTime: '11:00',
      duration: '5h 00m',
      days: ['Daily'],
      classes: ['CC', 'EC'],
      imageUrl: 'https://images.unsplash.com/photo-1527303361864-c228e3f25587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'Vande Bharat Express',
      number: '22439',
      from: 'Delhi',
      to: 'Katra',
      departureTime: '08:00',
      arrivalTime: '20:00',
      duration: '12h 00m',
      days: ['Tue', 'Thu', 'Sat'],
      classes: ['CC', 'EC'],
      imageUrl: 'https://images.unsplash.com/photo-1540544660406-6a69dacb2804?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Trains</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover India's premier train services offering comfort, speed, and reliability for your journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTrains.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-secondary-500 hover:bg-secondary-600">View All Trains</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrains;
