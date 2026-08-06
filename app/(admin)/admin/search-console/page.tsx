'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ToastProvider';
import {
  Search,
  MousePointerClick,
  Eye,
  Percent,
  Trophy,
  Send,
  Loader2,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function SearchConsolePage() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [pingLoading, setPingLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [topPages, setTopPages] = useState<any[]>([]);
  const [pingUrl, setPingUrl] = useState('');
  
  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gsc/stats');
      const data = await res.json();
      if (res.ok) {
        setStats(data.totals);
        setTopPages(data.topPages || []);
      } else {
        toast.error(data.error || 'Failed to fetch GSC stats');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handlePing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pingUrl) return;
    
    setPingLoading(true);
    try {
      const res = await fetch('/api/indexing/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: pingUrl, type: 'URL_UPDATED' }),
      });
      const data = await res.json();
      
      if (res.ok) {
        toast.success('URL successfully submitted to Google Indexing API!');
        setPingUrl('');
      } else {
        toast.error(data.error || 'Failed to submit URL');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during submission');
    } finally {
      setPingLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-600" />
            Google Search Console
          </h1>
          <p className="text-gray-500 mt-1">Live performance metrics and instant indexing</p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Clicks"
          value={stats?.clicks || 0}
          icon={<MousePointerClick className="w-5 h-5 text-blue-600" />}
          loading={loading}
        />
        <MetricCard
          title="Total Impressions"
          value={stats?.impressions || 0}
          icon={<Eye className="w-5 h-5 text-purple-600" />}
          loading={loading}
        />
        <MetricCard
          title="Average CTR"
          value={stats ? `${(stats.ctr * 100).toFixed(2)}%` : '0%'}
          icon={<Percent className="w-5 h-5 text-emerald-600" />}
          loading={loading}
        />
        <MetricCard
          title="Average Position"
          value={stats ? stats.position.toFixed(1) : '0'}
          icon={<Trophy className="w-5 h-5 text-amber-600" />}
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Pages</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium">
                <tr>
                  <th className="px-6 py-4">Page URL</th>
                  <th className="px-6 py-4 text-right">Clicks</th>
                  <th className="px-6 py-4 text-right">Impressions</th>
                  <th className="px-6 py-4 text-right">Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      Loading data...
                    </td>
                  </tr>
                ) : topPages.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No data available for the last 30 days
                    </td>
                  </tr>
                ) : (
                  topPages.map((page, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4">
                        <a 
                          href={page.keys[0]} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {page.keys[0].replace(/^https?:\/\/[^\/]+/, '') || '/'}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">{page.clicks}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{page.impressions}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{page.position.toFixed(1)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Indexing API Tool */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Instant Indexing Ping</h2>
          <p className="text-sm text-gray-500 mb-6">
            Force Google to crawl a specific URL immediately using the Indexing API. Best for new or updated content.
          </p>

          <form onSubmit={handlePing} className="space-y-4">
            <div>
              <label htmlFor="pingUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Page URL to Ping
              </label>
              <input
                id="pingUrl"
                type="url"
                required
                placeholder="https://titangrowthhub.com/..."
                value={pingUrl}
                onChange={(e) => setPingUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={pingLoading || !pingUrl}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {pingLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {pingLoading ? 'Pinging Google...' : 'Ping Google Now'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
            <strong>Note:</strong> You have a limited daily quota (usually 200 requests) for the Indexing API. Use this only when publishing or significantly updating pages.
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, loading }: { title: string; value: string | number; icon: React.ReactNode; loading: boolean }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gray-50 rounded-lg">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      </div>
      <div className="mt-2">
        {loading ? (
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <span className="text-3xl font-bold text-gray-900">{value}</span>
        )}
      </div>
    </div>
  );
}
