import React from 'react';
import { Sparkles, TrendingUp, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-amber-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Bid on the World's Most
            <span className="text-amber-300 block">Premium Items</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover rare collectibles, luxury goods, and exclusive items from verified sellers worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button className="bg-amber-500 text-white px-8 py-4 rounded-lg hover:bg-amber-600 font-semibold text-lg transition-colors">
              Start Bidding
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 font-semibold text-lg transition-colors">
              Learn More
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <Sparkles className="h-12 w-12 text-amber-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-blue-100">All items are carefully vetted and authenticated by our experts.</p>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="h-12 w-12 text-amber-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Bidding</h3>
              <p className="text-blue-100">Real-time bidding system with instant notifications and updates.</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-amber-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-blue-100">Safe and secure payment processing with buyer protection.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;