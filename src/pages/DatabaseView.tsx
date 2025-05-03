
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Database, Table, ListFilter } from 'lucide-react';
import { getTableData, runQuery, mockDatabaseData } from '@/utils/db';

const DatabaseView = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof mockDatabaseData>('trains');
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM trains;');
  const [queryResult, setQueryResult] = useState<any[]>([]);
  const [queryMessage, setQueryMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
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

  // Helper function to render table data
  const renderTableData = (data: any[]) => {
    if (!data || data.length === 0) {
      return <div className="p-4 text-center text-muted-foreground">No data available</div>;
    }
    
    const columns = Object.keys(data[0]);
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              {columns.map(column => (
                <th key={column} className="border p-2 text-left">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b hover:bg-muted/50">
                {columns.map(column => (
                  <td key={`${rowIndex}-${column}`} className="border-x p-2">
                    {typeof row[column] === 'object' ? JSON.stringify(row[column]) : row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DatabaseView;
