import express from 'express';
import { getAuctions, createAuction, getAuctionById, updateAuction, deleteAuction } from '../controllers/auctionController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAuctions);
router.post('/', auth, createAuction);
router.get('/:id', getAuctionById);
router.put('/:id', auth, updateAuction);
router.delete('/:id', auth, deleteAuction);

export default router;
