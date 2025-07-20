import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Timer, CheckSquare, BarChart2, Menu, X, Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', icon: <Timer size={20} />, label: 'Timer' },
    { to: '/tasks', icon: <CheckSquare size={20} />, label: 'Tasks' },
    { to: '/stats', icon: <BarChart2 size={20} />, label: 'Stats' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white">
                <Timer size={20} />
              </div>
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">
                Pomodoro
              </span>
            </NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1
                  transition-all duration-200 
                  ${isActive
                    ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }
                `}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
            
          
          </div>

          <div className="md:hidden flex items-center">
           
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-96 opacity-100 shadow-lg' 
          : 'max-h-0 opacity-0 pointer-events-none'
      } overflow-hidden bg-white dark:bg-gray-900`}>
        <div className="pt-2 pb-4 space-y-1 px-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `
                block px-3 py-3 rounded-md text-base font-medium flex items-center space-x-3
                transition-all duration-200
                ${isActive
                  ? 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }
              `}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;