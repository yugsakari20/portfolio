# Bid Placement Fix TODO

## Issue: Bids not showing and price not increasing due to Supabase/MongoDB sync issue.

### Steps:
1. **Install Supabase client in backend**
   - Run `cd backend && npm install @supabase/supabase-js`

2. **Update backend/src/config/db.js** ✅
   - Add Supabase client setup with URL and key from environment variables.

3. **Update backend/src/controllers/bidController.js** ✅
   - After updating MongoDB auction, update the corresponding Supabase auction_items row with new current_price.

4. **Update src/hooks/useBids.ts** ✅
   - After placing a bid, trigger a refetch of auction items to get updated price.

5. **Test the fix**
   - Place a bid and verify price increases and bid shows in history.
   - Check real-time updates.

### Environment Variables:
- `SUPABASE_URL=your_supabase_url`
- `SUPABASE_ANON_KEY=your_supabase_anon_key`
