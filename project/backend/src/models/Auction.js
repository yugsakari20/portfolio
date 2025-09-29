import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String, required: true },
  startingPrice: { type: Number, required: true },
  currentPrice: { type: Number, default: 0 },
  endTime: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Auction', auctionSchema);
