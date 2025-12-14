import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, BookText, HelpCircle, ChevronRight } from 'lucide-react';

const resources = [
  {
    icon: Wrench,
    title: 'Tools',
    description: 'Setup guides for AI coding tools',
    url: '/resources/tools',
  },
  {
    icon: BookText,
    title: 'Glossary',
    description: 'AI development terminology',
    url: '/resources/glossary',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Common questions answered',
    url: '/resources/faq',
  },
];

export default function ResourcesPage() {
  return (
    <div className="py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          <h1 className="text-h1 text-neutral-900 dark:text-white mb-4">Resources</h1>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400">
            Supplementary materials to support your learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Link
              key={resource.url}
              to={resource.url}
              className="bg-surface dark:bg-neutral-800 rounded-xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all group"
            >
              <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-6">
                <resource.icon className="w-7 h-7 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                {resource.title}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">{resource.description}</p>
              <span className="inline-flex items-center text-primary-500 text-sm font-medium">
                Explore <ChevronRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
