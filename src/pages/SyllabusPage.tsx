import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, ChevronRight, CheckCircle } from 'lucide-react';
import { courseData } from '../data/courseData';
import { useProgress } from '../context/ProgressContext';

export default function SyllabusPage() {
  const { getWeekProgress } = useProgress();

  return (
    <div className="py-12 px-6">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-h1 text-neutral-900 dark:text-white mb-4">Course Syllabus</h1>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400">
            A 10-week journey from AI basics to advanced agent-assisted development.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-surface dark:bg-neutral-800 rounded-xl p-6 shadow-card">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">Prerequisites</h3>
            <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li>Programming experience in any language</li>
              <li>Familiarity with version control (Git)</li>
              <li>Access to AI coding tools (Claude, Cursor, etc.)</li>
            </ul>
          </div>
          <div className="bg-surface dark:bg-neutral-800 rounded-xl p-6 shadow-card">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-3">Time Commitment</h3>
            <ul className="space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li>5-10 hours per week recommended</li>
              <li>Self-paced - complete at your own speed</li>
              <li>No deadlines or enrollment periods</li>
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {courseData.map((week, index) => {
            const progress = getWeekProgress(week);
            const isComplete = progress.completed === progress.total;

            return (
              <div key={week.id} className="relative">
                {/* Timeline line */}
                {index < courseData.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700" />
                )}

                <Link
                  to={`/week/${week.id}`}
                  className="flex gap-4 bg-surface dark:bg-neutral-800 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all group"
                >
                  <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-bold ${
                    isComplete 
                      ? 'bg-success text-white'
                      : 'bg-primary-500 text-white'
                  }`}>
                    {isComplete ? <CheckCircle className="w-6 h-6" /> : week.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors">
                          Week {week.id}: {week.title}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                          {week.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-500 transition-colors flex-shrink-0" />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                        <Clock className="w-4 h-4" />
                        <span>{week.lessons.length} lessons</span>
                      </div>
                      {week.guestSpeaker && (
                        <div className="flex items-center gap-1 text-sm text-primary-500">
                          <Users className="w-4 h-4" />
                          <span>{week.guestSpeaker.company}</span>
                        </div>
                      )}
                      {week.keyTools.length > 0 && (
                        <div className="flex gap-2">
                          {week.keyTools.slice(0, 2).map(tool => (
                            <span key={tool} className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 rounded">
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {progress.completed > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                          <span>Progress</span>
                          <span>{progress.completed}/{progress.total}</span>
                        </div>
                        <div className="h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary-500 rounded-full transition-all"
                            style={{ width: `${progress.percentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
