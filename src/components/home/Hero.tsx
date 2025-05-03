
import { Button } from '@/components/ui/button';
import { TrainFront } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
      {/* Decorative train pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 animate-train-move">
          <TrainFront size={64} />
        </div>
        <div className="absolute top-2/3 left-0 animate-train-move" style={{ animationDelay: '2.5s' }}>
          <TrainFront size={48} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 lg:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in">
              Journey Across India with <span className="text-secondary-500">BharatRail Vista</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl opacity-90 max-w-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Book train tickets seamlessly with our modern reservation platform. Experience comfort, reliability, and the joy of train travel.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg" 
                className="bg-secondary-500 hover:bg-secondary-600 text-white"
                onClick={() => navigate('/trains')}
              >
                Book Tickets
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary-600"
                onClick={() => navigate('/trains')}
              >
                Explore Routes
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Indian Train Journey" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="text-secondary-500">
                    <TrainFront size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Premium Experience</p>
                    <p className="text-xs text-gray-600">Modern & Comfortable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
