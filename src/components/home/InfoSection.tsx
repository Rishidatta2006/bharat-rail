
import { MapPin, Calendar, Ticket, User } from 'lucide-react';

const InfoSection = () => {
  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-primary-500" />,
      title: 'India-wide Network',
      description: 'Book tickets for trains connecting over 7,000 stations across India's vast railway network.'
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary-500" />,
      title: 'Advanced Booking',
      description: 'Reserve seats up to 120 days in advance and plan your journey with complete peace of mind.'
    },
    {
      icon: <Ticket className="h-8 w-8 text-primary-500" />,
      title: 'Easy Cancellation',
      description: 'Hassle-free cancellation process with timely refunds as per railway policies.'
    },
    {
      icon: <User className="h-8 w-8 text-primary-500" />,
      title: 'User Accounts',
      description: 'Create an account to manage bookings, save favorite routes, and speed up future transactions.'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose BharatRail Vista</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the next generation of Indian railway reservations with our modern features and user-friendly platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-primary-100 text-sm font-medium uppercase tracking-wider">Travel Smart</span>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold text-white leading-tight">
                Download our mobile app for a seamless booking experience
              </h3>
              <p className="mt-4 text-primary-100 max-w-md">
                Access your tickets offline, receive journey alerts, and enjoy exclusive mobile-only offers. Available on iOS and Android.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on App Store" className="h-10" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-10" />
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Mobile app" 
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
