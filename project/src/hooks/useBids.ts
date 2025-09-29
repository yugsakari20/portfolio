import { useState, useEffect } from 'react';
import API_URL from '../lib/api';
import { Bid } from '../types';
import { useAuctionItems } from './useAuctionItems';

export const useBids = (itemId: string) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const { refetch } = useAuctionItems();

  const fetchBids = async () => {
    try {
  const res = await fetch(`${API_URL}/bids/${itemId}`);
      if (!res.ok) throw new Error('Failed to fetch bids');
      const data = await res.json();
      setBids(data || []);
    } catch (error) {
      console.error('Error fetching bids:', error);
    } finally {
      setLoading(false);
    }
  };

  const placeBid = async (amount: number) => {
    try {
  const res = await fetch(`${API_URL}/bids/${itemId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Optionally add auth headers here if needed
        },
        body: JSON.stringify({ amount }),
        credentials: 'include', // if your backend uses cookies for auth
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to place bid');
      }
      fetchBids();
      refetch(); // Refetch auction items to get updated price
    } catch (error) {
      console.error('Error placing bid:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchBids();
    // Real-time updates can be implemented with websockets if needed
    // For now, just fetch bids on mount/itemId change
  }, [itemId]);

  return { bids, loading, placeBid };
};