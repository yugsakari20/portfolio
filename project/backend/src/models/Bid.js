import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  auction: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' },
}, { timestamps: true });

export default mongoose.model('Bid', bidSchema);
