'use client';

import { useParams, useRouter } from 'next/navigation';
import { useVideoContext } from '@/contexts/VideoContext';
import VideoPlayer from '@/components/VideoPlayer';
import VideoCard from '@/components/VideoCard';

const categoryEmojis: Record<string, string> = {
  birds: '🐦',
  fish: '🐟',
  'laser-pointers': '🔴',
  mice: '🐭',
  'feather-toys': '🪶',
  catnip: '🌿',
  other: '🎯',
};

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const { videos, getVideosByCategory } = useVideoContext();
  
  const videoId = params.id as string;
  const currentVideo = videos.find(video => video.id === videoId);

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😿</div>
          <h1 className="text-2xl font-bold text-white mb-4">Video Not Found</h1>
          <p className="text-gray-400 mb-8">
            The video you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const relatedVideos = getVideosByCategory(currentVideo.category)
    .filter(video => video.id !== currentVideo.id)
    .slice(0, 6); // Show up to 6 related videos

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-white hover:text-red-400 transition-colors mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main video section */}
          <div className="lg:col-span-2">
            {/* Video player */}
            <div className="mb-6">
              <VideoPlayer video={currentVideo} />
            </div>

            {/* Video info */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {currentVideo.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <div className="flex items-center space-x-2">
                      <span>{categoryEmojis[currentVideo.category]}</span>
                      <span className="capitalize">
                        {currentVideo.category.replace('-', ' ')}
                      </span>
                    </div>
                    <span>•</span>
                    <span>{formatDate(currentVideo.uploadDate)}</span>
                    <span>•</span>
                    <span>{formatFileSize(currentVideo.fileSize)}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {currentVideo.description && (
                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {currentVideo.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Related videos */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-white mb-6">
              More {currentVideo.category.replace('-', ' ')} videos
            </h2>
            
            {relatedVideos.length > 0 ? (
              <div className="space-y-4">
                {relatedVideos.map((video) => (
                  <div key={video.id} className="transform hover:scale-105 transition-transform">
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">
                  {categoryEmojis[currentVideo.category]}
                </div>
                <p className="text-gray-400">
                  No other {currentVideo.category.replace('-', ' ')} videos yet.
                </p>
                <a
                  href="/upload"
                  className="inline-block mt-4 text-red-400 hover:text-red-300 transition-colors"
                >
                  Upload more videos
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 