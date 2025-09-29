import React, { useState } from 'react';
import { Search, User, Gavel, Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Gavel className="h-8 w-8 text-amber-500" />
            <h1 className="text-2xl font-bold text-gray-900">LuxAuction</h1>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search premium items..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Browse
              </a>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                Categories
              </a>
              <a href="#" className="text-gray-700 hover:text-amber-600 font-medium transition-colors">
                How it Works
              </a>
            </nav>

            {user ? (
              <div className="flex items-center space-x-4">
                <Bell className="h-6 w-6 text-gray-600 hover:text-amber-600 cursor-pointer transition-colors" />
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-amber-600">
                    <User className="h-6 w-6" />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Profile</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">My Bids</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Watchlist</a>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 border-t border-gray-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 font-medium transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search premium items..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <nav className="flex flex-col space-y-2">
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Browse</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">Categories</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 font-medium">How it Works</a>
              </nav>
              {!user && (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 font-medium transition-colors w-full"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Header;