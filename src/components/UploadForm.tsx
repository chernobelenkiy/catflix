'use client';

import { useState } from 'react';
import { useVideoContext } from '@/contexts/VideoContext';
import { VideoCategory, UploadFormData } from '@/types';

const categories: VideoCategory[] = ['birds', 'fish', 'laser-pointers', 'mice', 'feather-toys', 'catnip', 'other'];

const categoryLabels: Record<VideoCategory, string> = {
  birds: 'Birds 🐦',
  fish: 'Fish 🐟', 
  'laser-pointers': 'Laser Pointers 🔴',
  mice: 'Mice 🐭',
  'feather-toys': 'Feather Toys 🪶',
  catnip: 'Catnip 🌿',
  other: 'Other 🎯',
};

export default function UploadForm() {
  const { addVideo } = useVideoContext();
  const [formData, setFormData] = useState<UploadFormData>({
    title: '',
    description: '',
    category: 'other',
    file: null,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file');
        return;
      }
      
      setError(null);
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      setError('Please select a video file');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', formData.file);
      uploadFormData.append('title', formData.title);
      uploadFormData.append('description', formData.description || '');
      uploadFormData.append('category', formData.category);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const video = await response.json();
      addVideo(video);
      setUploadSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'other',
        file: null,
      });
      
      // Reset file input
      const fileInput = document.getElementById('video-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  if (uploadSuccess) {
    return (
      <div className="text-center py-12">
        <div className="text-8xl mb-6 animate-bounce">🎉</div>
        <h2 className="text-3xl font-bold text-netflix-white mb-4">Upload Successful!</h2>
        <p className="text-xl text-netflix-light-gray mb-6">
          Your video has been uploaded and is ready for cats to enjoy!
        </p>
        <div className="flex items-center justify-center text-netflix-light-gray">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Redirecting to homepage...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-netflix-white mb-3">Share Your Video</h2>
        <p className="text-netflix-light-gray">Fill out the details below to upload your cat entertainment video</p>
      </div>

      {error && (
        <div className="bg-red-600 bg-opacity-20 border border-red-500 text-red-100 px-6 py-4 rounded-xl flex items-center">
          <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-netflix-white mb-3">
            Video Title *
          </label>
          <input
            type="text"
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-4 py-3 bg-netflix-medium-gray border border-gray-600 rounded-lg text-netflix-white placeholder-netflix-light-gray focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent transition-all duration-200"
            placeholder="e.g., Colorful Birds at the Feeder"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-netflix-white mb-3">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-4 py-3 bg-netflix-medium-gray border border-gray-600 rounded-lg text-netflix-white placeholder-netflix-light-gray focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Describe what makes this video entertaining for cats..."
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-netflix-white mb-3">
            Category *
          </label>
          <select
            id="category"
            required
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as VideoCategory }))}
            className="w-full px-4 py-3 bg-netflix-medium-gray border border-gray-600 rounded-lg text-netflix-white focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent transition-all duration-200"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-netflix-medium-gray">
                {categoryLabels[category]}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="video-file" className="block text-sm font-semibold text-netflix-white mb-3">
            Video File *
          </label>
          <div className="relative">
            <input
              type="file"
              id="video-file"
              accept="video/*"
              required
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="video-file"
              className="w-full flex flex-col items-center justify-center px-6 py-12 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-netflix-red transition-colors duration-200 group"
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">
                📹
              </div>
              <div className="text-center">
                <div className="text-netflix-white font-semibold mb-2">
                  {formData.file ? formData.file.name : 'Choose a video file'}
                </div>
                <div className="text-netflix-light-gray text-sm">
                  {formData.file 
                    ? `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB` 
                    : 'MP4, MOV, AVI up to 50MB'
                  }
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={uploading || !formData.file || !formData.title}
          className="w-full btn-netflix text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
        >
          {uploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <span className="mr-3">🚀</span>
              Upload Video
            </>
          )}
        </button>
      </div>
    </form>
  );
} 