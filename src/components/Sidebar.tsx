import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, PlayCircle, Presentation, BookOpen, Code2, CheckCircle, Circle, X } from 'lucide-react';
import { courseData } from '../data/courseData';
import { useProgress } from '../context/ProgressContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const lessonIcons = {
  video: PlayCircle,
  slides: Presentation,
  reading: BookOpen,
  assignment: Code2,
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { isComplete, getWeekProgress } = useProgress();
  const currentWeekMatch = location.pathname.match(/\/week\/(\d+)/);
  const currentWeek = currentWeekMatch ? parseInt(currentWeekMatch[1]) : null;
  
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>(
    currentWeek ? [currentWeek] : [1]
  );

  const toggleWeek = (weekId: number) => {
    setExpandedWeeks(prev =>
      prev.includes(weekId) ? prev.filter(id => id !== weekId) : [...prev, weekId]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-[72px] left-0 bottom-0 w-[280px] bg-surface dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 overflow-y-auto z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 lg:hidden flex justify-end">
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md">
            <X className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
          </button>
        </div>
        
        <nav className="p-4 pt-0 lg:pt-4">
          {courseData.map(week => {
            const isExpanded = expandedWeeks.includes(week.id);
            const progress = getWeekProgress(week);
            const isCurrentWeek = currentWeek === week.id;

            return (
              <div key={week.id} className="mb-2">
                <button
                  onClick={() => toggleWeek(week.id)}
                  className={`w-full flex items-center gap-2 p-3 rounded-lg text-left transition-colors ${
                    isCurrentWeek
                      ? 'bg-primary-50 dark:bg-primary-900/30'
                      : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                        Week {week.id}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate block">
                      {week.title}
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {week.lessons.map(lesson => {
                      const Icon = lessonIcons[lesson.type];
                      const isActive = location.pathname === `/week/${week.id}/${lesson.slug}`;
                      const completed = isComplete(lesson.id);

                      return (
                        <Link
                          key={lesson.id}
                          to={`/week/${week.id}/${lesson.slug}`}
                          onClick={onClose}
                          className={`flex items-center gap-2 p-2 rounded-md text-sm transition-colors ${
                            isActive
                              ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-500 border-l-3 border-primary-500'
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="flex-1 truncate">{lesson.title}</span>
                          {completed ? (
                            <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-neutral-300 dark:text-neutral-600 flex-shrink-0" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
