import { useState, useMemo, useCallback } from 'react';
import { courseData, glossaryData, Lesson, Week } from '../data/courseData';

interface SearchResult {
  type: 'lesson' | 'week' | 'glossary';
  title: string;
  description?: string;
  url: string;
  weekId?: number;
}

export function useSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo((): SearchResult[] => {
    if (!query || query.length < 2) return [];

    const q = query.toLowerCase();
    const matches: SearchResult[] = [];

    // Search weeks
    courseData.forEach(week => {
      if (week.title.toLowerCase().includes(q) || week.description.toLowerCase().includes(q)) {
        matches.push({
          type: 'week',
          title: `Week ${week.id}: ${week.title}`,
          description: week.description,
          url: `/week-${week.id}`,
          weekId: week.id
        });
      }

      // Search lessons
      week.lessons.forEach(lesson => {
        if (lesson.title.toLowerCase().includes(q) || (lesson.content && lesson.content.toLowerCase().includes(q))) {
          matches.push({
            type: 'lesson',
            title: lesson.title,
            description: `Week ${week.id} - ${lesson.type}`,
            url: `/week-${week.id}/${lesson.slug}`,
            weekId: week.id
          });
        }
      });
    });

    // Search glossary
    glossaryData.forEach(item => {
      if (item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q)) {
        matches.push({
          type: 'glossary',
          title: item.term,
          description: item.definition.substring(0, 100) + '...',
          url: '/resources/glossary'
        });
      }
    });

    return matches.slice(0, 10);
  }, [query]);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  return { query, setQuery, results, isOpen, openSearch, closeSearch };
}
