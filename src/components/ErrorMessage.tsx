import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-50 border border-gray-300 rounded-2xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gray-200 rounded-full">
            <AlertCircle className="w-8 h-8 text-black" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-black mb-2">
          Something went wrong
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">
          {message}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
}