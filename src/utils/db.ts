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
  database: 'RailwayReservationSystem',
  port: 3306
};

// Mock database tables and data for the frontend
// This mimics the structure from the SQL queries provided
export const mockDatabaseData = {
  user: [
    {
      Aadhar_ID: '241814704698',
      First_Name: 'John',
      Last_Name: 'Doe',
      Email: 'john.doe@email.com',
      Password: 'password123',
      Phone_Number: '9876543210',
      Gender: 'Male',
      Address_Line1: 'Street 1, Mumbai',
      Address_Line2: 'Maharashtra'
    },
    {
      Aadhar_ID: '341814704699',
      First_Name: 'Alice',
      Last_Name: 'Smith',
      Email: 'alice.smith@email.com',
      Password: 'pass456',
      Phone_Number: '8765432109',
      Gender: 'Female',
      Address_Line1: 'Street 2, Delhi',
      Address_Line2: 'Delhi'
    },
    {
      Aadhar_ID: '441814704700',
      First_Name: 'Robert',
      Last_Name: 'Johnson',
      Email: 'robert.j@email.com',
      Password: 'pass789',
      Phone_Number: '7654321098',
      Gender: 'Male',
      Address_Line1: 'Street 3, Bangalore',
      Address_Line2: 'Karnataka'
    },
    {
      Aadhar_ID: '541814704701',
      First_Name: 'Emily',
      Last_Name: 'Davis',
      Email: 'emily.d@email.com',
      Password: 'pass101',
      Phone_Number: '6543210987',
      Gender: 'Female',
      Address_Line1: 'Street 4, Chennai',
      Address_Line2: 'Tamil Nadu'
    },
    {
      Aadhar_ID: '641814704702',
      First_Name: 'Michael',
      Last_Name: 'Garcia',
      Email: 'michael.g@email.com',
      Password: 'pass202',
      Phone_Number: '5432109876',
      Gender: 'Male',
      Address_Line1: 'Street 5, Hyderabad',
      Address_Line2: 'Telangana'
    }
  ],
  passenger: [
    {
      Passenger_ID: 'SE646DFS84R',
      First_Name: 'Michael',
      Last_Name: 'Brown',
      Email: 'michael.b@email.com',
      Gender: 'Male',
      Age: 30,
      Phone_Number: '9876123456'
    },
    {
      Passenger_ID: 'SE647DFS85R',
      First_Name: 'Emma',
      Last_Name: 'Wilson',
      Email: 'emma.w@email.com',
      Gender: 'Female',
      Age: 25,
      Phone_Number: '8765123456'
    },
    {
      Passenger_ID: 'SE648DFS86R',
      First_Name: 'James',
      Last_Name: 'Taylor',
      Email: 'james.t@email.com',
      Gender: 'Male',
      Age: 28,
      Phone_Number: '7654321234'
    },
    {
      Passenger_ID: 'SE649DFS87R',
      First_Name: 'Olivia',
      Last_Name: 'Anderson',
      Email: 'olivia.a@email.com',
      Gender: 'Female',
      Age: 22,
      Phone_Number: '6543212345'
    },
    {
      Passenger_ID: 'SE650DFS88R',
      First_Name: 'Liam',
      Last_Name: 'Thomas',
      Email: 'liam.t@email.com',
      Gender: 'Male',
      Age: 35,
      Phone_Number: '5432109876'
    },
    {
      Passenger_ID: 'SE651DFS89R',
      First_Name: 'Sophia',
      Last_Name: 'Martinez',
      Email: 'sophia.m@email.com',
      Gender: 'Female',
      Age: 27,
      Phone_Number: '8975123456'
    },
    {
      Passenger_ID: 'SE652DFS90R',
      First_Name: 'William',
      Last_Name: 'Roberts',
      Email: 'william.r@email.com',
      Gender: 'Male',
      Age: 31,
      Phone_Number: '7651234567'
    },
    {
      Passenger_ID: 'SE653DFS91R',
      First_Name: 'Ava',
      Last_Name: 'Williams',
      Email: 'ava.w@email.com',
      Gender: 'Female',
      Age: 29,
      Phone_Number: '6512345678'
    }
  ],
  feedback: [
    {
      Feedback_ID: '3686416846',
      Passenger_ID: 'SE646DFS84R',
      Feedback_Text: 'Great service and comfortable journey.'
    },
    {
      Feedback_ID: '3686416847',
      Passenger_ID: 'SE647DFS85R',
      Feedback_Text: 'The train was on time, but the food could be better.'
    },
    {
      Feedback_ID: '3686416848',
      Passenger_ID: 'SE648DFS86R',
      Feedback_Text: 'Had a wonderful experience, will travel again!'
    },
    {
      Feedback_ID: '3686416849',
      Passenger_ID: 'SE649DFS87R',
      Feedback_Text: 'The seats were not clean.'
    },
    {
      Feedback_ID: '3686416850',
      Passenger_ID: 'SE650DFS88R',
      Feedback_Text: 'Overall a good journey, but the delay was disappointing.'
    },
    {
      Feedback_ID: '3686416851',
      Passenger_ID: 'SE651DFS89R',
      Feedback_Text: 'The staff was very helpful and courteous.'
    },
    {
      Feedback_ID: '3686416852',
      Passenger_ID: 'SE652DFS90R',
      Feedback_Text: 'Train was late by 30 minutes, but otherwise good service.'
    },
    {
      Feedback_ID: '3686416853',
      Passenger_ID: 'SE653DFS91R',
      Feedback_Text: 'Clean compartments and good food service.'
    }
  ],
  train: [
    {
      Train_Number: 17655,
      Train_Name: 'Chennai Express',
      Coaches: 10,
      imageUrl: "https://images.unsplash.com/photo-1601210462440-33a900f414e5?q=80&w=1000&auto=format&fit=crop",
      availableSeats: 120,
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:00",
      classes: ["Sleeper", "AC", "General"],
      fare: {
        "Sleeper": 750,
        "AC": 1250,
        "General": 350
      },
      train_type: "Express",
      days: ["Mon", "Wed", "Fri"]
    },
    {
      Train_Number: 17656,
      Train_Name: 'Mumbai Superfast',
      Coaches: 12,
      imageUrl: "https://images.unsplash.com/photo-1552619252-3dca5d6c1278?q=80&w=1000&auto=format&fit=crop",
      availableSeats: 80,
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:30",
      classes: ["Sleeper", "AC", "General"],
      fare: {
        "Sleeper": 850,
        "AC": 1350,
        "General": 450
      },
      train_type: "Superfast",
      days: ["Daily"]
    },
    {
      Train_Number: 17657,
      Train_Name: 'Bangalore Rajdhani',
      Coaches: 15,
      imageUrl: "https://images.unsplash.com/photo-1540544660406-6a69dacb2804?q=80&w=1000&auto=format&fit=crop",
      availableSeats: 150,
      tatkal_available: "Yes",
      tatkal_booking_start_time: "11:00",
      classes: ["Sleeper", "AC"],
      fare: {
        "Sleeper": 900,
        "AC": 1600
      },
      train_type: "Rajdhani",
      days: ["Tue", "Thu", "Sat"]
    },
    {
      Train_Number: 17658,
      Train_Name: 'Hyderabad Shatabdi',
      Coaches: 8,
      imageUrl: "https://images.unsplash.com/photo-1503387837-b154d5074bd2?q=80&w=1000&auto=format&fit=crop",
      availableSeats: 95,
      tatkal_available: "Yes",
      tatkal_booking_start_time: "11:30",
      classes: ["AC", "General"],
      fare: {
        "AC": 1150,
        "General": 550
      },
      train_type: "Shatabdi",
      days: ["Daily"]
    },
    {
      Train_Number: 17659,
      Train_Name: 'Delhi Duronto',
      Coaches: 5,
      imageUrl: "https://images.unsplash.com/photo-1582556828808-36e118ce497e?q=80&w=1000&auto=format&fit=crop",
      availableSeats: 60,
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:15",
      classes: ["AC"],
      fare: {
        "AC": 1800
      },
      train_type: "Duronto",
      days: ["Mon", "Wed", "Fri"]
    },
    {
      Train_Number: 17660,
      Train_Name: 'Vande Bharat Express',
      Coaches: 18,
      imageUrl: "https://images.unsplash.com/photo-1548024769-83f53c1a34f7?q=80&w=1000&auto=format&fit=crop",
      availableSeats: 200,
      tatkal_available: "Yes",
      tatkal_booking_start_time: "10:45",
      classes: ["AC Chair Car", "Executive"],
      fare: {
        "AC Chair Car": 1200,
        "Executive": 2000
      },
      train_type: "Vande Bharat",
      days: ["Daily"]
    },
    {
      Train_Number: 17661,
      Train_Name: 'Tejas Express',
      Coaches: 14,
      imageUrl: "https://images.unsplash.com/photo-1558260250-a1a4ddc2581a?q=80&w=1000&auto=format&fit=crop",
      availableSeats: 180,
      tatkal_available: "Yes",
      tatkal_booking_start_time: "11:15",
      classes: ["AC Chair Car", "Executive"],
      fare: {
        "AC Chair Car": 1100,
        "Executive": 1900
      },
      train_type: "Tejas",
      days: ["Tue", "Thu", "Sat"]
    },
    {
      Train_Number: 17662,
      Train_Name: 'Gatimaan Express',
      Coaches: 16,
      imageUrl: "https://images.unsplash.com/photo-1581089769785-340c94cea921?q=80&w=1000&auto=format&fit=crop",
      availableSeats: 300,
      tatkal_available: "Yes",
      tatkal_booking_start_time: "11:45",
      classes: ["AC Chair Car", "Executive"],
      fare: {
        "AC Chair Car": 1050,
        "Executive": 1850
      },
      train_type: "Gatimaan",
      days: ["Daily"]
    }
  ],
  station: [
    {
      Station_Name: 'Chennai Central',
      Station_Platform: 5
    },
    {
      Station_Name: 'Mumbai Central',
      Station_Platform: 3
    },
    {
      Station_Name: 'Bangalore Junction',
      Station_Platform: 4
    },
    {
      Station_Name: 'Hyderabad Deccan',
      Station_Platform: 2
    },
    {
      Station_Name: 'Delhi Junction',
      Station_Platform: 1
    },
    {
      Station_Name: 'Kolkata Howrah',
      Station_Platform: 3
    },
    {
      Station_Name: 'Pune Junction',
      Station_Platform: 4
    },
    {
      Station_Name: 'Ahmedabad Junction',
      Station_Platform: 2
    }
  ],
  schedule: [
    {
      Train_Name: 'Chennai Express',
      Train_Number: 17655,
      Arrival_Time: '10:00:00',
      Departure_Time: '10:30:00',
      Duration: 30
    },
    {
      Train_Name: 'Mumbai Superfast',
      Train_Number: 17656,
      Arrival_Time: '11:00:00',
      Departure_Time: '11:30:00',
      Duration: 30
    },
    {
      Train_Name: 'Bangalore Rajdhani',
      Train_Number: 17657,
      Arrival_Time: '12:00:00',
      Departure_Time: '12:30:00',
      Duration: 30
    },
    {
      Train_Name: 'Hyderabad Shatabdi',
      Train_Number: 17658,
      Arrival_Time: '13:00:00',
      Departure_Time: '13:30:00',
      Duration: 30
    },
    {
      Train_Name: 'Delhi Duronto',
      Train_Number: 17659,
      Arrival_Time: '14:00:00',
      Departure_Time: '14:30:00',
      Duration: 30
    },
    {
      Train_Name: 'Kolkata Mail',
      Train_Number: 17660,
      Arrival_Time: '15:00:00',
      Departure_Time: '15:30:00',
      Duration: 45
    },
    {
      Train_Name: 'Pune Express',
      Train_Number: 17661,
      Arrival_Time: '16:00:00',
      Departure_Time: '16:30:00',
      Duration: 50
    },
    {
      Train_Name: 'Ahmedabad Local',
      Train_Number: 17662,
      Arrival_Time: '17:00:00',
      Departure_Time: '17:30:00',
      Duration: 60
    }
  ],
  route: [
    {
      Route_ID: 1,
      Train_Number: 17655,
      Starting_Station: 'Chennai Central',
      End_Station: 'Mumbai Central',
      Stops: 'Tambaram, Katpadi, Pune'
    },
    {
      Route_ID: 2,
      Train_Number: 17656,
      Starting_Station: 'Mumbai Central',
      End_Station: 'Bangalore Junction',
      Stops: 'Pune, Satara, Belgaum'
    },
    {
      Route_ID: 3,
      Train_Number: 17657,
      Starting_Station: 'Bangalore Junction',
      End_Station: 'Hyderabad Deccan',
      Stops: 'Kolar, Guntakal, Secunderabad'
    },
    {
      Route_ID: 4,
      Train_Number: 17658,
      Starting_Station: 'Hyderabad Deccan',
      End_Station: 'Delhi Junction',
      Stops: 'Nagpur, Jhansi, Agra'
    },
    {
      Route_ID: 5,
      Train_Number: 17659,
      Starting_Station: 'Chennai Central',
      End_Station: 'Delhi Junction',
      Stops: 'Vijayawada, Bhopal, Agra'
    },
    {
      Route_ID: 6,
      Train_Number: 17660,
      Starting_Station: 'Mumbai Central',
      End_Station: 'Delhi Junction',
      Stops: 'Surat, Vadodara, Kota'
    },
    {
      Route_ID: 7,
      Train_Number: 17661,
      Starting_Station: 'Bangalore Junction',
      End_Station: 'Kolkata Howrah',
      Stops: 'Chennai Central, Bhubaneswar, Howrah'
    },
    {
      Route_ID: 8,
      Train_Number: 17662,
      Starting_Station: 'Chennai Central',
      End_Station: 'Ahmedabad Junction',
      Stops: 'Vijayawada, Surat, Vadodara'
    }
  ],
  booking: [
    {
      Booking_ID: 'TK519155437H45',
      Passenger_ID: 'SE646DFS84R',
      Train_Number: 17655,
      Date_of_Journey: '2025-03-10',
      Source_Station: 'Chennai Central',
      Destination_Station: 'Mumbai Central',
      Booking_Status: 'Confirmed'
    },
    {
      Booking_ID: 'TK519155437H46',
      Passenger_ID: 'SE647DFS85R',
      Train_Number: 17656,
      Date_of_Journey: '2025-03-11',
      Source_Station: 'Mumbai Central',
      Destination_Station: 'Bangalore Junction',
      Booking_Status: 'Waiting'
    },
    {
      Booking_ID: 'TK519155437H47',
      Passenger_ID: 'SE648DFS86R',
      Train_Number: 17657,
      Date_of_Journey: '2025-03-12',
      Source_Station: 'Bangalore Junction',
      Destination_Station: 'Hyderabad Deccan',
      Booking_Status: 'Confirmed'
    },
    {
      Booking_ID: 'TK519155437H48',
      Passenger_ID: 'SE649DFS87R',
      Train_Number: 17658,
      Date_of_Journey: '2025-03-13',
      Source_Station: 'Hyderabad Deccan',
      Destination_Station: 'Delhi Junction',
      Booking_Status: 'Cancelled'
    },
    {
      Booking_ID: 'TK519155437H49',
      Passenger_ID: 'SE650DFS88R',
      Train_Number: 17659,
      Date_of_Journey: '2025-03-14',
      Source_Station: 'Chennai Central',
      Destination_Station: 'Delhi Junction',
      Booking_Status: 'Confirmed'
    },
    {
      Booking_ID: 'TK519155437H50',
      Passenger_ID: 'SE651DFS89R',
      Train_Number: 17660,
      Date_of_Journey: '2025-03-15',
      Source_Station: 'Mumbai Central',
      Destination_Station: 'Delhi Junction',
      Booking_Status: 'Confirmed'
    },
    {
      Booking_ID: 'TK519155437H51',
      Passenger_ID: 'SE652DFS90R',
      Train_Number: 17661,
      Date_of_Journey: '2025-03-16',
      Source_Station: 'Bangalore Junction',
      Destination_Station: 'Kolkata Howrah',
      Booking_Status: 'Waiting'
    },
    {
      Booking_ID: 'TK519155437H52',
      Passenger_ID: 'SE653DFS91R',
      Train_Number: 17662,
      Date_of_Journey: '2025-03-17',
      Source_Station: 'Chennai Central',
      Destination_Station: 'Ahmedabad Junction',
      Booking_Status: 'Confirmed'
    }
  ],
  ticket: [
    {
      PNR: '4405237957',
      Booking_ID: 'TK519155437H45',
      Seat_No: 'A1-21',
      Berth_Type: 'Lower',
      Class: 'AC',
      Boarding_Point: 'Chennai Central'
    },
    {
      PNR: '4405237958',
      Booking_ID: 'TK519155437H46',
      Seat_No: 'B2-22',
      Berth_Type: 'Middle',
      Class: 'Sleeper',
      Boarding_Point: 'Mumbai Central'
    },
    {
      PNR: '4405237959',
      Booking_ID: 'TK519155437H47',
      Seat_No: 'C3-23',
      Berth_Type: 'Upper',
      Class: 'General',
      Boarding_Point: 'Bangalore Junction'
    },
    {
      PNR: '4405237960',
      Booking_ID: 'TK519155437H48',
      Seat_No: 'D4-24',
      Berth_Type: 'Lower',
      Class: 'AC',
      Boarding_Point: 'Hyderabad Deccan'
    },
    {
      PNR: '4405237961',
      Booking_ID: 'TK519155437H49',
      Seat_No: 'E5-25',
      Berth_Type: 'Middle',
      Class: 'Sleeper',
      Boarding_Point: 'Chennai Central'
    },
    {
      PNR: '4405237962',
      Booking_ID: 'TK519155437H50',
      Seat_No: 'F6-26',
      Berth_Type: 'Upper',
      Class: 'AC',
      Boarding_Point: 'Mumbai Central'
    },
    {
      PNR: '4405237963',
      Booking_ID: 'TK519155437H51',
      Seat_No: 'G7-27',
      Berth_Type: 'Lower',
      Class: 'General',
      Boarding_Point: 'Bangalore Junction'
    },
    {
      PNR: '4405237964',
      Booking_ID: 'TK519155437H52',
      Seat_No: 'H8-28',
      Berth_Type: 'Middle',
      Class: 'AC',
      Boarding_Point: 'Chennai Central'
    }
  ],
  mybookings: [
    {
      MyBooking_ID: 1,
      Passenger_ID: 'SE646DFS84R',
      PNR: '4405237957',
      Booking_Status: 'Confirmed'
    },
    {
      MyBooking_ID: 2,
      Passenger_ID: 'SE647DFS85R',
      PNR: '4405237958',
      Booking_Status: 'Waiting'
    },
    {
      MyBooking_ID: 3,
      Passenger_ID: 'SE648DFS86R',
      PNR: '4405237959',
      Booking_Status: 'Confirmed'
    },
    {
      MyBooking_ID: 4,
      Passenger_ID: 'SE649DFS87R',
      PNR: '4405237960',
      Booking_Status: 'Cancelled'
    },
    {
      MyBooking_ID: 5,
      Passenger_ID: 'SE650DFS88R',
      PNR: '4405237961',
      Booking_Status: 'Confirmed'
    },
    {
      MyBooking_ID: 6,
      Passenger_ID: 'SE651DFS89R',
      PNR: '4405237962',
      Booking_Status: 'Confirmed'
    },
    {
      MyBooking_ID: 7,
      Passenger_ID: 'SE652DFS90R',
      PNR: '4405237963',
      Booking_Status: 'Waiting'
    },
    {
      MyBooking_ID: 8,
      Passenger_ID: 'SE653DFS91R',
      PNR: '4405237964',
      Booking_Status: 'Confirmed'
    }
  ],
  payment: [
    {
      Payment_ID: 1,
      PNR: '4405237957',
      Amount: 120.50,
      Payment_Method: 'Credit Card',
      Payment_Status: 'Received'
    },
    {
      Payment_ID: 2,
      PNR: '4405237958',
      Amount: 80.00,
      Payment_Method: 'Debit Card',
      Payment_Status: 'Received'
    },
    {
      Payment_ID: 3,
      PNR: '4405237959',
      Amount: 150.00,
      Payment_Method: 'Net Banking',
      Payment_Status: 'Received'
    },
    {
      Payment_ID: 4,
      PNR: '4405237960',
      Amount: 100.00,
      Payment_Method: 'UPI',
      Payment_Status: 'Returned'
    },
    {
      Payment_ID: 5,
      PNR: '4405237961',
      Amount: 90.00,
      Payment_Method: 'Cash',
      Payment_Status: 'Received'
    },
    {
      Payment_ID: 6,
      PNR: '4405237962',
      Amount: 200.00,
      Payment_Method: 'Credit Card',
      Payment_Status: 'Received'
    },
    {
      Payment_ID: 7,
      PNR: '4405237963',
      Amount: 75.50,
      Payment_Method: 'Net Banking',
      Payment_Status: 'Received'
    },
    {
      Payment_ID: 8,
      PNR: '4405237964',
      Amount: 145.75,
      Payment_Method: 'UPI',
      Payment_Status: 'Received'
    }
  ],
  cancellation: [
    {
      Cancellation_ID: 'CK8616HFC1685',
      PNR: '4405237960',
      Refund_Amount: 80.00
    },
    {
      Cancellation_ID: 'CK8616HFC1686',
      PNR: '4405237958',
      Refund_Amount: 60.00
    },
    {
      Cancellation_ID: 'CK8616HFC1687',
      PNR: '4405237962',
      Refund_Amount: 150.00
    },
    {
      Cancellation_ID: 'CK8616HFC1688',
      PNR: '4405237963',
      Refund_Amount: 50.00
    },
    {
      Cancellation_ID: 'CK8616HFC1689',
      PNR: '4405237964',
      Refund_Amount: 120.00
    }
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
      const tableName = tableNamePart.replace(';', '').replace('`', '').replace('`', '') as keyof typeof mockDatabaseData;
      
      // Handle WHERE clause for filtering (very simplified)
      if (normalizedSql.includes("where")) {
        const whereIndex = normalizedSql.indexOf("where");
        const whereClause = normalizedSql.slice(whereIndex + 5).trim();
        
        // Very basic parsing of WHERE conditions
        if (mockDatabaseData[tableName]) {
          // Filter based on station name for trains
          if (whereClause.includes("starting_station") || whereClause.includes("end_station")) {
            const stationMatch = whereClause.match(/(starting_station|end_station)\s*=\s*['"]([^'"]+)['"]/i);
            if (stationMatch && stationMatch[1] && stationMatch[2]) {
              const field = stationMatch[1].toLowerCase();
              const stationName = stationMatch[2];
              
              return {
                success: true,
                data: mockDatabaseData.route.filter((item: any) => {
                  const matches = field === 'starting_station' 
                    ? item.Starting_Station.toLowerCase() === stationName.toLowerCase()
                    : item.End_Station.toLowerCase() === stationName.toLowerCase();
                  
                  if (matches) {
                    // For each matching route, find the corresponding train details
                    const trainNumber = item.Train_Number;
                    const train = mockDatabaseData.train.find((t: any) => t.Train_Number === trainNumber);
                    if (train) {
                      // Return a combined object with route and train details
                      return { ...item, ...train };
                    }
                  }
                  return false;
                }),
                message: `Found trains with ${field === 'starting_station' ? 'origin' : 'destination'} station: ${stationName}`
              };
            }
          }
          
          // Filter based on train number
          if (whereClause.includes("train_number")) {
            const trainMatch = whereClause.match(/train_number\s*=\s*(\d+)/i);
            if (trainMatch && trainMatch[1]) {
              const trainNumber = parseInt(trainMatch[1]);
              
              if (tableName === 'train') {
                const train = mockDatabaseData.train.find((t: any) => t.Train_Number === trainNumber);
                return {
                  success: !!train,
                  data: train ? [train] : [],
                  message: train ? `Found train with number: ${trainNumber}` : `No train found with number: ${trainNumber}`
                };
              }
              
              if (tableName === 'route') {
                const routes = mockDatabaseData.route.filter((r: any) => r.Train_Number === trainNumber);
                return {
                  success: routes.length > 0,
                  data: routes,
                  message: routes.length > 0 ? `Found routes for train number: ${trainNumber}` : `No routes found for train number: ${trainNumber}`
                };
              }
              
              if (tableName === 'booking') {
                const bookings = mockDatabaseData.booking.filter((b: any) => b.Train_Number === trainNumber);
                return {
                  success: bookings.length > 0,
                  data: bookings,
                  message: bookings.length > 0 ? `Found bookings for train number: ${trainNumber}` : `No bookings found for train number: ${trainNumber}`
                };
              }
            }
          }
          
          // Filter based on PNR for ticket
          if (whereClause.includes("pnr")) {
            const pnrMatch = whereClause.match(/pnr\s*=\s*['"]([^'"]+)['"]/i);
            if (pnrMatch && pnrMatch[1]) {
              const pnr = pnrMatch[1];
              
              const ticket = mockDatabaseData.ticket.find((t: any) => t.PNR === pnr);
              if (ticket) {
                // Find associated booking
                const booking = mockDatabaseData.booking.find((b: any) => b.Booking_ID === ticket.Booking_ID);
                
                if (booking) {
                  // Find passenger details
                  const passenger = mockDatabaseData.passenger.find((p: any) => p.Passenger_ID === booking.Passenger_ID);
                  
                  // Find train details
                  const train = mockDatabaseData.train.find((t: any) => t.Train_Number === booking.Train_Number);
                  
                  // Find route details
                  const route = mockDatabaseData.route.find((r: any) => r.Train_Number === booking.Train_Number);
                  
                  // Get schedule
                  const schedule = mockDatabaseData.schedule.find((s: any) => s.Train_Number === booking.Train_Number);
                  
                  // Get payment
                  const payment = mockDatabaseData.payment.find((p: any) => p.PNR === pnr);
                  
                  // Get cancellation if any
                  const cancellation = mockDatabaseData.cancellation.find((c: any) => c.PNR === pnr);
                  
                  const completeData = {
                    ticket,
                    booking,
                    passenger,
                    train,
                    route,
                    schedule,
                    payment,
                    cancellation
                  };
                  
                  return {
                    success: true,
                    data: [completeData],
                    message: `Found complete details for PNR: ${pnr}`
                  };
                }
              }
              
              return {
                success: false,
                data: [],
                message: `No ticket found for PNR: ${pnr}`
              };
            }
          }
          
          return {
            success: true,
            data: mockDatabaseData[tableName],
            message: `Query executed successfully. WHERE clause partially supported.`
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

// Function to get all stations
export const getStations = () => {
  return mockDatabaseData.station.map(station => ({
    name: station.Station_Name,
    code: station.Station_Name.substring(0, 3).toUpperCase(),
    state: getStateFromStation(station.Station_Name)
  }));
};

// Helper function to get state from station name
function getStateFromStation(stationName: string) {
  if (stationName.includes('Chennai')) return 'Tamil Nadu';
  if (stationName.includes('Mumbai')) return 'Maharashtra';
  if (stationName.includes('Bangalore')) return 'Karnataka';
  if (stationName.includes('Hyderabad')) return 'Telangana';
  if (stationName.includes('Delhi')) return 'Delhi';
  if (stationName.includes('Kolkata') || stationName.includes('Howrah')) return 'West Bengal';
  if (stationName.includes('Pune')) return 'Maharashtra';
  if (stationName.includes('Ahmedabad')) return 'Gujarat';
  return 'Unknown';
}

// Add new table for tatkal timings by state
export const tatkalTimingsByState = {
  'Tamil Nadu': '10:00',
  'Maharashtra': '10:30',
  'Karnataka': '11:00',
  'Telangana': '11:30',
  'Delhi': '10:15',
  'West Bengal': '10:45',
  'Gujarat': '11:15',
  'Andhra Pradesh': '11:45',
};

// Function to search trains
export const searchTrains = (from: string, to: string, date: string) => {
  try {
    if (!from && !to) {
      // If no origin and destination provided, return all trains
      return {
        success: true,
        data: mockDatabaseData.train.map(train => {
          const route = mockDatabaseData.route.find(r => r.Train_Number === train.Train_Number);
          const scheduleInfo = mockDatabaseData.schedule.find(s => s.Train_Number === train.Train_Number);
          
          if (route && scheduleInfo) {
            return {
              id: train.Train_Number,
              train_number: train.Train_Number.toString(),
              train_name: train.Train_Name,
              from: route.Starting_Station,
              to: route.End_Station,
              departureTime: scheduleInfo.Departure_Time.split(':').slice(0, 2).join(':'),
              arrivalTime: scheduleInfo.Arrival_Time.split(':').slice(0, 2).join(':'),
              duration: `${Math.floor(scheduleInfo.Duration / 60)}h ${scheduleInfo.Duration % 60}m`,
              days: train.days || ["Daily"],
              classes: train.classes,
              availableSeats: train.availableSeats,
              fare: train.fare,
              tatkal_available: train.tatkal_available,
              tatkal_booking_start_time: train.tatkal_booking_start_time,
              imageUrl: train.imageUrl,
              train_type: train.train_type
            };
          }
          return null;
        }).filter(Boolean),
        message: "All trains retrieved"
      };
    }

    // Find routes that match the origin and destination
    const matchedRoutes = mockDatabaseData.route.filter(route => {
      const fromMatch = !from || route.Starting_Station.toLowerCase().includes(from.toLowerCase());
      const toMatch = !to || route.End_Station.toLowerCase().includes(to.toLowerCase());
      return fromMatch && toMatch;
    });

    if (matchedRoutes.length === 0) {
      return {
        success: false,
        data: [],
        message: "No trains found for this route"
      };
    }

    // Combine train and route data
    const trains = matchedRoutes.map(route => {
      const trainInfo = mockDatabaseData.train.find(t => t.Train_Number === route.Train_Number);
      const scheduleInfo = mockDatabaseData.schedule.find(s => s.Train_Number === route.Train_Number);
      
      if (trainInfo && scheduleInfo) {
        const startingStationState = getStateFromStation(route.Starting_Station);
        
        // Set tatkal booking time based on starting station's state
        const tatkalTime = tatkalTimingsByState[startingStationState as keyof typeof tatkalTimingsByState] || '12:00';
        
        return {
          id: trainInfo.Train_Number,
          train_number: trainInfo.Train_Number.toString(),
          train_name: trainInfo.Train_Name,
          from: route.Starting_Station,
          to: route.End_Station,
          departureTime: scheduleInfo.Departure_Time.split(':').slice(0, 2).join(':'),
          arrivalTime: scheduleInfo.Arrival_Time.split(':').slice(0, 2).join(':'),
          duration: `${Math.floor(scheduleInfo.Duration / 60)}h ${scheduleInfo.Duration % 60}m`,
          days: trainInfo.days || ["Daily"],
          classes: trainInfo.classes,
          availableSeats: trainInfo.availableSeats,
          fare: trainInfo.fare,
          tatkal_available: trainInfo.tatkal_available,
          tatkal_booking_start_time: tatkalTime, // Use calculated tatkal time
          imageUrl: trainInfo.imageUrl,
          train_type: trainInfo.train_type,
          starting_station_state: startingStationState
        };
      }
      return null;
    }).filter(Boolean);

    return {
      success: trains.length > 0,
      data: trains,
      message: trains.length > 0 
        ? `Found ${trains.length} train(s) for this route` 
        : "No trains found for this route"
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

// Function to get PNR status
export const getPNRStatus = async (pnr: string) => {
  try {
    // Find ticket by PNR
    const ticket = mockDatabaseData.ticket.find(ticket => ticket.PNR === pnr);
    
    if (!ticket) {
      return {
        success: false,
        booking: null,
        message: "PNR not found"
      };
    }
    
    // Find booking
    const booking = mockDatabaseData.booking.find(booking => booking.Booking_ID === ticket.Booking_ID);
    
    if (!booking) {
      return {
        success: false,
        booking: null,
        message: "Booking details not found"
      };
    }
    
    // Find train
    const train = mockDatabaseData.train.find(train => train.Train_Number === booking.Train_Number);
    
    if (!train) {
      return {
        success: false,
        booking: null,
        message: "Train details not found"
      };
    }
    
    // Find passenger
    const passenger = mockDatabaseData.passenger.find(p => p.Passenger_ID === booking.Passenger_ID);
    
    // Find schedule
    const schedule = mockDatabaseData.schedule.find(s => s.Train_Number === booking.Train_Number);
    
    return {
      success: true,
      booking: {
        pnr: ticket.PNR,
        status: booking.Booking_Status,
        bookingDate: new Date(booking.Date_of_Journey).toLocaleDateString('en-GB').split('/').reverse().join('-'),
        journeyDate: booking.Date_of_Journey,
        class: ticket.Class,
        passengers: [{
          name: passenger ? `${passenger.First_Name} ${passenger.Last_Name}` : "Passenger",
          age: passenger ? passenger.Age : 30,
          gender: passenger ? passenger.Gender : "Male",
          seat: ticket.Seat_No,
          status: booking.Booking_Status
        }],
        train: {
          name: train.Train_Name,
          number: train.Train_Number.toString(),
          from: booking.Source_Station,
          to: booking.Destination_Station,
          departureTime: schedule ? schedule.Departure_Time.split(':').slice(0, 2).join(':') : "06:00",
          arrivalTime: schedule ? schedule.Arrival_Time.split(':').slice(0, 2).join(':') : "12:00"
        },
        bookingType: "Regular",
        totalFare: 500
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

// Function to create a new booking
export const createBooking = async (bookingData: any) => {
  try {
    // Generate a new Booking ID with prefix TK
    const bookingId = `TK${Math.floor(Math.random() * 1000000000)}H${Math.floor(Math.random() * 100)}`;
    
    // Generate a random PNR number (10 digits)
    const pnr = Math.floor(Math.random() * 9000000000 + 1000000000).toString();
    
    // Create passenger ID
    const passengerId = `SE${Math.floor(Math.random() * 1000)}DFS${Math.floor(Math.random() * 100)}R`;
    
    // Get the train details
    const train = mockDatabaseData.train.find(train => train.Train_Number === bookingData.trainId);
    
    // Get route details
    const route = mockDatabaseData.route.find(route => route.Train_Number === bookingData.trainId);
    
    if (!train || !route) {
      return {
        success: false,
        booking: null,
        message: "Train details not found"
      };
    }
    
    // Create passenger entries for each passenger
    const passengers = bookingData.passengers.map((p: any) => ({
      Passenger_ID: `SE${Math.floor(Math.random() * 1000)}DFS${Math.floor(Math.random() * 100)}R`,
      First_Name: p.name.split(' ')[0],
      Last_Name: p.name.includes(' ') ? p.name.split(' ').slice(1).join(' ') : 'Passenger',
      Email: `passenger${Math.floor(Math.random() * 10000)}@example.com`,
      Gender: p.gender,
      Age: p.age,
      Phone_Number: `${Math.floor(Math.random() * 9000000000) + 1000000000}`
    }));
    
    // Add passengers to the mock database
    mockDatabaseData.passenger.push(...passengers);
    
    // Create booking entry
    const booking = {
      Booking_ID: bookingId,
      Passenger_ID: passengers[0].Passenger_ID,
      Train_Number: bookingData.trainId,
      Date_of_Journey: bookingData.journeyDate,
      Source_Station: route.Starting_Station,
      Destination_Station: route.End_Station,
      Booking_Status: 'Confirmed'
    };
    
    // Add booking to the mock database
    mockDatabaseData.booking.push(booking);
    
    // Create ticket entry
    const ticket = {
      PNR: pnr,
      Booking_ID: bookingId,
      Seat_No: `${bookingData.class[0]}-${Math.floor(Math.random() * 50) + 1}`,
      Berth_Type: ['Lower', 'Middle', 'Upper'][Math.floor(Math.random() * 3)] as 'Lower' | 'Middle' | 'Upper',
      Class: bookingData.class,
      Boarding_Point: route.Starting_Station
    };
    
    // Add ticket to the mock database
    mockDatabaseData.ticket.push(ticket);
    
    // Create mybooking entry
    const mybooking = {
      MyBooking_ID: mockDatabaseData.mybookings.length + 1,
      Passenger_ID: passengers[0].Passenger_ID,
      PNR: pnr,
      Booking_Status: 'Confirmed'
    };
    
    // Add mybooking to the mock database
    mockDatabaseData.mybookings.push(mybooking);
    
    // Create payment entry
    const payment = {
      Payment_ID: mockDatabaseData.payment.length + 1,
      PNR: pnr,
      Amount: bookingData.totalFare,
      Payment_Method: ['Credit Card', 'Debit Card', 'Net Banking', 'UPI'][Math.floor(Math.random() * 4)] as 'Credit Card' | 'Debit Card' | 'Net Banking' | 'UPI',
      Payment_Status: 'Received'
    };
    
    // Add payment to the mock database
    mockDatabaseData.payment.push(payment);
    
    // Return the booking details
    return {
      success: true,
      booking: {
        pnr,
        bookingId,
        status: 'Confirmed',
        train: train.Train_Name,
        from: route.Starting_Station,
        to: route.End_Station,
        date: bookingData.journeyDate,
        passengers: bookingData.passengers,
        class: bookingData.class,
        totalFare: bookingData.totalFare
      },
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
