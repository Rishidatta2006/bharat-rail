
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(loginData.email, loginData.password);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back to BharatRail Vista!",
        });
        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords you entered don't match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(registerData.name, registerData.email, registerData.password);
      
      if (success) {
        toast({
          title: "Registration Successful",
          description: "Welcome to BharatRail Vista!",
        });
        navigate('/');
      } else {
        toast({
          title: "Registration Failed",
          description: "Please check your details and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-xl border-none">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold">Welcome to BharatRail Vista</h1>
                  <p className="text-gray-600">Login or create an account to continue</p>
                </div>
                
                <Tabs defaultValue="login">
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <Input
                            id="login-email"
                            name="email"
                            type="email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <Input
                            id="login-password"
                            name="password"
                            type="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              id="remember-me"
                              type="checkbox"
                              className="h-4 w-4 text-primary-500 rounded border-gray-300"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                              Remember me
                            </label>
                          </div>
                          <div>
                            <a href="#" className="text-sm text-primary-600 hover:underline">
                              Forgot password?
                            </a>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-primary-500 hover:bg-primary-600"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Logging in...' : 'Login'}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <form onSubmit={handleRegister}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <Input
                            id="register-name"
                            name="name"
                            value={registerData.name}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <Input
                            id="register-email"
                            name="email"
                            type="email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <Input
                            id="register-password"
                            name="password"
                            type="password"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                          </label>
                          <Input
                            id="register-confirm-password"
                            name="confirmPassword"
                            type="password"
                            value={registerData.confirmPassword}
                            onChange={handleRegisterChange}
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-primary-500 hover:bg-primary-600"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Creating account...' : 'Register'}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
