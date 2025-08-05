import React, { useState } from 'react';
import { Search, Newspaper } from 'lucide-react';

interface SearchFormProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSearch(topic.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-black rounded-lg">
            <Newspaper className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-black">News Search</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter news topic (e.g., technology, sports, politics)"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="w-full py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Searching...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                <span>Search News</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}