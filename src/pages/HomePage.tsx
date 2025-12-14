import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Users, Calendar, Award, ChevronRight, ArrowRight, Check as CheckIcon } from 'lucide-react';
import { courseData } from '../data/courseData';
import { useProgress } from '../context/ProgressContext';

export default function HomePage() {
  const { getOverallProgress, getLastLesson } = useProgress();
  const overall = getOverallProgress();
  const resumeLesson = getLastLesson();

  const features = [
    { icon: Play, title: 'Free & Open', description: 'No signup required. Learn at your own pace.' },
    { icon: Calendar, title: '10-Week Curriculum', description: 'Structured learning path from basics to advanced.' },
    { icon: Users, title: 'Guest Speakers', description: 'Learn from Anthropic, Cognition, Vercel, and more.' },
    { icon: Award, title: 'Hands-on Projects', description: 'Build real AI-assisted development workflows.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Now Live: New Agentic Workflows Module
          </div>
          <h1 className="text-hero text-neutral-900 dark:text-white mb-6 leading-tight text-balance">
            Master AI-Assisted<br />Software Development
          </h1>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400 mb-8 max-w-[600px] mx-auto text-balance">
            A free 10-week course teaching you to leverage LLMs, coding agents, and AI-enhanced tools to transform your development workflow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/week/1/introduction"
              className="h-12 px-8 flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-primary-500/20"
            >
              Start Learning for Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/syllabus"
              className="h-12 px-8 flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-full transition-colors"
            >
              View Syllabus
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800">
            <p className="text-sm text-neutral-500 mb-4">Trusted by developers from</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Simple text placeholders for logos - in real app use SVGs */}
              <span className="font-bold text-xl">Vercel</span>
              <span className="font-bold text-xl">Stripe</span>
              <span className="font-bold text-xl">Supabase</span>
              <span className="font-bold text-xl">Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Learning (if progress exists) */}
      {overall.completed > 0 && resumeLesson && (
        <section className="py-12 px-6 bg-primary-50 dark:bg-primary-900/20">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-surface dark:bg-neutral-800 rounded-xl p-6 shadow-card">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-primary-500 font-medium mb-1">Continue where you left off</p>
                  <h3 className="text-h3 text-neutral-900 dark:text-white">{resumeLesson.lesson.title}</h3>
                  <p className="text-neutral-500 dark:text-neutral-400">Week {resumeLesson.week.id}: {resumeLesson.week.title}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-2xl font-bold text-primary-500">{overall.percentage}%</p>
                    <p className="text-sm text-neutral-500">{overall.completed}/{overall.total} lessons</p>
                  </div>
                  <Link
                    to={`/week/${resumeLesson.week.id}/${resumeLesson.lesson.slug}`}
                    className="h-10 px-4 flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-md transition-colors"
                  >
                    Resume <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-h2 text-neutral-900 dark:text-white text-center mb-12">Why This Course?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-surface dark:bg-neutral-800 rounded-xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-250"
              >
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-16 px-6 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-h2 text-neutral-900 dark:text-white text-center mb-4">10-Week Curriculum</h2>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400 text-center mb-12 max-w-[600px] mx-auto">
            From prompt engineering fundamentals to advanced agent architectures
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.slice(0, 6).map(week => (
              <Link
                key={week.id}
                to={`/week/${week.id}`}
                className="bg-surface dark:bg-neutral-800 rounded-xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-250 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 bg-primary-500 text-white text-sm font-bold rounded-lg flex items-center justify-center">
                    {week.id}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {week.lessons.length} lessons
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                  {week.title}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">{week.description}</p>
                {week.guestSpeaker && (
                  <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                    <p className="text-xs text-primary-500 font-medium">
                      Guest: {week.guestSpeaker.company}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/syllabus"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium"
            >
              View Full Syllabus <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section (New) */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-neutral-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-neutral-500 dark:text-neutral-400">Join the full experience with our Pro plan.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Free Tier */}
            <div className="bg-surface dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-bold mb-2">Community Edition</h3>
              <p className="text-3xl font-bold mb-6">$0<span className="text-base font-normal text-neutral-500">/forever</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary-500" />
                  <span>Access to all 10 weeks of content</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary-500" />
                  <span>Community support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary-500" />
                  <span>Basic project templates</span>
                </li>
              </ul>
              <Link to="/week/1/introduction" className="w-full h-12 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 font-semibold transition-colors">
                Start Learning
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-surface dark:bg-neutral-800 rounded-2xl p-8 border-2 border-primary-500 relative shadow-xl shadow-primary-500/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Pro Access</h3>
              <p className="text-3xl font-bold mb-6">$49<span className="text-base font-normal text-neutral-500">/one-time</span></p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary-500" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary-500" />
                  <span>Official Certificate of Completion</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary-500" />
                  <span>Advanced Project Solutions</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-primary-500" />
                  <span>Direct Instructor Support</span>
                </li>
              </ul>
              <button
                onClick={() => {
                  // Redirect to Stripe checkout - replace with your actual payment link
                  window.open('https://buy.stripe.com/test_00g5mn4ov9YO0XS7ss', '_blank');
                }}
                className="w-full h-12 flex items-center justify-center rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-colors"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10', label: 'Weeks' },
              { value: '50+', label: 'Lessons' },
              { value: '8', label: 'Guest Speakers' },
              { value: 'Free', label: 'Forever' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-primary-500 mb-1">{stat.value}</p>
                <p className="text-neutral-500 dark:text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-primary-500">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-h1 text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-primary-100 mb-8">
            Join thousands of developers learning AI-assisted development.
          </p>
          <Link
            to="/week/1/introduction"
            className="inline-flex h-12 px-8 items-center gap-2 bg-white text-primary-500 font-semibold rounded-md hover:bg-primary-50 transition-colors"
          >
            Start Week 1 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
