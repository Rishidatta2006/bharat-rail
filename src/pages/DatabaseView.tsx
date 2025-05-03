
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Database, Table, ListFilter, Filter, Search } from 'lucide-react';
import { getTableData, runQuery, mockDatabaseData } from '@/utils/db';
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const DatabaseView = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof mockDatabaseData>('trains');
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM trains;');
  const [queryResult, setQueryResult] = useState<any[]>([]);
  const [queryMessage, setQueryMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    state: '',
    tatkalAvailable: '',
    tatkalTime: ''
  });
  
  const { toast } = useToast();
  
  // Get data for the current tab
  const tableData = getTableData(activeTab);
  
  // Execute custom SQL query
  const handleExecuteQuery = async () => {
    if (!sqlQuery.trim()) {
      toast({
        title: "Query Error",
        description: "Please enter a SQL query to execute",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await runQuery(sqlQuery);
      
      if (result.success) {
        setQueryResult(result.data);
        setQueryMessage(result.message);
        toast({
          title: "Query Executed",
          description: result.message
        });
      } else {
        setQueryResult([]);
        setQueryMessage(result.message);
        toast({
          title: "Query Error",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error executing query:", error);
      setQueryMessage("Error executing query. See console for details.");
      
      toast({
        title: "Query Error",
        description: "An error occurred while executing the query. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters to trains data
  const applyFilters = () => {
    let query = "SELECT * FROM trains";
    const conditions = [];
    
    if (filters.state) {
      conditions.push(`starting_station_state = '${filters.state}'`);
    }
    
    if (filters.tatkalAvailable) {
      conditions.push(`tatkal_available = '${filters.tatkalAvailable}'`);
    }
    
    if (filters.tatkalTime) {
      conditions.push(`tatkal_booking_start_time = '${filters.tatkalTime}'`);
    }
    
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }
    
    query += ";";
    
    setSqlQuery(query);
    handleExecuteQuery();
  };

  // Get unique states
  const uniqueStates = Array.from(
    new Set(mockDatabaseData.trains.map((train: any) => train.starting_station_state))
  ).filter(Boolean);
  
  // Get unique tatkal times
  const uniqueTatkalTimes = Array.from(
    new Set(mockDatabaseData.trains.map((train: any) => train.tatkal_booking_start_time))
  ).filter(Boolean);

  // Helper function to render table data
  const renderTableData = (data: any[]) => {
    if (!data || data.length === 0) {
      return <div className="p-4 text-center text-muted-foreground">No data available</div>;
    }
    
    const columns = Object.keys(data[0]);
    
    return (
      <div className="overflow-x-auto">
        <UITable>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead key={column} className="whitespace-nowrap">{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map(column => (
                  <TableCell key={`${rowIndex}-${column}`} className="p-2 align-top">
                    {typeof row[column] === 'object' 
                      ? JSON.stringify(row[column]) 
                      : String(row[column])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </UITable>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Database className="h-6 w-6 mr-2" />
          <h1 className="text-3xl font-bold">Database Explorer</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - Table list */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Table className="h-5 w-5 mr-2" /> 
                Database Tables
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.keys(mockDatabaseData).map(table => (
                  <Button 
                    key={table}
                    variant={table === activeTab ? "default" : "outline"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab(table as keyof typeof mockDatabaseData)}
                  >
                    <div className="flex items-center">
                      <Table className="h-4 w-4 mr-2" />
                      <span className="capitalize">{table}</span>
                      <span className="ml-auto bg-muted rounded-full px-2 py-1 text-xs">
                        {mockDatabaseData[table as keyof typeof mockDatabaseData].length}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Right content area */}
          <Card className="lg:col-span-2">
            <Tabs defaultValue="browse" className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="capitalize">{activeTab} Table</CardTitle>
                  <TabsList>
                    <TabsTrigger value="browse">
                      <ListFilter className="h-4 w-4 mr-1" /> Browse
                    </TabsTrigger>
                    <TabsTrigger value="query">
                      <Database className="h-4 w-4 mr-1" /> SQL Query
                    </TabsTrigger>
                    {activeTab === 'trains' && (
                      <TabsTrigger value="filter">
                        <Filter className="h-4 w-4 mr-1" /> Filter
                      </TabsTrigger>
                    )}
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="browse" className="mt-0">
                  {renderTableData(tableData)}
                </TabsContent>
                <TabsContent value="query" className="mt-0">
                  <div className="space-y-4">
                    <Textarea 
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      placeholder="Enter SQL query..."
                      className="font-mono min-h-[120px]"
                    />
                    <Button 
                      onClick={handleExecuteQuery}
                      disabled={isLoading}
                      className="bg-primary-500 hover:bg-primary-600"
                    >
                      {isLoading ? "Executing..." : "Execute Query"}
                    </Button>
                    
                    {queryMessage && (
                      <div className={`p-2 rounded text-sm ${queryMessage.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {queryMessage}
                      </div>
                    )}
                    
                    {queryResult.length > 0 && (
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Query Results:</h3>
                        {renderTableData(queryResult)}
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="filter" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter Trains
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="state">Starting Station State</Label>
                          <Select 
                            value={filters.state} 
                            onValueChange={(value) => setFilters({...filters, state: value})}
                          >
                            <SelectTrigger id="state">
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All States</SelectItem>
                              {uniqueStates.map((state) => (
                                <SelectItem key={state} value={state}>{state}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="tatkal">Tatkal Availability</Label>
                          <Select 
                            value={filters.tatkalAvailable} 
                            onValueChange={(value) => setFilters({...filters, tatkalAvailable: value})}
                          >
                            <SelectTrigger id="tatkal">
                              <SelectValue placeholder="Tatkal availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All</SelectItem>
                              <SelectItem value="Yes">Available</SelectItem>
                              <SelectItem value="No">Not Available</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <Label htmlFor="tatkalTime">Tatkal Booking Time</Label>
                        <Select 
                          value={filters.tatkalTime} 
                          onValueChange={(value) => setFilters({...filters, tatkalTime: value})}
                        >
                          <SelectTrigger id="tatkalTime">
                            <SelectValue placeholder="Select booking time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Times</SelectItem>
                            {uniqueTatkalTimes.map((time) => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        onClick={applyFilters} 
                        className="w-full"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        Apply Filters
                      </Button>
                      
                      {queryMessage && queryResult.length > 0 && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">Filter Results:</h3>
                            <Badge variant="outline" className="ml-2">
                              {queryResult.length} trains found
                            </Badge>
                          </div>
                          {renderTableData(queryResult)}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
        
        {/* Documentation Panel */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Tatkal Booking System</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This feature aims to reduce server congestion and improve fairness for users across different regions by distributing Tatkal booking load across different time slots based on the train's starting station state.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockDatabaseData.tatkal_timings.map((timing, index) => (
                <div key={index} className="flex justify-between p-2 border rounded">
                  <span className="font-medium">{timing.state}</span>
                  <span>{timing.opening_time} AM</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default DatabaseView;
