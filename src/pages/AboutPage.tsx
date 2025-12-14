import React from 'react';
import { Users, Building2, BookOpen } from 'lucide-react';
import { courseData } from '../data/courseData';

export default function AboutPage() {
  // Get all guest speakers
  const speakers = courseData
    .filter(w => w.guestSpeaker)
    .map(w => w.guestSpeaker!);

  const companies = ['Anthropic', 'Cognition', 'Warp', 'Semgrep', 'Graphite', 'Vercel', 'Resolve', 'Andreessen Horowitz'];

  return (
    <div className="py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          <h1 className="text-h1 text-neutral-900 dark:text-white mb-4">About This Course</h1>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400 max-w-[600px]">
            A free, open-source course teaching AI-assisted software development to 10,000+ developers.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-surface dark:bg-neutral-800 rounded-xl p-8 shadow-card mb-12">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-7 h-7 text-primary-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Our Mission</h2>
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                AI is transforming software development. We believe every developer should have access to high-quality education on leveraging these tools effectively. This course is completely free, with no signup required, and designed to help you master the practices that will define the next decade of software engineering.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                  { value: '10,000+', label: 'Target Learners' },
                  { value: '10', label: 'Weeks of Content' },
                  { value: '8', label: 'Industry Speakers' },
                  { value: '$0', label: 'Cost Forever' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary-500">{stat.value}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Guest Speakers */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-500" />
            </div>
            <h2 className="text-h2 text-neutral-900 dark:text-white">Guest Speakers</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {speakers.map((speaker, index) => (
              <div key={index} className="bg-surface dark:bg-neutral-800 rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                    {speaker.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white">{speaker.name}</h3>
                    <p className="text-sm text-primary-500">{speaker.company}</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{speaker.topic}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Companies */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-500" />
            </div>
            <h2 className="text-h2 text-neutral-900 dark:text-white">Partner Companies</h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {companies.map(company => (
              <div
                key={company}
                className="px-6 py-3 bg-surface dark:bg-neutral-800 rounded-lg shadow-card text-neutral-700 dark:text-neutral-300 font-medium"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
