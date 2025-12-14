import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, BookOpen, Hash } from 'lucide-react';

interface SearchResult {
  type: 'lesson' | 'week' | 'glossary';
  title: string;
  description?: string;
  url: string;
  weekId?: number;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
}

const typeIcons = {
  lesson: FileText,
  week: BookOpen,
  glossary: Hash,
};

export default function SearchModal({ isOpen, onClose, query, setQuery, results }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!isOpen) {
          // This would need to call openSearch, but we handle it from parent
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleResultClick = (url: string) => {
    navigate(url);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative w-full max-w-xl mx-4 bg-surface dark:bg-neutral-800 rounded-xl shadow-modal overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
          <Search className="w-5 h-5 text-neutral-500" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search lessons, topics, glossary..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-neutral-900 dark:text-white placeholder-neutral-500 outline-none"
          />
          <button onClick={onClose} className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded">
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-[400px] overflow-y-auto p-2">
            {results.map((result, index) => {
              const Icon = typeIcons[result.type];
              return (
                <button
                  key={`${result.url}-${index}`}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-left transition-colors"
                >
                  <Icon className="w-5 h-5 text-neutral-500 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-neutral-900 dark:text-white truncate">{result.title}</p>
                    {result.description && (
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">{result.description}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">No results found for "{query}"</p>
          </div>
        )}

        {query.length < 2 && (
          <div className="p-8 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">Type at least 2 characters to search</p>
          </div>
        )}
      </div>
    </div>
  );
}
