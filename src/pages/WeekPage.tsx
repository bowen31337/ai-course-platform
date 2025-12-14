import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PlayCircle, Presentation, BookOpen, Code2, CheckCircle, Circle, Clock, Users, ChevronLeft } from 'lucide-react';
import { courseData } from '../data/courseData';
import { useProgress } from '../context/ProgressContext';

const lessonIcons = {
  video: PlayCircle,
  slides: Presentation,
  reading: BookOpen,
  assignment: Code2,
};

const lessonLabels = {
  video: 'Video',
  slides: 'Slides',
  reading: 'Reading',
  assignment: 'Assignment',
};

export default function WeekPage() {
  const { weekId } = useParams<{ weekId: string }>();
  const weekNum = parseInt(weekId || '1');
  const week = courseData.find(w => w.id === weekNum);
  const { isComplete, getWeekProgress } = useProgress();

  if (!week) {
    return (
      <div className="py-12 px-6 text-center">
        <h1 className="text-h1 text-neutral-900 dark:text-white">Week not found</h1>
        <Link to="/syllabus" className="text-primary-500 mt-4 inline-block">Back to syllabus</Link>
      </div>
    );
  }

  const progress = getWeekProgress(week);

  return (
    <div className="py-12 px-6">
      <div className="max-w-[720px] mx-auto">
        {/* Back link */}
        <Link to="/syllabus" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-6">
          <ChevronLeft className="w-4 h-4" /> All Weeks
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 bg-primary-500 text-white font-bold rounded-lg flex items-center justify-center">
              {week.id}
            </span>
            <div className="flex-1">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Week {week.id}</p>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Clock className="w-3 h-3" />
                <span>{week.lessons.length} lessons</span>
              </div>
            </div>
          </div>
          <h1 className="text-h1 text-neutral-900 dark:text-white mb-3">{week.title}</h1>
          <p className="text-body-lg text-neutral-500 dark:text-neutral-400">{week.description}</p>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-neutral-500 mb-2">
              <span>Progress</span>
              <span>{progress.completed}/{progress.total} lessons ({progress.percentage}%)</span>
            </div>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 rounded-full transition-all"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Guest Speaker */}
        {week.guestSpeaker && (
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-primary-500 font-medium">Guest Speaker</p>
                <p className="font-semibold text-neutral-900 dark:text-white">{week.guestSpeaker.name}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{week.guestSpeaker.company} - {week.guestSpeaker.topic}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tools */}
        {week.keyTools.length > 0 && (
          <div className="mb-8">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Tools covered:</p>
            <div className="flex gap-2 flex-wrap">
              {week.keyTools.map(tool => (
                <span key={tool} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-sm text-neutral-700 dark:text-neutral-300 rounded-md">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Lessons */}
        <div className="space-y-3">
          <h2 className="text-h3 text-neutral-900 dark:text-white mb-4">Lessons</h2>
          {week.lessons.map((lesson, index) => {
            const Icon = lessonIcons[lesson.type];
            const completed = isComplete(lesson.id);

            return (
              <Link
                key={lesson.id}
                to={`/week/${week.id}/${lesson.slug}`}
                className="flex items-center gap-4 bg-surface dark:bg-neutral-800 rounded-xl p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors">
                  <Icon className="w-5 h-5 text-neutral-500 group-hover:text-primary-500 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">{index + 1}.</span>
                    <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors truncate">
                      {lesson.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 rounded">
                      {lessonLabels[lesson.type]}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {lesson.duration}
                    </span>
                  </div>
                </div>
                {completed ? (
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-neutral-300 dark:text-neutral-600 flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
