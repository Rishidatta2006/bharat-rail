
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
      train_number: "12301",
      train_name: "Rajdhani Express",
      coaches: 22,
      train_type: "Rajdhani",
      from: "Delhi",
      to: "Mumbai",
      starting_station: "New Delhi (NDLS)",
      ending_station: "Mumbai Central (MMCT)",
      intermediate_stops: ["Mathura", "Kota", "Ratlam", "Vadodara", "Surat"],
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
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:00",
      starting_station_state: "Delhi",
      imageUrl: "https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "NR-01"
    },
    {
      id: 2,
      train_number: "12002",
      train_name: "Shatabdi Express",
      coaches: 16,
      train_type: "Shatabdi",
      from: "Delhi",
      to: "Lucknow",
      starting_station: "New Delhi (NDLS)",
      ending_station: "Lucknow Jn (LKO)",
      intermediate_stops: ["Ghaziabad", "Aligarh", "Tundla", "Etawah", "Kanpur"],
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
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:00",
      starting_station_state: "Delhi",
      imageUrl: "https://images.unsplash.com/photo-1573413154008-87b37a7d04a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "NR-02"
    },
    {
      id: 3,
      train_number: "12213",
      train_name: "Duronto Express",
      coaches: 18,
      train_type: "Duronto",
      from: "Mumbai",
      to: "Delhi",
      starting_station: "Mumbai Central (MMCT)",
      ending_station: "New Delhi (NDLS)",
      intermediate_stops: ["Surat", "Vadodara", "Ratlam", "Kota"],
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
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "11:00",
      starting_station_state: "Maharashtra",
      imageUrl: "https://images.unsplash.com/photo-1540544660406-6a69dacb2804?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      route_id: "WR-01"
    },
    {
      id: 4,
      train_number: "22119",
      train_name: "Vande Bharat Express",
      coaches: 16,
      train_type: "Vande Bharat",
      from: "Mumbai",
      to: "Ahmedabad",
      starting_station: "Mumbai Central (MMCT)",
      ending_station: "Ahmedabad Junction (ADI)",
      intermediate_stops: ["Borivali", "Vapi", "Surat", "Vadodara", "Anand"],
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
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "11:00",
      starting_station_state: "Maharashtra",
      imageUrl: "https://images.unsplash.com/photo-1527303361864-c228e3f25587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
      route_id: "WR-02"
    },
    {
      id: 5,
      train_number: "12303",
      train_name: "Poorva Express",
      coaches: 20,
      train_type: "Superfast",
      from: "Howrah",
      to: "Delhi",
      starting_station: "Howrah Junction (HWH)",
      ending_station: "New Delhi (NDLS)",
      intermediate_stops: ["Asansol", "Dhanbad", "Gaya", "Mughal Sarai", "Allahabad", "Kanpur"],
      departureTime: "08:15",
      arrivalTime: "07:50",
      duration: "23h 35m",
      days: ["Mon", "Wed", "Fri", "Sun"],
      classes: ["SL", "3A", "2A"],
      totalSeats: 680,
      availableSeats: 120,
      fare: {
        "SL": 680,
        "3A": 1280,
        "2A": 2180
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:30",
      starting_station_state: "West Bengal",
      imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "ER-01"
    },
    {
      id: 6,
      train_number: "12622",
      train_name: "Tamil Nadu Express",
      coaches: 21,
      train_type: "Superfast",
      from: "Chennai",
      to: "Delhi",
      starting_station: "Chennai Central (MAS)",
      ending_station: "New Delhi (NDLS)",
      intermediate_stops: ["Vijayawada", "Nagpur", "Bhopal", "Jhansi", "Agra", "Mathura"],
      departureTime: "22:00",
      arrivalTime: "07:10",
      duration: "33h 10m",
      days: ["Daily"],
      classes: ["SL", "3A", "2A", "1A"],
      totalSeats: 750,
      availableSeats: 85,
      fare: {
        "SL": 850,
        "3A": 1550,
        "2A": 2650,
        "1A": 4300
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "11:00",
      starting_station_state: "Tamil Nadu",
      imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "SR-01"
    },
    {
      id: 7,
      train_number: "12650",
      train_name: "Karnataka Sampark Kranti",
      coaches: 19,
      train_type: "Sampark Kranti",
      from: "Bangalore",
      to: "Delhi",
      starting_station: "KSR Bengaluru (SBC)",
      ending_station: "H. Nizamuddin (NZM)",
      intermediate_stops: ["Dharmavaram", "Secunderabad", "Nagpur", "Bhopal", "Jhansi", "Agra"],
      departureTime: "13:30",
      arrivalTime: "16:55",
      duration: "27h 25m",
      days: ["Tue", "Thu", "Sat"],
      classes: ["SL", "3A", "2A"],
      totalSeats: 680,
      availableSeats: 154,
      fare: {
        "SL": 780,
        "3A": 1380,
        "2A": 2480
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:15",
      starting_station_state: "Karnataka",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "SWR-01"
    },
    {
      id: 8,
      train_number: "12723",
      train_name: "Telangana Express",
      coaches: 18,
      train_type: "Superfast",
      from: "Hyderabad",
      to: "Delhi",
      starting_station: "Hyderabad Deccan (HYB)",
      ending_station: "New Delhi (NDLS)",
      intermediate_stops: ["Secunderabad", "Nagpur", "Bhopal", "Jhansi", "Gwalior", "Agra"],
      departureTime: "06:35",
      arrivalTime: "10:25",
      duration: "27h 50m",
      days: ["Daily"],
      classes: ["SL", "3A", "2A"],
      totalSeats: 650,
      availableSeats: 110,
      fare: {
        "SL": 760,
        "3A": 1360,
        "2A": 2460
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:30",
      starting_station_state: "Telangana",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "SCR-01"
    },
    {
      id: 9,
      train_number: "12951",
      train_name: "Mumbai Rajdhani",
      coaches: 19,
      train_type: "Rajdhani",
      from: "Mumbai",
      to: "Delhi",
      starting_station: "Mumbai Central (MMCT)",
      ending_station: "New Delhi (NDLS)",
      intermediate_stops: ["Surat", "Vadodara", "Ratlam", "Kota"],
      departureTime: "17:00",
      arrivalTime: "08:35",
      duration: "15h 35m",
      days: ["Daily"],
      classes: ["3A", "2A", "1A"],
      totalSeats: 550,
      availableSeats: 75,
      fare: {
        "3A": 1450,
        "2A": 2550,
        "1A": 4300
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "11:00",
      starting_station_state: "Maharashtra",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "WR-03"
    },
    {
      id: 10,
      train_number: "12009",
      train_name: "Mumbai - Ahmedabad Shatabdi Express",
      coaches: 14,
      train_type: "Shatabdi",
      from: "Mumbai",
      to: "Ahmedabad",
      starting_station: "Mumbai Central (MMCT)",
      ending_station: "Ahmedabad Junction (ADI)",
      intermediate_stops: ["Borivali", "Vapi", "Surat", "Bharuch", "Vadodara", "Anand"],
      departureTime: "06:25",
      arrivalTime: "13:10",
      duration: "6h 45m",
      days: ["Daily except Sunday"],
      classes: ["CC", "EC"],
      totalSeats: 450,
      availableSeats: 130,
      fare: {
        "CC": 900,
        "EC": 1800
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "11:00",
      starting_station_state: "Maharashtra",
      imageUrl: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "WR-04"
    },
    {
      id: 11,
      train_number: "12290",
      train_name: "Nagpur - Duronto Express",
      coaches: 17,
      train_type: "Duronto",
      from: "Mumbai",
      to: "Nagpur",
      starting_station: "Mumbai CST (CSTM)",
      ending_station: "Nagpur Junction (NGP)",
      intermediate_stops: [],
      departureTime: "21:55",
      arrivalTime: "08:45",
      duration: "10h 50m",
      days: ["Wed", "Fri", "Sun"],
      classes: ["SL", "3A", "2A"],
      totalSeats: 580,
      availableSeats: 90,
      fare: {
        "SL": 650,
        "3A": 1250,
        "2A": 2150
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "11:00",
      starting_station_state: "Maharashtra",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "CR-01"
    },
    {
      id: 12,
      train_number: "12628",
      train_name: "Karnataka Express",
      coaches: 21,
      train_type: "Superfast",
      from: "Bangalore",
      to: "Delhi",
      starting_station: "KSR Bengaluru (SBC)",
      ending_station: "New Delhi (NDLS)",
      intermediate_stops: ["Dharmavaram", "Guntakal", "Secunderabad", "Nagpur", "Bhopal", "Jhansi", "Gwalior", "Agra"],
      departureTime: "18:30",
      arrivalTime: "06:20",
      duration: "35h 50m",
      days: ["Daily"],
      classes: ["SL", "3A", "2A"],
      totalSeats: 720,
      availableSeats: 140,
      fare: {
        "SL": 800,
        "3A": 1400,
        "2A": 2500
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:15",
      starting_station_state: "Karnataka",
      imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "SWR-02"
    },
    {
      id: 13,
      train_number: "12655",
      train_name: "Navjeevan Express",
      coaches: 20,
      train_type: "Superfast",
      from: "Chennai",
      to: "Ahmedabad",
      starting_station: "Chennai Central (MAS)",
      ending_station: "Ahmedabad Junction (ADI)",
      intermediate_stops: ["Vijayawada", "Warangal", "Nagpur", "Bhopal", "Ratlam", "Vadodara"],
      departureTime: "19:05",
      arrivalTime: "16:50",
      duration: "45h 45m",
      days: ["Mon", "Wed", "Fri"],
      classes: ["SL", "3A", "2A"],
      totalSeats: 690,
      availableSeats: 130,
      fare: {
        "SL": 850,
        "3A": 1450,
        "2A": 2550
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "11:00",
      starting_station_state: "Tamil Nadu",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "SR-02"
    },
    {
      id: 14,
      train_number: "12839",
      train_name: "Howrah - Chennai Mail",
      coaches: 18,
      train_type: "Mail Express",
      from: "Howrah",
      to: "Chennai",
      starting_station: "Howrah Junction (HWH)",
      ending_station: "Chennai Central (MAS)",
      intermediate_stops: ["Kharagpur", "Bhubaneswar", "Visakhapatnam", "Rajahmundry", "Vijayawada", "Nellore"],
      departureTime: "23:45",
      arrivalTime: "17:00",
      duration: "41h 15m",
      days: ["Daily"],
      classes: ["SL", "3A", "2A"],
      totalSeats: 670,
      availableSeats: 120,
      fare: {
        "SL": 780,
        "3A": 1380,
        "2A": 2480
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:30",
      starting_station_state: "West Bengal",
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "ER-02"
    },
    {
      id: 15,
      train_number: "22349",
      train_name: "Patna - Secunderabad SF Express",
      coaches: 19,
      train_type: "Superfast",
      from: "Patna",
      to: "Secunderabad",
      starting_station: "Patna Junction (PNBE)",
      ending_station: "Secunderabad Junction (SC)",
      intermediate_stops: ["Gaya", "Mughal Sarai", "Allahabad", "Satna", "Jabalpur", "Nagpur", "Warangal"],
      departureTime: "09:30",
      arrivalTime: "17:20",
      duration: "31h 50m",
      days: ["Sun", "Tue", "Thu"],
      classes: ["SL", "3A", "2A"],
      totalSeats: 660,
      availableSeats: 140,
      fare: {
        "SL": 790,
        "3A": 1390,
        "2A": 2490
      },
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:45",
      starting_station_state: "Bihar",
      imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      route_id: "ECR-01"
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
      totalFare: 2450,
      bookingType: "Regular"
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
      totalFare: 1650,
      bookingType: "Regular"
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
      totalFare: 1950,
      bookingType: "Tatkal"
    }
  ],
  stations: [
    { id: 1, name: "Delhi", code: "NDLS", state: "Delhi" },
    { id: 2, name: "Mumbai", code: "CSTM", state: "Maharashtra" },
    { id: 3, name: "Lucknow", code: "LKO", state: "Uttar Pradesh" },
    { id: 4, name: "Ahmedabad", code: "ADI", state: "Gujarat" },
    { id: 5, name: "Kolkata", code: "HWH", state: "West Bengal" },
    { id: 6, name: "Chennai", code: "MAS", state: "Tamil Nadu" },
    { id: 7, name: "Bangalore", code: "SBC", state: "Karnataka" },
    { id: 8, name: "Hyderabad", code: "HYD", state: "Telangana" },
    { id: 9, name: "Pune", code: "PUNE", state: "Maharashtra" },
    { id: 10, name: "Jaipur", code: "JP", state: "Rajasthan" },
    { id: 11, name: "Bhopal", code: "BPL", state: "Madhya Pradesh" },
    { id: 12, name: "Patna", code: "PNBE", state: "Bihar" },
    { id: 13, name: "Guwahati", code: "GHY", state: "Assam" },
    { id: 14, name: "Trivandrum", code: "TVC", state: "Kerala" },
    { id: 15, name: "Bhubaneswar", code: "BBS", state: "Odisha" },
    { id: 16, name: "Nagpur", code: "NGP", state: "Maharashtra" },
    { id: 17, name: "Vijayawada", code: "BZA", state: "Andhra Pradesh" },
    { id: 18, name: "Chandigarh", code: "CDG", state: "Chandigarh" },
    { id: 19, name: "Goa", code: "GOA", state: "Goa" },
    { id: 20, name: "Gorakhpur", code: "GKP", state: "Uttar Pradesh" }
  ],
  tatkal_timings: [
    { state: "Delhi", opening_time: "10:00" },
    { state: "Maharashtra", opening_time: "11:00" },
    { state: "Uttar Pradesh", opening_time: "10:15" },
    { state: "Gujarat", opening_time: "10:30" },
    { state: "West Bengal", opening_time: "10:30" },
    { state: "Tamil Nadu", opening_time: "11:00" },
    { state: "Karnataka", opening_time: "10:15" },
    { state: "Telangana", opening_time: "10:30" },
    { state: "Rajasthan", opening_time: "10:00" },
    { state: "Madhya Pradesh", opening_time: "10:15" },
    { state: "Bihar", opening_time: "10:45" },
    { state: "Assam", opening_time: "10:45" },
    { state: "Kerala", opening_time: "11:15" },
    { state: "Odisha", opening_time: "10:30" },
    { state: "Andhra Pradesh", opening_time: "10:30" },
    { state: "Chandigarh", opening_time: "10:00" },
    { state: "Goa", opening_time: "11:15" }
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
      
      // Handle WHERE clause for filtering (very simplified)
      if (normalizedSql.includes("where")) {
        const whereIndex = normalizedSql.indexOf("where");
        const whereClause = normalizedSql.slice(whereIndex + 5).trim();
        
        // Very basic parsing of WHERE conditions
        if (mockDatabaseData[tableName]) {
          // Filter based on tatkal availability
          if (whereClause.includes("tatkal_available") && whereClause.includes("yes")) {
            return {
              success: true,
              data: mockDatabaseData[tableName].filter((item: any) => 
                item.tatkal_available && item.tatkal_available.toLowerCase() === "yes"
              ),
              message: "Query executed successfully with tatkal filter."
            };
          }
          
          // Filter based on state
          if (whereClause.includes("starting_station_state")) {
            const stateMatch = whereClause.match(/starting_station_state\s*=\s*['"]([^'"]+)['"]/i);
            if (stateMatch && stateMatch[1]) {
              const state = stateMatch[1];
              return {
                success: true,
                data: mockDatabaseData[tableName].filter((item: any) => 
                  item.starting_station_state && item.starting_station_state.toLowerCase() === state.toLowerCase()
                ),
                message: `Query executed successfully with state filter for ${state}.`
              };
            }
          }
          
          // If WHERE clause exists but we don't handle it specifically
          return {
            success: true,
            data: mockDatabaseData[tableName],
            message: "Query executed successfully. WHERE clause partially supported."
          };
        }
      }
      
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

// Function to create a new booking
export const createBooking = async (bookingData: any) => {
  try {
    // Generate a new booking ID
    const newBookingId = mockDatabaseData.bookings.length + 1;
    
    // Generate a random PNR number
    const pnr = Math.floor(Math.random() * 9000000000) + 1000000000;
    
    // Create new booking object
    const newBooking = {
      id: newBookingId,
      pnr: pnr.toString(),
      ...bookingData,
      status: "Confirmed"
    };
    
    // In a real app, this would save to the database
    mockDatabaseData.bookings.push(newBooking);
    
    // Return the booking details
    return {
      success: true,
      booking: newBooking,
      message: "Booking created successfully"
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      booking: null,
      message: "Failed to create booking. See console for details."
    };
  }
};

// Function to get PNR status
export const getPNRStatus = async (pnr: string) => {
  try {
    // Find booking by PNR
    const booking = mockDatabaseData.bookings.find(b => b.pnr === pnr);
    
    if (!booking) {
      return {
        success: false,
        booking: null,
        message: "PNR not found"
      };
    }
    
    // Find associated train
    const train = mockDatabaseData.trains.find(t => t.id === booking.trainId);
    
    return {
      success: true,
      booking: {
        ...booking,
        train: train ? {
          name: train.train_name,
          number: train.train_number,
          from: train.from,
          to: train.to,
          departureTime: train.departureTime,
          arrivalTime: train.arrivalTime
        } : null
      },
      message: "PNR status retrieved successfully"
    };
  } catch (error) {
    console.error("Error retrieving PNR status:", error);
    return {
      success: false,
      booking: null,
      message: "Failed to retrieve PNR status. See console for details."
    };
  }
};

// Function to search trains
export const searchTrains = (from: string, to: string, date: string) => {
  try {
    // Filter trains that match the route
    const trains = mockDatabaseData.trains.filter(train => {
      return (train.from.toLowerCase() === from.toLowerCase() || 
             train.starting_station.toLowerCase().includes(from.toLowerCase())) && 
             (train.to.toLowerCase() === to.toLowerCase() || 
             train.ending_station.toLowerCase().includes(to.toLowerCase()));
    });
    
    if (trains.length === 0) {
      return {
        success: false,
        data: [],
        message: "No trains found for this route"
      };
    }
    
    return {
      success: true,
      data: trains,
      message: `Found ${trains.length} trains for this route`
    };
  } catch (error) {
    console.error("Error searching trains:", error);
    return {
      success: false,
      data: [],
      message: "Error searching for trains. See console for details."
    };
  }
};
