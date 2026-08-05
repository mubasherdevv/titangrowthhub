'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ToastProvider';
import {
  Upload,
  Search,
  Image as ImageIcon,
  Wand2,
  CheckCircle2,
  AlertTriangle,
  Download,
  Copy,
  Trash2,
  ExternalLink,
  Check
} from 'lucide-react';

interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  file_format: string;
  dimensions: string;
  alt_text: string;
  storage_path: string;
  created_at: string;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default function MediaLibraryPage() {
  const toast = useToast();
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'missing' | 'webp'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [generatingAltId, setGeneratingAltId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data.success) {
        setMediaList(data.data);
      } else {
        toast.error('Failed to load media');
      }
    } catch (err) {
      toast.error('Error loading media');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const processFile = async (file: File): Promise<{ blob: Blob; dimensions: string; format: string }> => {
    return new Promise((resolve, reject) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        resolve({ blob: file, dimensions: '', format: file.name.split('.').pop() || '' });
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const dimensions = `${img.width}x${img.height}`;
        // Automatically convert images to webp to save space, unless it's an svg
        if (file.type !== 'image/svg+xml') {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({ blob, dimensions, format: 'webp' });
              } else {
                resolve({ blob: file, dimensions, format: file.name.split('.').pop() || '' });
              }
            },
            'image/webp',
            0.8
          );
        } else {
          resolve({ blob: file, dimensions, format: 'svg' });
        }
        URL.revokeObjectURL(url);
      };
      img.onerror = () => reject('Failed to load image');
      img.src = url;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const loadingToastId = toast.success('Processing and uploading...');

    try {
      const { blob, dimensions, format } = await processFile(file);
      
      const formData = new FormData();
      // If we converted to webp, rename file
      const fileName = format === 'webp' 
        ? file.name.replace(/\.[^/.]+$/, "") + '.webp'
        : file.name;
        
      formData.append('file', blob, fileName);
      formData.append('dimensions', dimensions);
      formData.append('isWebp', String(format === 'webp'));
      
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Upload successful!');
        setMediaList([data.data, ...mediaList]);
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (err: any) {
      toast.error('Error during upload: ' + err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Generate AI Alt Text
  const handleGenerateAlt = async (id: string, name: string, url: string) => {
    setGeneratingAltId(id);
    try {
      const res = await fetch('/api/ai/generate-alt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: name, imageUrl: url })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Save to DB
        const saveRes = await fetch('/api/media', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, alt_text: data.altText })
        });
        
        if (saveRes.ok) {
          setMediaList((prev) =>
            prev.map((item) =>
              item.id === id ? { ...item, alt_text: data.altText } : item
            )
          );
          toast.success('AI alt text generated & saved!');
        } else {
          toast.error('Generated but failed to save');
        }
      } else {
        toast.error(data.error || 'AI Generation Failed');
      }
    } catch (err) {
      toast.error('Network error generating Alt Text');
    } finally {
      setGeneratingAltId(null);
    }
  };

  // Copy Image URL
  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Image URL copied to clipboard');
  };

  // Delete Image
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const res = await fetch(`/api/media?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.id !== id));
        toast.success('Image deleted successfully');
      } else {
        toast.error('Failed to delete image');
      }
    } catch (err) {
      toast.error('Error deleting image');
    }
  };

  // Filtered List
  const filteredMedia = mediaList.filter((item) => {
    const matchesSearch =
      item.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.alt_text && item.alt_text.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filterType === 'missing') return matchesSearch && !item.alt_text;
    if (filterType === 'webp') return matchesSearch && item.file_format === 'webp';
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Media Library & Image SEO
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-500 font-medium">
            Manage images, auto-generate AI Alt tags, and optimize WebP image compression.
          </p>
        </div>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        <button 
          onClick={handleUploadClick}
          disabled={isUploading}
          className="flex items-center gap-2 rounded-2xl bg-orange-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md shadow-orange-600/20 transition-all hover:bg-orange-700 active:scale-95 self-start sm:self-auto disabled:opacity-50"
        >
          {isUploading ? <span className="animate-spin">⏳</span> : <Upload className="h-4 w-4" />}
          <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
        </button>
      </div>

      {/* Overview Cards (4 Grid Items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <ImageIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">Total Images</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">{mediaList.length}</p>
            <p className="text-[11px] text-zinc-400 font-medium">In media directory</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">Missing Alt Text</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">
              {mediaList.filter((m) => !m.alt_text).length}
            </p>
            <p className="text-[11px] text-amber-600 font-bold">Needs Optimization</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">WebP Optimized</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">
              {mediaList.filter((m) => m.file_format === 'webp').length}
            </p>
            <p className="text-[11px] text-emerald-600 font-bold">Fast Load Speed</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
            <Wand2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">SEO Health</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">96%</p>
            <p className="text-[11px] text-purple-600 font-bold">High Image Rank</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search images by name or alt tag..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 pl-10 pr-4 py-2 text-xs font-medium text-zinc-800 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 p-1 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setFilterType('missing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'missing' ? 'bg-amber-500 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Missing Alt Tag
          </button>
          <button
            onClick={() => setFilterType('webp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'webp' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            WebP Optimized
          </button>
        </div>
      </div>

      {/* Media Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4 transition-all hover:border-zinc-300"
          >
            {/* Image Thumbnail */}
            <div className="relative h-32 w-full sm:w-40 shrink-0 rounded-xl bg-zinc-100 overflow-hidden border border-zinc-200">
              <img
                src={item.file_url}
                alt={item.alt_text || item.file_name}
                className="h-full w-full object-cover"
              />
              <span className="absolute top-2 left-2 rounded-md bg-zinc-950/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white font-mono uppercase">
                {item.file_format}
              </span>
            </div>

            {/* Content Details */}
            <div className="flex-1 min-w-0 space-y-2.5 w-full">
              <div>
                <p className="font-serif font-extrabold text-sm text-zinc-950 truncate">
                  {item.file_name}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium mt-0.5">
                  <span>{item.dimensions}</span>
                  <span>•</span>
                  <span>{formatBytes(item.file_size)}</span>
                </div>
              </div>

              {/* Alt Text Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-serif font-bold text-zinc-700">
                    Alt Text (SEO Image Tag)
                  </label>
                  {!item.alt_text && (
                    <button
                      onClick={() => handleGenerateAlt(item.id, item.file_name, item.file_url)}
                      disabled={generatingAltId === item.id}
                      className="inline-flex items-center gap-1 text-[10px] font-extrabold text-purple-600 hover:text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/60 disabled:opacity-50"
                    >
                      <Wand2 className="h-3 w-3" />
                      <span>{generatingAltId === item.id ? 'Generating...' : 'AI Generate'}</span>
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.alt_text || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMediaList((prev) =>
                      prev.map((m) =>
                        m.id === item.id ? { ...m, alt_text: val } : m
                      )
                    );
                  }}
                  onBlur={async (e) => {
                    const val = e.target.value;
                    try {
                      await fetch('/api/media', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: item.id, alt_text: val })
                      });
                    } catch (err) {
                      console.error('Failed to save alt text');
                    }
                  }}
                  placeholder="Describe this image for Google SEO..."
                  className={`w-full rounded-xl border px-3 py-1.5 text-xs font-medium text-zinc-900 focus:outline-none ${
                    item.alt_text
                      ? 'border-zinc-200 bg-zinc-50/50 focus:border-orange-500'
                      : 'border-amber-300 bg-amber-50/30 focus:border-amber-500'
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleCopyUrl(item.id, item.file_url)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 hover:text-zinc-900"
                >
                  {copiedId === item.id ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  )}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100"
                    title="Open original image"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    title="Delete image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
