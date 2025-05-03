
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TrainCard from '@/components/ui/TrainCard';

const Trains = () => {
  // Sample train data - in a real app this would come from your MySQL database
  const trainsList = [
    {
      id: 1,
      name: "Rajdhani Express",
      number: "12301",
      from: "Delhi",
      to: "Mumbai",
      departureTime: "16:25",
      arrivalTime: "08:15",
      duration: "15h 50m",
      days: ["Mon", "Wed", "Fri"],
      classes: ["SL", "3A", "2A", "1A"],
      imageUrl: "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      name: "Shatabdi Express",
      number: "12002",
      from: "Delhi",
      to: "Lucknow",
      departureTime: "06:10",
      arrivalTime: "12:40",
      duration: "6h 30m",
      days: ["Daily"],
      classes: ["CC", "EC"],
      imageUrl: "https://images.unsplash.com/photo-1573413154008-87b37a7d04a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    }
  ];

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
                  <Input placeholder="From station" className="flex-1" />
                  <Input placeholder="To station" className="flex-1" />
                  <Button className="bg-primary-500 hover:bg-primary-600">Search</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Available Trains</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainsList.map((train) => (
              <TrainCard key={train.id} train={train} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trains;
