import Bid from '../models/Bid.js';
import Auction from '../models/Auction.js';
import { supabase } from '../config/db.js';

export const placeBid = async (req, res) => {
  try {
    const { amount } = req.body;
    const auction = await Auction.findById(req.params.auctionId);
    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    if (amount <= auction.currentPrice) return res.status(400).json({ message: 'Bid must be higher than current price' });
    const bid = new Bid({ amount, user: req.user.id, auction: auction._id });
    await bid.save();
    auction.currentPrice = amount;
    await auction.save();
    // Update Supabase auction_items
    const { error } = await supabase
      .from('auction_items')
      .update({ current_price: amount })
      .eq('id', req.params.auctionId);
    if (error) console.error('Error updating Supabase:', error);
    res.status(201).json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBidsByAuction = async (req, res) => {
  try {
    const bids = await Bid.find({ auction: req.params.auctionId }).populate('user', 'username');
    // Map backend fields to frontend expectations
    const mappedBids = bids.map(bid => ({
      id: bid._id,
      item_id: bid.auction,
      bidder_id: bid.user?._id,
      amount: bid.amount,
      created_at: bid.createdAt,
      bidder: bid.user ? { name: bid.user.username } : undefined,
    }));
    res.json(mappedBids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
