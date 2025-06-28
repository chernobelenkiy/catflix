'use client';

import Link from 'next/link';
import { useVideoContext } from '@/contexts/VideoContext';
import { VideoCategory } from '@/types';

const categoryLabels: Record<VideoCategory | 'all', string> = {
  all: 'All Videos',
  birds: 'Birds',
  fish: 'Fish',
  'laser-pointers': 'Laser Pointers',
  mice: 'Mice',
  'feather-toys': 'Feather Toys',
  catnip: 'Catnip',
  other: 'Other',
};

export default function Navigation() {
  const { getAllCategories, selectedCategory, setSelectedCategory } = useVideoContext();
  const categories = getAllCategories();

  return (
    <nav className="fixed top-0 w-full bg-netflix-dark-gray bg-opacity-95 backdrop-blur-md z-50 border-b border-netflix-medium-gray">
      <div className="netflix-container">
        {/* Top bar with logo and main navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="text-netflix-red text-3xl font-bold group-hover:scale-105 transition-transform duration-200">
              🐱
            </div>
            <div className="text-netflix-red text-2xl font-bold tracking-tight">
              CATFLIX
            </div>
          </Link>

          {/* Main navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-netflix-white hover:text-netflix-light-gray transition-colors duration-200 font-medium"
            >
              Browse
            </Link>
            <Link 
              href="/upload" 
              className="btn-netflix"
            >
              Upload Video
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link 
              href="/upload" 
              className="bg-netflix-red hover:bg-netflix-dark-red px-4 py-2 rounded text-sm font-semibold transition-colors duration-200"
            >
              Upload
            </Link>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center space-x-3 pb-4 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-netflix-white text-netflix-black shadow-lg'
                : 'bg-netflix-medium-gray text-netflix-light-gray hover:bg-gray-600'
            }`}
          >
            {categoryLabels.all}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-netflix-white text-netflix-black shadow-lg'
                  : 'bg-netflix-medium-gray text-netflix-light-gray hover:bg-gray-600'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
} 