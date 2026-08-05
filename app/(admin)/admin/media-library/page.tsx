'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Upload, Search, ImageIcon, Trash2, Copy, Check, AlertTriangle, CheckCircle2, Activity, Sparkles, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

interface MediaFile {
  url: string;
  name: string;
  size: number;
  createdAt: string;
  altText?: string;
  originalSize?: number;
  width?: number;
  height?: number;
  isWebpOptimized?: boolean;
}

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'missing_alt' | 'webp'>('all');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
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
      formData.append('folderName', 'uploads');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Image uploaded successfully');
        await fetchMedia();
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

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(window.location.origin + url);
      setCopiedUrl(url);
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const updateAltText = async (url: string, newAltText: string) => {
    try {
      const res = await fetch('/api/media/metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, altText: newAltText }),
      });
      
      if (res.ok) {
        setFiles(files.map(f => f.url === url ? { ...f, altText: newAltText } : f));
        toast.success('Alt text saved');
      } else {
        toast.error('Failed to save alt text');
      }
    } catch (error) {
      toast.error('Failed to save alt text');
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Stats
  const totalImages = files.length;
  const missingAltCount = files.filter(f => !f.altText || f.altText.trim() === '').length;
  const webpCount = files.filter(f => f.isWebpOptimized).length;
  const seoHealth = totalImages > 0 ? Math.round(((totalImages - missingAltCount) / totalImages) * 100) : 100;

  // Filtering
  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || (f.altText && f.altText.toLowerCase().includes(searchTerm.toLowerCase()));
    if (!matchesSearch) return false;
    
    if (filterTab === 'missing_alt') return !f.altText || f.altText.trim() === '';
    if (filterTab === 'webp') return f.isWebpOptimized;
    return true;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[32px] font-extrabold text-zinc-900 tracking-tight font-serif">
            Media Library & Image SEO
          </h1>
          <p className="text-zinc-500 mt-2 text-[15px]">
            Manage images, auto-generate AI Alt tags, and optimize WebP image compression.
          </p>
        </div>
        <div className="flex gap-4">
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
            className="flex items-center gap-2 px-6 py-2.5 bg-[#f97316] text-white font-bold rounded-xl hover:bg-[#ea580c] transition-colors shadow-lg shadow-orange-500/20 disabled:opacity-50 text-[15px]"
          >
            <Upload className="w-5 h-5" />
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-zinc-400 tracking-widest uppercase mb-1">Total Images</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-zinc-900">{totalImages}</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">In media directory</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-zinc-400 tracking-widest uppercase mb-1">Missing Alt Text</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-zinc-900">{missingAltCount}</span>
            </div>
            <p className="text-xs text-amber-600 font-medium mt-1">Needs Optimization</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-zinc-400 tracking-widest uppercase mb-1">WebP Optimized</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-zinc-900">{webpCount}</span>
            </div>
            <p className="text-xs text-emerald-600 font-medium mt-1">Fast Load Speed</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-zinc-400 tracking-widest uppercase mb-1">SEO Health</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-zinc-900">{seoHealth}%</span>
            </div>
            <p className="text-xs text-purple-600 font-medium mt-1">High Image Rank</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-zinc-100 mb-6 flex items-center justify-between">
        <div className="relative w-[400px]">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search images by name or alt tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-zinc-50/50 border-none rounded-xl text-[14px] text-zinc-900 focus:ring-0 focus:bg-zinc-100 transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-1 p-1 bg-zinc-50 rounded-xl">
          <button 
            onClick={() => setFilterTab('all')}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all ${filterTab === 'all' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/60' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            All Media
          </button>
          <button 
            onClick={() => setFilterTab('missing_alt')}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all ${filterTab === 'missing_alt' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/60' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            Missing Alt Tag
          </button>
          <button 
            onClick={() => setFilterTab('webp')}
            className={`px-4 py-2 text-[13px] font-bold rounded-lg transition-all ${filterTab === 'webp' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/60' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            WebP Optimized
          </button>
        </div>
      </div>

      {/* Image List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-zinc-100 shadow-sm text-zinc-400">
            <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg">No media files found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredFiles.map((file) => (
              <div key={file.url} className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm flex gap-5 group hover:border-orange-200 transition-colors">
                
                {/* Thumbnail */}
                <div className="w-40 h-32 rounded-xl bg-zinc-100 overflow-hidden relative shrink-0">
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                  {file.isWebpOptimized && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/70 text-white text-[9px] font-black tracking-widest rounded-md uppercase backdrop-blur-sm">
                      WEBP
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-zinc-900 truncate text-[15px]">{file.name}</h3>
                    <p className="text-[13px] text-zinc-500 mt-0.5 flex items-center gap-2">
                      {file.width && file.height ? `${file.width}x${file.height}` : 'Unknown Dimensions'}
                      <span className="text-zinc-300">•</span>
                      <span>{formatSize(file.size)}</span>
                      {file.originalSize && file.originalSize > file.size && (
                        <span className="text-emerald-600 font-medium text-[11px] ml-1 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                          Saved {formatSize(file.originalSize - file.size)}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wide">Alt Text (SEO Image Tag)</label>
                      <button 
                        className="flex items-center gap-1 text-[11px] font-bold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded-md transition-colors"
                        onClick={() => toast.success('AI integration coming soon!')}
                      >
                        <Sparkles className="w-3 h-3" />
                        AI Generate
                      </button>
                    </div>
                    <input 
                      type="text"
                      defaultValue={file.altText || ''}
                      onBlur={(e) => {
                        if (e.target.value !== file.altText) {
                          updateAltText(file.url, e.target.value);
                        }
                      }}
                      placeholder="Describe this image for Google SEO..."
                      className="w-full px-3 py-2 bg-white border border-yellow-400 rounded-lg text-[14px] text-zinc-900 focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-500 transition-all placeholder:text-zinc-400"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <button 
                      onClick={() => copyToClipboard(file.url)}
                      className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-500 hover:text-zinc-800 transition-colors"
                    >
                      {copiedUrl === file.url ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      Copy URL
                    </button>
                    
                    <div className="flex gap-2">
                      <a href={file.url} target="_blank" rel="noreferrer" className="p-1.5 text-zinc-400 hover:text-zinc-800 transition-colors" title="Open in new tab">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button 
                        onClick={() => {
                          toast.error('Delete functionality requires backend API update');
                        }}
                        className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
                        title="Delete Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
