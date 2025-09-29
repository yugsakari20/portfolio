import Auction from '../models/Auction.js';

export const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAuction = async (req, res) => {
  try {
    const auction = new Auction({ ...req.body, user: req.user.id });
    await auction.save();
    res.status(201).json(auction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAuctionById = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    res.json(auction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAuction = async (req, res) => {
  try {
    const auction = await Auction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    res.json(auction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findByIdAndDelete(req.params.id);
    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    res.json({ message: 'Auction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
