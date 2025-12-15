import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { courseData, Week, Lesson } from '../data/courseData';
import { useAuth } from './AuthContext';

interface Progress {
  completedLessons: string[];
  lastLesson?: { weekId: number; lessonSlug: string };
}

interface ProgressContextType {
  progress: Progress;
  markComplete: (lessonId: string) => void;
  toggleComplete: (lessonId: string) => void;
  setLastLesson: (weekId: number, lessonSlug: string) => void;
  isComplete: (lessonId: string) => boolean;
  getWeekProgress: (week: Week) => { completed: number; total: number; percentage: number };
  getOverallProgress: () => { completed: number; total: number; percentage: number };
  getNextLesson: () => { week: Week; lesson: Lesson } | null;
  getLastLesson: () => { week: Week; lesson: Lesson } | null;
}

const STORAGE_KEY = 'ai-course-progress';

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>({ completedLessons: [] });
  const { user, session } = useAuth();

  // Load from local storage initially
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
  }, []);

  // Sync with API when user logs in
  useEffect(() => {
    if (user && session) {
      fetch('/api/progress', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data && data.completed_lessons) {
          const newProgress = {
            completedLessons: data.completed_lessons,
            lastLesson: data.last_lesson
          };
          setProgress(newProgress);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
        }
      })
      .catch(err => console.error('Failed to fetch progress', err));
    }
  }, [user, session]);

  const saveProgress = useCallback((newProgress: Progress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    setProgress(newProgress);

    if (user && session) {
       fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(newProgress)
      }).catch(err => console.error('Failed to save progress', err));
    }
  }, [user, session]);

  const markComplete = useCallback((lessonId: string) => {
    setProgress(prev => {
      if (!prev.completedLessons.includes(lessonId)) {
        const newProgress = {
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId]
        };
        saveProgress(newProgress);
        return newProgress;
      }
      return prev;
    });
  }, [saveProgress]);

  const toggleComplete = useCallback((lessonId: string) => {
    setProgress(prev => {
      const isComplete = prev.completedLessons.includes(lessonId);
      const newProgress = {
        ...prev,
        completedLessons: isComplete
          ? prev.completedLessons.filter(id => id !== lessonId)
          : [...prev.completedLessons, lessonId]
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  const setLastLesson = useCallback((weekId: number, lessonSlug: string) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        lastLesson: { weekId, lessonSlug }
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  const isComplete = useCallback((lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  }, [progress.completedLessons]);

  const getWeekProgress = useCallback((week: Week) => {
    const completed = week.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    return { completed, total: week.lessons.length, percentage: Math.round((completed / week.lessons.length) * 100) };
  }, [progress.completedLessons]);

  const getOverallProgress = useCallback(() => {
    const totalLessons = courseData.reduce((acc, week) => acc + week.lessons.length, 0);
    const completed = progress.completedLessons.length;
    return { completed, total: totalLessons, percentage: Math.round((completed / totalLessons) * 100) };
  }, [progress.completedLessons]);

  const getNextLesson = useCallback((): { week: Week; lesson: Lesson } | null => {
    for (const week of courseData) {
      for (const lesson of week.lessons) {
        if (!progress.completedLessons.includes(lesson.id)) {
          return { week, lesson };
        }
      }
    }
    return null;
  }, [progress.completedLessons]);

  const getLastLesson = useCallback((): { week: Week; lesson: Lesson } | null => {
    if (progress.lastLesson) {
      const week = courseData.find(w => w.id === progress.lastLesson!.weekId);
      if (week) {
        const lesson = week.lessons.find(l => l.slug === progress.lastLesson!.lessonSlug);
        if (lesson) return { week, lesson };
      }
    }
    return getNextLesson();
  }, [progress.lastLesson, getNextLesson]);

  return (
    <ProgressContext.Provider value={{
      progress,
      markComplete,
      toggleComplete,
      setLastLesson,
      isComplete,
      getWeekProgress,
      getOverallProgress,
      getNextLesson,
      getLastLesson
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
