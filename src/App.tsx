import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";
import { initializeDatabase } from "@/utils/db";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Trains from "./pages/Trains";
import Bookings from "./pages/Bookings";
import PNRStatus from "./pages/PNRStatus";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import DatabaseView from "./pages/DatabaseView";
import Tatkal from './pages/Tatkal';

const queryClient = new QueryClient();

function App() {
  // Initialize database connection when the app starts
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initializeDatabase();
      } catch (error) {
        console.error("Failed to connect to database:", error);
      }
    };
    
    setupDatabase();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/trains" element={<Trains />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/pnr-status" element={<PNRStatus />} />
              <Route path="/database" element={<DatabaseView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tatkal" element={<Tatkal />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
