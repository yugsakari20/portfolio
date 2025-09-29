import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AuctionItem } from '../types';

export const useAuctionItems = () => {
  const [items, setItems] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('auction_items')
        .select(`
          *,
          seller:profiles(*)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('auction_items_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'auction_items' },
        () => fetchItems()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { items, loading, refetch: fetchItems };
};