import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Button from './Button';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">PLP Task Manager</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '🌞 Light' : '🌙 Dark'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;