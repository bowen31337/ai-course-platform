import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, Users, Calendar, Award, ChevronRight, ArrowRight, Check as CheckIcon, Code, Database, Cpu, MessageSquare, Terminal, Zap, Shield } from 'lucide-react';
import { courseData } from '../data/courseData';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { redirectToCheckout } from '../lib/stripe';

export default function HomePage() {
  const { getOverallProgress, getLastLesson } = useProgress();
  const overall = getOverallProgress();
  const resumeLesson = getLastLesson();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetProAccess = async () => {
    if (!user) {
      // User must sign in first before making a payment
      navigate('/login');
      return;
    }
    // Redirect to Stripe checkout with user's email pre-filled
    await redirectToCheckout(user.email);
  };

  const benefits = [
    { icon: Terminal, title: 'Production-Ready Skills', description: 'Move beyond basic prompts. Learn to build reliable, scalable AI applications using industry-standard tools.' },
    { icon: Code, title: 'Modern Tech Stack', description: 'Master the latest stack: React, TypeScript, Tailwind, OpenAI, LangChain, and Vector Databases.' },
    { icon: Users, title: 'Expert-Led Curriculum', description: 'Curriculum designed by engineers from top tech companies to bridge the gap between theory and practice.' },
    { icon: Award, title: 'Portfolio Projects', description: 'Build 5+ complete applications including a RAG chatbot, a code analysis agent, and a semantic search engine.' },
  ];

  const projects = [
    { title: 'AI Pair Programmer', description: 'Build a CLI tool that analyzes code and suggests improvements.', icon: Cpu },
    { title: 'Semantic Search Engine', description: 'Create a documentation search system using vector embeddings.', icon: Database },
    { title: 'Custom RAG Chatbot', description: 'Develop a chatbot that answers questions based on your own data.', icon: MessageSquare },
  ];

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="py-24 px-6 relative overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Updated for 2025: Agents & Multi-Modal
          </div>
          <h1 className="text-hero text-neutral-900 dark:text-white mb-6 leading-tight text-balance font-bold tracking-tight">
            The Modern AI Coding Course<br />
            <span className="text-primary-500">From Zero to Agentic AI</span>
          </h1>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400 mb-10 max-w-[700px] mx-auto text-balance leading-relaxed">
            The comprehensive, open-source curriculum for developers who want to master LLMs, RAG, and AI Agents.
            Build real-world applications, not just demos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              to="/week/1/introduction"
              className="h-14 px-8 flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-lg font-semibold rounded-full transition-all hover:scale-105 shadow-xl shadow-primary-500/20"
            >
              Start Learning Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/syllabus"
              className="h-14 px-8 flex items-center justify-center border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white text-lg font-semibold rounded-full transition-colors"
            >
              Explore Syllabus
            </Link>
          </div>

          <div className="pt-8 border-t border-neutral-100 dark:border-neutral-800/50">
            <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-6">Trusted by developers building with</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Tech Stack Logos (Text for now) */}
              <span className="text-xl font-bold flex items-center gap-2"><Zap className="w-5 h-5" /> OpenAI</span>
              <span className="text-xl font-bold flex items-center gap-2"><Database className="w-5 h-5" /> Supabase</span>
              <span className="text-xl font-bold flex items-center gap-2"><Cpu className="w-5 h-5" /> LangChain</span>
              <span className="text-xl font-bold flex items-center gap-2"><Code className="w-5 h-5" /> Vercel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Learning Banner */}
      {overall.completed > 0 && resumeLesson && (
        <section className="py-8 px-6 bg-primary-50 dark:bg-primary-900/10 border-y border-primary-100 dark:border-primary-900/20" aria-label="Resume Learning">
          <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 font-bold text-lg">
                {overall.percentage}%
              </div>
              <div>
                <p className="text-sm font-medium text-primary-600 dark:text-primary-400">Welcome back!</p>
                <p className="text-neutral-900 dark:text-white font-medium">Continue: {resumeLesson.lesson.title}</p>
              </div>
            </div>
            <Link
              to={`/week/${resumeLesson.week.id}/${resumeLesson.lesson.slug}`}
              className="w-full sm:w-auto px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors text-center"
            >
              Resume Lesson
            </Link>
          </div>
        </section>
      )}

      {/* Value Proposition / Benefits */}
      <section className="py-20 px-6 bg-neutral-50 dark:bg-neutral-900/50" aria-label="Why this course">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[800px] mx-auto mb-16">
            <h2 className="text-h2 text-neutral-900 dark:text-white mb-4">Why Modern AI Coding?</h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400">
              Traditional coding is evolving. This course prepares you for the new era of software engineering where AI is a collaborator, not just a tool.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-surface dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-800 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="py-20 px-6" aria-label="What you will build">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-h2 text-neutral-900 dark:text-white mb-4">What You Will Build</h2>
              <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-[600px]">
                Stop watching tutorials. Start building. We focus on hands-on projects that you can deploy and use.
              </p>
            </div>
            <Link to="/syllabus" className="text-primary-500 font-semibold hover:underline flex items-center gap-1">
              View full curriculum <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-neutral-900 text-white p-8 h-[300px] flex flex-col justify-end">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-neutral-800 group-hover:scale-105 transition-transform duration-500 opacity-50" />
                {/* Abstract pattern placeholder */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                <div className="relative z-20">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                    <project.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-neutral-300">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-20 px-6 bg-neutral-50 dark:bg-neutral-900/30" aria-label="Curriculum">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-h2 text-neutral-900 dark:text-white text-center mb-16">Comprehensive 10-Week Journey</h2>
          <div className="space-y-4">
            {courseData.map((week) => (
              <Link
                key={week.id}
                to={`/week/${week.id}`}
                className="block bg-surface dark:bg-neutral-800 p-6 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors group"
              >
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center font-bold text-neutral-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    {week.id}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors">
                      {week.title}
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">{week.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-primary-500 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ for GEO/SEO */}
      <section className="py-20 px-6" aria-label="Frequently Asked Questions">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-h2 text-neutral-900 dark:text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold mb-2">Who is this course for?</h3>
              <p className="text-neutral-500 dark:text-neutral-400">
                This course is designed for web developers (mid-level and above) who want to integrate AI into their applications.
                Knowledge of JavaScript/TypeScript and React is recommended.
              </p>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold mb-2">What is the tech stack?</h3>
              <p className="text-neutral-500 dark:text-neutral-400">
                We use a modern stack focused on production AI: React, TypeScript, Tailwind CSS, OpenAI API, LangChain/LangGraph, and Supabase (pgvector).
              </p>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold mb-2">Is it really free?</h3>
              <p className="text-neutral-500 dark:text-neutral-400">
                Yes! The Community Edition includes full access to all lessons and basic project templates.
                Our Pro Plan adds certification, advanced solutions, and mentor support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="py-24 px-6 relative overflow-hidden bg-neutral-900 text-white" id="pricing">
        <div className="absolute inset-0 bg-primary-900/20" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Invest in Your AI Career</h2>
              <p className="text-xl text-neutral-400 mb-8">
                Get lifetime access to the course, future updates, and a community of like-minded engineers.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  '10 Weeks of High-Quality Content',
                  '5+ Real-World Portfolio Projects',
                  'Certificate of Completion',
                  'Private Discord Community Access'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-neutral-200">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/week/1/introduction"
                  className="px-8 py-4 bg-white text-neutral-900 font-bold rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  Start for Free
                </Link>
                <button
                  onClick={handleGetProAccess}
                  className="px-8 py-4 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-500 transition-colors"
                >
                  Get Pro Access - $19
                </button>
              </div>
            </div>

            {/* Pricing Card Visual */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-neutral-800 rounded-2xl p-8 border border-neutral-700">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white">Pro Edition</h3>
                    <p className="text-neutral-400">One-time payment</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">$19</p>
                    <p className="text-sm text-green-400">Save 50% today</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-primary-500 rounded-full"></div>
                  </div>
                  <p className="text-sm text-neutral-400 text-center">Limited time launch pricing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}