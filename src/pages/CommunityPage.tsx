import React from 'react';
import { MessageCircle, Github, Users, FileText } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="py-12 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="mb-12">
          <h1 className="text-h1 text-neutral-900 dark:text-white mb-4">Community</h1>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400">
            Connect with fellow learners and get help when you need it.
          </p>
        </div>

        {/* Discord CTA */}
        <div className="bg-[#5865F2] rounded-xl p-8 text-white mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Join our Discord</h2>
              <p className="text-white/80 mb-4">
                Get real-time help, discuss lessons, and connect with 1,000+ learners.
              </p>
              <a
                href="https://discord.gg/anthropic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#5865F2] font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                <Users className="w-5 h-5" />
                Join Discord Server
              </a>
            </div>
          </div>
        </div>

        {/* GitHub Links */}
        <div className="bg-surface dark:bg-neutral-800 rounded-xl p-8 shadow-card mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-neutral-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <Github className="w-7 h-7 text-neutral-700 dark:text-neutral-200" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">GitHub</h2>
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                Access course materials, submit issues, and contribute improvements.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/mihail911/modern-software-dev-assignments"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Course Repository
                </a>
                <a
                  href="https://github.com/mihail911/modern-software-dev-assignments/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  Discussions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-surface dark:bg-neutral-800 rounded-xl p-8 shadow-card">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 text-primary-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Community Guidelines</h2>
              <div className="text-neutral-500 dark:text-neutral-400 space-y-2">
                <p><strong className="text-neutral-700 dark:text-neutral-300">Be respectful:</strong> Treat everyone with kindness and patience.</p>
                <p><strong className="text-neutral-700 dark:text-neutral-300">Stay on topic:</strong> Keep discussions related to the course and AI development.</p>
                <p><strong className="text-neutral-700 dark:text-neutral-300">No spam:</strong> Avoid self-promotion and off-topic links.</p>
                <p><strong className="text-neutral-700 dark:text-neutral-300">Help others:</strong> Share your knowledge and support fellow learners.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
