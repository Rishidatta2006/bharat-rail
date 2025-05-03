
// MySQL database integration utility

import { toast } from "@/components/ui/use-toast";

export interface DatabaseConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port?: number;
}

// Database configuration
export const dbConfig: DatabaseConfig = {
  host: 'localhost',
  user: 'root',
  password: '4801',
  database: 'bharatrail',
  port: 3306
};

// Mock database tables and data for the frontend
// In a real application, this would be fetched from the backend
export const mockDatabaseData = {
  trains: [
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
      totalSeats: 750,
      availableSeats: 120,
      fare: {
        "SL": 750,
        "3A": 1250,
        "2A": 2350,
        "1A": 4100
      }
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
      totalSeats: 500,
      availableSeats: 85,
      fare: {
        "CC": 850,
        "EC": 1650
      }
    },
    {
      id: 3,
      name: "Duronto Express",
      number: "12213",
      from: "Mumbai",
      to: "Delhi",
      departureTime: "23:05",
      arrivalTime: "16:35",
      duration: "17h 30m",
      days: ["Tue", "Thu", "Sat"],
      classes: ["SL", "3A", "2A"],
      totalSeats: 680,
      availableSeats: 42,
      fare: {
        "SL": 720,
        "3A": 1320,
        "2A": 2520
      }
    },
    {
      id: 4,
      name: "Vande Bharat",
      number: "22119",
      from: "Mumbai",
      to: "Ahmedabad",
      departureTime: "07:45",
      arrivalTime: "13:55",
      duration: "6h 10m",
      days: ["Daily"],
      classes: ["CC", "EC"],
      totalSeats: 530,
      availableSeats: 210,
      fare: {
        "CC": 1050,
        "EC": 1950
      }
    }
  ],
  users: [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "9876543210",
      bookings: [1, 3]
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@example.com",
      phone: "8765432109",
      bookings: [2]
    }
  ],
  bookings: [
    {
      id: 1,
      userId: 1,
      trainId: 1,
      bookingDate: "2025-04-25",
      journeyDate: "2025-05-15",
      passengers: [
        {
          name: "Rahul Sharma",
          age: 28,
          gender: "Male",
          seat: "B1-22",
          status: "Confirmed"
        },
        {
          name: "Neha Sharma",
          age: 26,
          gender: "Female",
          seat: "B1-23",
          status: "Confirmed"
        }
      ],
      class: "3A",
      pnr: "8456721890",
      status: "Confirmed",
      totalFare: 2450
    },
    {
      id: 2,
      userId: 2,
      trainId: 2,
      bookingDate: "2025-04-28",
      journeyDate: "2025-05-20",
      passengers: [
        {
          name: "Priya Patel",
          age: 24,
          gender: "Female",
          seat: "C5-12",
          status: "Confirmed"
        }
      ],
      class: "EC",
      pnr: "7651298340",
      status: "Confirmed",
      totalFare: 1650
    },
    {
      id: 3,
      userId: 1,
      trainId: 4,
      bookingDate: "2025-05-01",
      journeyDate: "2025-05-25",
      passengers: [
        {
          name: "Rahul Sharma",
          age: 28,
          gender: "Male",
          seat: "Waitlist",
          status: "Waitlisted"
        }
      ],
      class: "EC",
      pnr: "9823145670",
      status: "Waitlisted",
      totalFare: 1950
    }
  ],
  stations: [
    { id: 1, name: "Delhi", code: "NDLS" },
    { id: 2, name: "Mumbai", code: "CSTM" },
    { id: 3, name: "Lucknow", code: "LKO" },
    { id: 4, name: "Ahmedabad", code: "ADI" },
    { id: 5, name: "Kolkata", code: "HWH" },
    { id: 6, name: "Chennai", code: "MAS" },
    { id: 7, name: "Bangalore", code: "SBC" },
    { id: 8, name: "Hyderabad", code: "HYD" },
    { id: 9, name: "Pune", code: "PUNE" },
    { id: 10, name: "Jaipur", code: "JP" }
  ]
};

// Function to initialize the database connection
export const initializeDatabase = async () => {
  console.log("Initializing database connection with:");
  console.log(`Host: ${dbConfig.host}`);
  console.log(`User: ${dbConfig.user}`);
  console.log(`Database: ${dbConfig.database}`);
  console.log(`Port: ${dbConfig.port}`);
  
  try {
    // In a real-world scenario, this would connect to a real MySQL database
    // Since we're using a frontend-only approach for demonstration, we'll simulate success
    
    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Database Connection Successful",
      description: `Connected to ${dbConfig.database} database as ${dbConfig.user}`,
    });
    
    console.log("Database connected successfully");
    return true;
  } catch (error) {
    console.error("Failed to connect to database:", error);
    
    toast({
      title: "Database Connection Failed",
      description: "Could not connect to the database. Check console for details.",
      variant: "destructive",
    });
    
    return false;
  }
};

// Function to get data from "tables"
export const getTableData = (tableName: keyof typeof mockDatabaseData) => {
  // In a real app, this would be an API call to your backend
  return mockDatabaseData[tableName] || [];
};

// Function to simulate running a SQL query
export const runQuery = async (sql: string) => {
  console.log("Running SQL query:", sql);
  
  // Simulate query processing delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Very basic SQL parser for demonstration
  try {
    const normalizedSql = sql.toLowerCase().trim();
    
    if (normalizedSql.includes("select") && normalizedSql.includes("from")) {
      // Extract table name (very simplified)
      const fromIndex = normalizedSql.indexOf("from");
      const tableNamePart = normalizedSql.slice(fromIndex + 4).trim().split(/\s+/)[0];
      const tableName = tableNamePart.replace(';', '') as keyof typeof mockDatabaseData;
      
      if (mockDatabaseData[tableName]) {
        return {
          success: true,
          data: mockDatabaseData[tableName],
          message: `Query executed successfully. ${mockDatabaseData[tableName].length} records found.`
        };
      } else {
        return {
          success: false,
          data: [],
          message: `Table '${tableName}' not found in database.`
        };
      }
    }
    
    return {
      success: false,
      data: [],
      message: "Only SELECT queries are supported in this demonstration."
    };
  } catch (error) {
    console.error("Error executing query:", error);
    return {
      success: false,
      data: [],
      message: "Error executing query. See console for details."
    };
  }
};
