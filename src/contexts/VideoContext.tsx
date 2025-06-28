'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Video, VideoCategory, VideoContextType } from '@/types';

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};

interface VideoProviderProps {
  children: ReactNode;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | 'all'>('all');

  // Load videos from localStorage on mount
  useEffect(() => {
    const savedVideos = localStorage.getItem('catflix-videos');
    if (savedVideos) {
      try {
        setVideos(JSON.parse(savedVideos));
      } catch (error) {
        console.error('Error parsing saved videos:', error);
      }
    }
  }, []);

  // Save videos to localStorage whenever videos change
  useEffect(() => {
    localStorage.setItem('catflix-videos', JSON.stringify(videos));
  }, [videos]);

  const addVideo = (videoData: Omit<Video, 'id' | 'uploadDate'>) => {
    const newVideo: Video = {
      ...videoData,
      id: `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      uploadDate: new Date().toISOString(),
    };
    setVideos(prev => [...prev, newVideo]);
  };

  const getVideosByCategory = (category: VideoCategory): Video[] => {
    return videos.filter(video => video.category === category);
  };

  const getAllCategories = (): VideoCategory[] => {
    const categories: VideoCategory[] = ['birds', 'fish', 'laser-pointers', 'mice', 'feather-toys', 'catnip', 'other'];
    return categories;
  };

  const contextValue: VideoContextType = {
    videos,
    addVideo,
    getVideosByCategory,
    getAllCategories,
    selectedCategory,
    setSelectedCategory,
  };

  return <VideoContext.Provider value={contextValue}>{children}</VideoContext.Provider>;
}; 