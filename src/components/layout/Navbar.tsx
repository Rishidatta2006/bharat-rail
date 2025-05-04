
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Find Trains", path: "/trains" },
    { name: "My Bookings", path: "/bookings" },
    { name: "PNR Status", path: "/pnr-status" },
    { name: "Tatkal Booking", path: "/tatkal" },
    { name: "Database", path: "/database" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleBookNowClick = () => {
    navigate('/trains');
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="font-bold text-2xl text-primary-500">Bharat</span>
            <span className="font-bold text-2xl text-secondary-500">Rail</span>
          </div>
          <span className="hidden md:inline-block text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">Vista</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-primary-500 transition-colors font-medium">
            Home
          </Link>
          <Link to="/trains" className="text-foreground hover:text-primary-500 transition-colors font-medium">
            Trains
          </Link>
          <Link to="/bookings" className="text-foreground hover:text-primary-500 transition-colors font-medium">
            My Bookings
          </Link>
          <Link to="/pnr" className="text-foreground hover:text-primary-500 transition-colors font-medium">
            PNR Status
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary-500 transition-colors font-medium">
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/trains')}>
            <Search className="h-4 w-4" />
          </Button>
          {isAuthenticated ? (
            <Button variant="outline" onClick={handleLogoutClick}>
              <User className="h-4 w-4 mr-2" /> Logout
            </Button>
          ) : (
            <Button variant="outline" onClick={handleLoginClick}>
              <User className="h-4 w-4 mr-2" /> Login
            </Button>
          )}
          <Button className="bg-primary-500 hover:bg-primary-600" onClick={handleBookNowClick}>Book Now</Button>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu}>
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 lg:hidden pt-16 px-4",
          isMobileMenuOpen ? "flex flex-col" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-4 py-4">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} className="text-lg font-medium p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              {item.name}
            </Link>
          ))}
          <div className="border-t border-border my-2"></div>
          {isAuthenticated ? (
            <Button variant="outline" className="justify-start" onClick={handleLogoutClick}>
              <User className="h-4 w-4 mr-2" /> Logout
            </Button>
          ) : (
            <Button variant="outline" className="justify-start" onClick={handleLoginClick}>
              <User className="h-4 w-4 mr-2" /> Login
            </Button>
          )}
          <Button className="bg-primary-500 hover:bg-primary-600" onClick={handleBookNowClick}>Book Now</Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
