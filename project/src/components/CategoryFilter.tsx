import React from 'react';
import { Gem, Watch, Car, Palette, Camera, Wine } from 'lucide-react';

const categories = [
  { id: 'all', name: 'All Items', icon: null },
  { id: 'jewelry', name: 'Jewelry & Watches', icon: Gem },
  { id: 'luxury-watches', name: 'Luxury Watches', icon: Watch },
  { id: 'classic-cars', name: 'Classic Cars', icon: Car },
  { id: 'art', name: 'Fine Art', icon: Palette },
  { id: 'electronics', name: 'Electronics', icon: Camera },
  { id: 'collectibles', name: 'Collectibles', icon: Wine },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-amber-100 text-amber-800 border-2 border-amber-300'
                  : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              {Icon && <Icon className="h-6 w-6 mb-2" />}
              <span className="text-sm font-medium text-center">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;