export interface Video {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  fileName: string;
  filePath: string;
  thumbnailPath?: string;
  uploadDate: string;
  duration?: number;
  fileSize: number;
}

export type VideoCategory = 
  | 'birds'
  | 'fish'
  | 'laser-pointers'
  | 'mice'
  | 'feather-toys'
  | 'catnip'
  | 'other';

export interface VideoContextType {
  videos: Video[];
  addVideo: (video: Omit<Video, 'id' | 'uploadDate'>) => void;
  getVideosByCategory: (category: VideoCategory) => Video[];
  getAllCategories: () => VideoCategory[];
  selectedCategory: VideoCategory | 'all';
  setSelectedCategory: (category: VideoCategory | 'all') => void;
}

export interface UploadFormData {
  title: string;
  description: string;
  category: VideoCategory;
  file: File | null;
} 