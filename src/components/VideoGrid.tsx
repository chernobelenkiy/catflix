'use client';

import { useVideoContext } from '@/contexts/VideoContext';
import VideoCard from './VideoCard';

export default function VideoGrid() {
  const { videos, selectedCategory, getVideosByCategory } = useVideoContext();

  const displayVideos = selectedCategory === 'all' ? videos : getVideosByCategory(selectedCategory);

  if (displayVideos.length === 0) {
    return (
      <div className="netflix-container">
        <div className="text-center py-24">
          <div className="text-8xl mb-8 animate-bounce">🐱</div>
          <h2 className="text-3xl md:text-4xl font-bold text-netflix-white mb-6">
            {selectedCategory === 'all' 
              ? "No videos uploaded yet" 
              : `No ${selectedCategory.replace('-', ' ')} videos yet`
            }
          </h2>
          <p className="text-xl text-netflix-light-gray mb-12 max-w-2xl mx-auto leading-relaxed">
            {selectedCategory === 'all'
              ? "Start building your cat entertainment library by uploading some amazing videos that will keep your feline friends engaged and entertained!"
              : `Upload some ${selectedCategory.replace('-', ' ')} videos to get started. Your cats will love the variety!`
            }
          </p>
          <a
            href="/upload"
            className="btn-netflix text-lg px-10 py-4 shadow-xl"
          >
            Upload Your First Video
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="netflix-container">
      {/* Section header */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-netflix-white mb-4">
          {selectedCategory === 'all' 
            ? 'All Videos' 
            : selectedCategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
          }
        </h2>
        <p className="text-xl text-netflix-light-gray">
          {displayVideos.length} video{displayVideos.length !== 1 ? 's' : ''} available for your cats to enjoy
        </p>
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
        {displayVideos.map((video) => (
          <div key={video.id} className="animate-fade-in">
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </div>
  );
} 