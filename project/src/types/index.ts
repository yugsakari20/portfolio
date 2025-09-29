export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at: string;
}

export interface AuctionItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  starting_price: number;
  current_price: number;
  reserve_price?: number;
  category: string;
  condition: 'new' | 'like-new' | 'excellent' | 'good' | 'fair';
  end_time: string;
  seller_id: string;
  status: 'active' | 'ended' | 'cancelled';
  created_at: string;
  seller?: User;
}

export interface Bid {
  id: string;
  item_id: string;
  bidder_id: string;
  amount: number;
  created_at: string;
  bidder?: User;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}