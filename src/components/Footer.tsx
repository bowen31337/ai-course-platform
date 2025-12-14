import React from 'react';
import { Link } from 'react-router-dom';
import { Github, MessageCircle, BookOpen } from 'lucide-react';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-surface dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-12 ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-neutral-900 dark:text-white">AI Dev Course</span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Master AI-assisted software development in 10 weeks.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Course</h4>
            <ul className="space-y-2">
              <li><Link to="/syllabus" className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">Syllabus</Link></li>
              <li><Link to="/week/1" className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">Week 1</Link></li>
              <li><Link to="/project" className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">Final Project</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/resources/tools" className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">Tools</Link></li>
              <li><Link to="/resources/glossary" className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">Glossary</Link></li>
              <li><Link to="/resources/faq" className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-white mb-4">Community</h4>
            <div className="flex gap-3">
              <a
                href="https://discord.gg/anthropic"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
              </a>
              <a
                href="https://github.com/mihail911/modern-software-dev-assignments"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
              >
                <Github className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700 text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            2025 AI Dev Course. Free and open source.
          </p>
        </div>
      </div>
    </footer>
  );
}
