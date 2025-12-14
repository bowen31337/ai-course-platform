import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, CheckCircle, Clock, Github, ChevronLeft } from 'lucide-react';

export default function ProjectPage() {
  const requirements = [
    'Build a complete AI-assisted development workflow',
    'Integrate at least 2 AI tools covered in the course',
    'Document your process and learnings',
    'Include a working demo or video walkthrough',
    'Submit via GitHub with proper README',
  ];

  const rubric = [
    { category: 'Technical Implementation', weight: '40%', description: 'Code quality, tool integration, functionality' },
    { category: 'Documentation', weight: '20%', description: 'Clear README, setup instructions, architecture docs' },
    { category: 'AI Integration', weight: '25%', description: 'Effective use of AI tools and prompting strategies' },
    { category: 'Presentation', weight: '15%', description: 'Demo quality, explanation of approach' },
  ];

  return (
    <div className="py-12 px-6">
      <div className="max-w-[800px] mx-auto">
        <Link to="/syllabus" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-6">
          <ChevronLeft className="w-4 h-4" /> Syllabus
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-primary-500 font-medium">Week 10</p>
              <h1 className="text-h1 text-neutral-900 dark:text-white">Final Project</h1>
            </div>
          </div>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400">
            Apply everything you have learned to build a real AI-assisted development project.
          </p>
        </div>

        {/* Time Estimate */}
        <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-8">
          <Clock className="w-5 h-5" />
          <span>Estimated time: 10-15 hours</span>
        </div>

        {/* Requirements */}
        <div className="bg-surface dark:bg-neutral-800 rounded-xl p-8 shadow-card mb-8">
          <h2 className="text-h3 text-neutral-900 dark:text-white mb-4">Requirements</h2>
          <ul className="space-y-3">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700 dark:text-neutral-300">{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Grading Rubric */}
        <div className="bg-surface dark:bg-neutral-800 rounded-xl p-8 shadow-card mb-8">
          <h2 className="text-h3 text-neutral-900 dark:text-white mb-4">Grading Rubric</h2>
          <div className="space-y-4">
            {rubric.map((item, index) => (
              <div key={index} className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-700 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-white">{item.category}</h4>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.description}</p>
                </div>
                <span className="text-lg font-semibold text-primary-500 flex-shrink-0">{item.weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submission */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8">
          <h2 className="text-h3 text-neutral-900 dark:text-white mb-4">Submission</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">
            Submit your project by creating a public GitHub repository and sharing the link in the course Discord or GitHub Discussions.
          </p>
          <a
            href="https://github.com/mihail911/modern-software-dev-assignments"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <Github className="w-5 h-5" />
            View Project Template
          </a>
        </div>
      </div>
    </div>
  );
}
