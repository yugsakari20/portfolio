import React, { useState } from 'react';
import { X, Gavel, DollarSign, Clock, User } from 'lucide-react';
import { AuctionItem } from '../types';
import { useBids } from '../hooks/useBids';
import { useAuth } from '../contexts/AuthContext';

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: AuctionItem;
}

const BidModal: React.FC<BidModalProps> = ({ isOpen, onClose, item }) => {
  const [bidAmount, setBidAmount] = useState(item.current_price + 10);
  const [loading, setLoading] = useState(false);
  const { bids, placeBid } = useBids(item.id);
  const { user } = useAuth();

  const handleBid = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await placeBid(bidAmount);
      onClose();
    } catch (error) {
      console.error('Error placing bid:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const minBid = item.current_price + 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.category} • {item.condition}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Current Bid</p>
                <p className="text-2xl font-bold text-green-600">
                  ${item.current_price.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Bids</p>
                <p className="text-lg font-semibold">{bids.length}</p>
              </div>
            </div>

            {user && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Bid Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      min={minBid}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum bid: ${minBid.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={handleBid}
                  disabled={loading || bidAmount < minBid}
                  className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Gavel className="h-5 w-5" />
                  <span>{loading ? 'Placing Bid...' : 'Place Bid'}</span>
                </button>
              </div>
            )}

            {!user && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">Please sign in to place a bid.</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Bid History</span>
          </h3>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {bids.length === 0 ? (
              <p className="text-gray-500">No bids yet. Be the first to bid!</p>
            ) : (
              bids.map((bid) => (
                <div key={bid.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {bid.bidder?.name || 'Anonymous'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(bid.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600">
                    ${bid.amount.toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidModal;