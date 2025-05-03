
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
import { Calendar as CalendarIcon, Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { getStations } from '@/utils/db';

const SearchForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [travelClass, setTravelClass] = useState('');
  const [quota, setQuota] = useState('GN');
  
  // Advanced options state
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [showDirectTrains, setShowDirectTrains] = useState(false);
  const [includeTatkal, setIncludeTatkal] = useState(true);
  
  // Get stations from the database
  const stations = getStations();
  
  const popularCities = [
    "Chennai Central",
    "Mumbai Central", 
    "Bangalore Junction",
    "Hyderabad Deccan",
    "Delhi Junction",
    "Kolkata Howrah",
    "Pune Junction",
    "Ahmedabad Junction"
  ];

  const travelClasses = [
    { value: "Sleeper", label: "Sleeper Class" },
    { value: "AC", label: "AC Class" },
    { value: "General", label: "General Class" }
  ];

  const quotas = [
    { value: "GN", label: "General Quota (GN)" },
    { value: "TQ", label: "Tatkal Quota (TQ)" },
    { value: "LD", label: "Ladies Quota (LD)" },
    { value: "DF", label: "Defense Quota (DF)" },
    { value: "SR", label: "Senior Citizen Quota (SR)" }
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Search form submitted');
    
    if (!fromStation || !toStation) {
      toast({
        title: "Missing Information",
        description: "Please select both from and to stations",
        variant: "destructive"
      });
      return;
    }
    
    if (fromStation === toStation) {
      toast({
        title: "Invalid Selection",
        description: "Origin and destination stations cannot be the same",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to trains page with query parameters
    navigate(`/trains?from=${encodeURIComponent(fromStation)}&to=${encodeURIComponent(toStation)}${date ? `&date=${format(date, 'yyyy-MM-dd')}` : ''}${travelClass ? `&class=${travelClass}` : ''}&quota=${quota}`);
  };

  return (
    <Card className="border-none shadow-lg relative z-20 -mt-12 md:-mt-24">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* From Station */}
            <div className="space-y-2">
              <label className="text-sm font-medium">From Station</label>
              <Select value={fromStation} onValueChange={setFromStation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select origin" />
                </SelectTrigger>
                <SelectContent>
                  {popularCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* To Station */}
            <div className="space-y-2">
              <label className="text-sm font-medium">To Station</label>
              <Select value={toStation} onValueChange={setToStation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {popularCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
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
              <Select value={travelClass} onValueChange={setTravelClass}>
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
              <Select value={quota} onValueChange={setQuota}>
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
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="link" className="text-primary-500 flex items-center">
                    Advanced Options <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Advanced Search Options</SheetTitle>
                    <SheetDescription>
                      Customize your train search with these additional options.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="flexible-dates"
                        checked={flexibleDates}
                        onCheckedChange={(checked) => setFlexibleDates(checked as boolean)}
                      />
                      <label
                        htmlFor="flexible-dates"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Flexible with dates (±3 days)
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="direct-trains"
                        checked={showDirectTrains}
                        onCheckedChange={(checked) => setShowDirectTrains(checked as boolean)}
                      />
                      <label
                        htmlFor="direct-trains"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show only direct trains
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="include-tatkal"
                        checked={includeTatkal}
                        onCheckedChange={(checked) => setIncludeTatkal(checked as boolean)}
                      />
                      <label
                        htmlFor="include-tatkal"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include tatkal booking options
                      </label>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preferred Train Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="train-rajdhani" />
                          <label htmlFor="train-rajdhani" className="text-sm">Rajdhani</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="train-shatabdi" />
                          <label htmlFor="train-shatabdi" className="text-sm">Shatabdi</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="train-duronto" />
                          <label htmlFor="train-duronto" className="text-sm">Duronto</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="train-superfast" />
                          <label htmlFor="train-superfast" className="text-sm">Superfast</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="train-express" />
                          <label htmlFor="train-express" className="text-sm">Express</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="train-passenger" />
                          <label htmlFor="train-passenger" className="text-sm">Passenger</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preferred Departure Time</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="time-morning" />
                          <label htmlFor="time-morning" className="text-sm">Morning (4 AM - 10 AM)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="time-day" />
                          <label htmlFor="time-day" className="text-sm">Day (10 AM - 4 PM)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="time-evening" />
                          <label htmlFor="time-evening" className="text-sm">Evening (4 PM - 10 PM)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="time-night" />
                          <label htmlFor="time-night" className="text-sm">Night (10 PM - 4 AM)</label>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={() => toast({title: "Advanced options applied", description: "Your search will include these preferences"})}>
                      Apply Preferences
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
