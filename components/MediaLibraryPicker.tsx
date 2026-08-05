'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Search, Check, ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

interface MediaFile {
  url: string;
  name: string;
  size: number;
  createdAt: string;
}

interface MediaLibraryPickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
  folderName?: string;
}

export default function MediaLibraryPicker({ onSelect, onClose, folderName = 'general' }: MediaLibraryPickerProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUrl, setSelectedUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media');
      const data = await res.json();
      if (res.ok) {
        setFiles(data.files || []);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folderName', folderName);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Image uploaded successfully');
        await fetchMedia();
        setSelectedUrl(data.url);
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-xl font-bold text-zinc-800 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-orange-500" />
            Media Library
          </h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex gap-3">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleUpload}
              accept="image/*"
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-sm font-semibold rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex-1 overflow-y-auto p-6 bg-zinc-50">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
              <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
              <p>No images found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredFiles.map((file) => (
                <div 
                  key={file.url}
                  onClick={() => setSelectedUrl(file.url)}
                  className={`group relative aspect-square rounded-xl border-2 overflow-hidden cursor-pointer bg-white ${selectedUrl === file.url ? 'border-orange-500 ring-4 ring-orange-500/20' : 'border-transparent hover:border-zinc-300'}`}
                >
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-xs truncate" title={file.name}>{file.name}</p>
                    <p className="text-white/70 text-[10px] mt-0.5">{formatSize(file.size)}</p>
                  </div>

                  {selectedUrl === file.url && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white p-1 rounded-full shadow-lg">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-100 bg-white flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => selectedUrl && onSelect(selectedUrl)}
            disabled={!selectedUrl}
            className="px-6 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all disabled:opacity-50 disabled:shadow-none"
          >
            Insert Selected Image
          </button>
        </div>
      </div>
    </div>
  );
}
