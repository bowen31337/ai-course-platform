import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';
import { glossaryData } from '../data/courseData';

export default function GlossaryPage() {
  const [search, setSearch] = useState('');

  const filtered = glossaryData.filter(
    item =>
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12 px-6">
      <div className="max-w-[800px] mx-auto">
        <Link to="/resources" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-6">
          <ChevronLeft className="w-4 h-4" /> Resources
        </Link>

        <div className="mb-8">
          <h1 className="text-h1 text-neutral-900 dark:text-white mb-4">Glossary</h1>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400">
            Key terms and definitions for AI-assisted development.
          </p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 bg-surface dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="space-y-4">
          {filtered.map(item => (
            <div key={item.term} className="bg-surface dark:bg-neutral-800 rounded-xl p-6 shadow-card">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{item.term}</h3>
              <p className="text-neutral-500 dark:text-neutral-400">{item.definition}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">
              No terms found matching "{search}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
