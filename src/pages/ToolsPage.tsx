import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ChevronLeft } from 'lucide-react';
import { toolsData } from '../data/courseData';

export default function ToolsPage() {
  const categories = [...new Set(toolsData.map(t => t.category))];

  return (
    <div className="py-12 px-6">
      <div className="max-w-[800px] mx-auto">
        <Link to="/resources" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-6">
          <ChevronLeft className="w-4 h-4" /> Resources
        </Link>

        <div className="mb-12">
          <h1 className="text-h1 text-neutral-900 dark:text-white mb-4">Tools</h1>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400">
            Essential AI coding tools covered in this course.
          </p>
        </div>

        {categories.map(category => (
          <div key={category} className="mb-8">
            <h2 className="text-h3 text-neutral-900 dark:text-white mb-4">{category}</h2>
            <div className="space-y-3">
              {toolsData.filter(t => t.category === category).map(tool => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-surface dark:bg-neutral-800 rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all group"
                >
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{tool.description}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
