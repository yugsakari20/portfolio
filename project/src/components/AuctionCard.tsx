import React, { useState, useEffect } from 'react';
import { Clock, Eye, Heart, Gavel } from 'lucide-react';
import { AuctionItem } from '../types';
import BidModal from './BidModal';

interface AuctionCardProps {
  item: AuctionItem;
}

const AuctionCard: React.FC<AuctionCardProps> = ({ item }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const endTime = new Date(item.end_time).getTime();
      const distance = endTime - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`);
        } else {
          setTimeLeft(`${minutes}m`);
        }
      } else {
        setTimeLeft('Ended');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [item.end_time]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
        <div className="relative">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {item.category}
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
            <button className="bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors">
              <Eye className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{timeLeft}</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500">Current Bid</p>
              <p className="text-2xl font-bold text-green-600">
                ${item.current_price.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Starting at</p>
              <p className="text-sm text-gray-400 line-through">
                ${item.starting_price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.condition === 'new' ? 'bg-green-100 text-green-800' :
                item.condition === 'like-new' ? 'bg-blue-100 text-blue-800' :
                item.condition === 'excellent' ? 'bg-purple-100 text-purple-800' :
                item.condition === 'good' ? 'bg-yellow-100 text-yellow-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {item.condition}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              by {item.seller?.name || 'Unknown'}
            </p>
          </div>

          <button
            onClick={() => setIsBidModalOpen(true)}
            className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg hover:bg-amber-600 font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Gavel className="h-5 w-5" />
            <span>Place Bid</span>
          </button>
        </div>
      </div>

      <BidModal
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        item={item}
      />
    </>
  );
};

export default AuctionCard;