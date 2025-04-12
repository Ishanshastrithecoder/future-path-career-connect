
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, Bell, MessageSquare, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user?.username?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container-inner py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-careerblue-600 to-careerblue-800 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <span className="font-bold text-xl text-careerblue-800">FuturePathAI</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-careerblue-600 font-medium">Home</Link>
            <Link to="/career-explorer" className="text-gray-700 hover:text-careerblue-600 font-medium">Career Explorer</Link>
            <Link to="/chatbot" className="text-gray-700 hover:text-careerblue-600 font-medium">Career Assistant</Link>
            <Link to="/resume-builder" className="text-gray-700 hover:text-careerblue-600 font-medium">Resume Builder</Link>
            <Link to="/mentors" className="text-gray-700 hover:text-careerblue-600 font-medium">Mentors</Link>
            <Link to="/network" className="text-gray-700 hover:text-careerblue-600 font-medium">Network</Link>
          </div>

          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-3">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell size={20} className="text-gray-700" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MessageSquare size={20} className="text-gray-700" />
                  </Button>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="rounded-full p-1">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.profilePicture} alt={user?.username} />
                          <AvatarFallback className="bg-careerblue-600 text-white">
                            {getInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown size={16} className="text-gray-600" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Log in
                </Button>
                <Button onClick={() => navigate('/register')} className="bg-careerblue-600 hover:bg-careerblue-700">
                  Sign up
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-200 animate-fade-in">
            <div className="space-y-3">
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-careerblue-600 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/career-explorer"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-careerblue-600 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Career Explorer
              </Link>
              <Link
                to="/chatbot"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-careerblue-600 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Career Assistant
              </Link>
              <Link
                to="/resume-builder"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-careerblue-600 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume Builder
              </Link>
              <Link
                to="/mentors"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-careerblue-600 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mentors
              </Link>
              <Link
                to="/network"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-careerblue-600 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Network
              </Link>
              {!isAuthenticated && (
                <div className="pt-4 space-y-3 border-t border-gray-200">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log in
                  </Button>
                  <Button 
                    className="w-full bg-careerblue-600 hover:bg-careerblue-700" 
                    onClick={() => {
                      navigate('/register');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
