'use client';

import Link from 'next/link';
import { Video } from '@/types';

interface VideoCardProps {
  video: Video;
}

const categoryEmojis: Record<string, string> = {
  birds: '🐦',
  fish: '🐟',
  'laser-pointers': '🔴',
  mice: '🐭',
  'feather-toys': '🪶',
  catnip: '🌿',
  other: '🎯',
};

export default function VideoCard({ video }: VideoCardProps) {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Link href={`/watch/${video.id}`} className="block group">
      <div className="video-card bg-netflix-dark-gray rounded-lg overflow-hidden shadow-lg">
        {/* Video thumbnail/poster */}
        <div className="relative aspect-video bg-gradient-to-br from-netflix-medium-gray to-netflix-dark-gray flex items-center justify-center">
          {video.thumbnailPath ? (
            <img
              src={video.thumbnailPath}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-6">
              <div className="text-5xl mb-3 opacity-80">
                {categoryEmojis[video.category] || '📹'}
              </div>
              <div className="text-netflix-light-gray text-sm font-medium">
                No thumbnail
              </div>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300"></div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="bg-netflix-red bg-opacity-90 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
              <svg className="w-8 h-8 text-netflix-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Duration badge */}
          {video.duration && (
            <div className="absolute bottom-3 right-3 bg-netflix-black bg-opacity-80 text-netflix-white text-xs px-3 py-1 rounded-full font-medium">
              {formatDuration(video.duration)}
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3 bg-netflix-red bg-opacity-90 text-netflix-white text-xs px-3 py-1 rounded-full font-medium flex items-center space-x-1">
            <span>{categoryEmojis[video.category]}</span>
            <span className="capitalize">{video.category.replace('-', ' ')}</span>
          </div>
        </div>

        {/* Video info */}
        <div className="p-5">
          <h3 className="text-netflix-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-netflix-red transition-colors duration-200">
            {video.title}
          </h3>
          
          {video.description && (
            <p className="text-netflix-light-gray text-sm mb-4 line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
          
          <div className="flex items-center justify-between text-xs text-netflix-light-gray">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{formatDate(video.uploadDate)}</span>
            </div>
            <div className="text-right">
              <div className="font-medium">{formatFileSize(video.fileSize)}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 