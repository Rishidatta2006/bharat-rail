
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const SearchForm = () => {
  const [date, setDate] = useState<Date>();
  
  const popularCities = [
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "chennai", label: "Chennai" },
    { value: "kolkata", label: "Kolkata" },
    { value: "bangalore", label: "Bangalore" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "pune", label: "Pune" }
  ];

  const travelClasses = [
    { value: "SL", label: "Sleeper Class (SL)" },
    { value: "3A", label: "AC 3 Tier (3A)" },
    { value: "2A", label: "AC 2 Tier (2A)" },
    { value: "1A", label: "AC First Class (1A)" },
    { value: "CC", label: "Chair Car (CC)" },
    { value: "EC", label: "Executive Class (EC)" }
  ];

  const quotas = [
    { value: "GN", label: "General Quota (GN)" },
    { value: "TQ", label: "Tatkal Quota (TQ)" },
    { value: "PT", label: "Premium Tatkal (PT)" },
    { value: "LD", label: "Ladies Quota (LD)" },
    { value: "DF", label: "Defense Quota (DF)" },
    { value: "FT", label: "Foreign Tourist Quota (FT)" }
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle search submission here
    console.log('Search form submitted');
  };

  return (
    <Card className="border-none shadow-lg relative z-20 -mt-12 md:-mt-24">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* From Station */}
            <div className="space-y-2">
              <label className="text-sm font-medium">From Station</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select origin" />
                </SelectTrigger>
                <SelectContent>
                  {popularCities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* To Station */}
            <div className="space-y-2">
              <label className="text-sm font-medium">To Station</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {popularCities.map((city) => (
                    <SelectItem key={city.value} value={city.value}>{city.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Date Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Journey Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Class */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {travelClasses.map((travelClass) => (
                    <SelectItem key={travelClass.value} value={travelClass.value}>{travelClass.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Search Button */}
            <div className="space-y-2">
              <label className="text-sm font-medium opacity-0">Search</label>
              <Button type="submit" className="w-full bg-primary-500 hover:bg-primary-600">
                <Search className="mr-2 h-4 w-4" /> Find Trains
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">Quota:</span>
              <Select defaultValue="GN">
                <SelectTrigger className="w-[180px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {quotas.map((quota) => (
                    <SelectItem key={quota.value} value={quota.value}>{quota.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="ml-auto flex items-center">
              <Button variant="link" className="text-primary-500">Advanced Options</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
