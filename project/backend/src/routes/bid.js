import express from 'express';
import { placeBid, getBidsByAuction } from '../controllers/bidController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/:auctionId', auth, placeBid);
router.get('/:auctionId', getBidsByAuction);

export default router;
