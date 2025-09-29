import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import AuctionCard from './components/AuctionCard';
import { useAuctionItems } from './hooks/useAuctionItems';

// Mock data for demonstration
const mockItems = [
  {
    id: '1',
    title: 'Vintage Rolex Submariner 1965',
    description: 'Rare vintage Rolex Submariner in excellent condition with original box and papers.',
    image_url: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    starting_price: 15000,
    current_price: 18500,
    category: 'Luxury Watches',
    condition: 'excellent' as const,
    end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    seller_id: '1',
    status: 'active' as const,
    created_at: new Date().toISOString(),
    seller: { id: '1', name: 'Premium Timepieces', email: 'seller@example.com', created_at: '' }
  },
  {
    id: '2',
    title: 'Diamond Necklace Art Deco Era',
    description: 'Stunning 18k white gold diamond necklace from the 1920s Art Deco period.',
    image_url: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    starting_price: 25000,
    current_price: 32000,
    category: 'Jewelry',
    condition: 'excellent' as const,
    end_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    seller_id: '2',
    status: 'active' as const,
    created_at: new Date().toISOString(),
    seller: { id: '2', name: 'Heritage Jewelers', email: 'seller2@example.com', created_at: '' }
  },
  {
    id: '3',
    title: '1967 Ferrari 275 GTB/4',
    description: 'Rare Ferrari 275 GTB/4 in pristine condition with matching numbers and full documentation.',
    image_url: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    starting_price: 850000,
    current_price: 950000,
    category: 'Classic Cars',
    condition: 'excellent' as const,
    end_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    seller_id: '3',
    status: 'active' as const,
    created_at: new Date().toISOString(),
    seller: { id: '3', name: 'Classic Motors', email: 'seller3@example.com', created_at: '' }
  },
  {
    id: '4',
    title: 'Original Picasso Sketch 1945',
    description: 'Authenticated original sketch by Pablo Picasso from his Blue Period collection.',
    image_url: 'https://images.pexels.com/photos/1570264/pexels-photo-1570264.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    starting_price: 120000,
    current_price: 145000,
    category: 'Fine Art',
    condition: 'excellent' as const,
    end_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    seller_id: '4',
    status: 'active' as const,
    created_at: new Date().toISOString(),
    seller: { id: '4', name: 'Fine Art Gallery', email: 'seller4@example.com', created_at: '' }
  },
  {
    id: '5',
    title: 'Leica M3 Camera 1958',
    description: 'Mint condition Leica M3 rangefinder camera with original leather case and lens.',
    image_url: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    starting_price: 3500,
    current_price: 4200,
    category: 'Electronics',
    condition: 'like-new' as const,
    end_time: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    seller_id: '5',
    status: 'active' as const,
    created_at: new Date().toISOString(),
    seller: { id: '5', name: 'Camera Classics', email: 'seller5@example.com', created_at: '' }
  },
  {
    id: '6',
    title: '1982 Dom Pérignon Champagne',
    description: 'Rare vintage Dom Pérignon champagne, perfectly stored and ready for collection.',
    image_url: 'https://images.pexels.com/photos/1407846/pexels-photo-1407846.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    starting_price: 800,
    current_price: 1200,
    category: 'Collectibles',
    condition: 'excellent' as const,
    end_time: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    seller_id: '6',
    status: 'active' as const,
    created_at: new Date().toISOString(),
    seller: { id: '6', name: 'Wine Collector', email: 'seller6@example.com', created_at: '' }
  }
];

function AppContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { items, loading } = useAuctionItems();
  
  // Use mock data for demonstration since we don't have real data yet
  const displayItems = items.length > 0 ? items : mockItems;
  
  const filteredItems = selectedCategory === 'all' 
    ? displayItems 
    : displayItems.filter(item => 
        item.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory ||
        item.category.toLowerCase().includes(selectedCategory.replace('-', ' '))
      );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedCategory === 'all' ? 'Featured Auctions' : 'Filtered Results'}
          </h2>
          <p className="text-gray-600">
            {filteredItems.length} items available for bidding
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                <div className="h-8 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {filteredItems.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No items found in this category.</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            >
              View All Items
            </button>
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">LuxAuction</h3>
              <p className="text-gray-400">
                The world's premier destination for luxury auctions and premium collectibles.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Jewelry & Watches</a></li>
                <li><a href="#" className="hover:text-white">Fine Art</a></li>
                <li><a href="#" className="hover:text-white">Classic Cars</a></li>
                <li><a href="#" className="hover:text-white">Collectibles</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Buyer Protection</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Newsletter</a></li>
                <li><a href="#" className="hover:text-white">Social Media</a></li>
                <li><a href="#" className="hover:text-white">Mobile App</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LuxAuction. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;