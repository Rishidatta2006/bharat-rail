
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import SearchForm from '@/components/home/SearchForm';
import FeaturedTrains from '@/components/home/FeaturedTrains';
import InfoSection from '@/components/home/InfoSection';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Show welcome toast after a short delay
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to BharatRail Vista!",
        description: "Experience the next generation of railway booking in India.",
        duration: 5000,
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className={`min-h-screen flex flex-col ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4">
          <SearchForm />
        </div>
        <FeaturedTrains />
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
