
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { TrainFront, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface Train {
  id: number;
  name: string;
  number: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  days: string[];
  classes: string[];
  imageUrl: string;
}

interface TrainCardProps {
  train: Train;
}

const TrainCard = ({ train }: TrainCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCheckAvailability = () => {
    toast({
      title: "Checking availability",
      description: `Checking seats for ${train.name} (${train.number})`,
    });
    // In a real app, this would navigate to a booking page or show a modal
    // For now, we'll simulate it with a toast
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={train.imageUrl} 
          alt={train.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-md py-1 px-3 flex items-center space-x-1">
          <TrainFront className="h-4 w-4 text-primary-500" />
          <span className="text-sm font-semibold">{train.number}</span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{train.name}</h3>
        
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
        <Button onClick={handleCheckAvailability}>Check Availability</Button>
      </CardFooter>
    </Card>
  );
};

export default TrainCard;
