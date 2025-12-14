import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Clock, ExternalLink, CheckCircle, Square, PlayCircle, Presentation, BookOpen, Code2, Lock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { courseData } from '../data/courseData';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';

const lessonIcons = {
  video: PlayCircle,
  slides: Presentation,
  reading: BookOpen,
  assignment: Code2,
};

export default function LessonPage() {
  const { weekId, lessonSlug } = useParams<{ weekId: string; lessonSlug: string }>();
  const weekNum = parseInt(weekId || '1');
  const week = courseData.find(w => w.id === weekNum);
  const lesson = week?.lessons.find(l => l.slug === lessonSlug);
  const { isComplete, toggleComplete, setLastLesson } = useProgress();
  const { isPro } = useAuth();

  // Simple gating logic: Lock content after Week 1 for non-pro users
  const isLocked = !isPro && weekNum > 1;

  // Find prev/next lessons
  const allLessons: { weekId: number; lesson: typeof lesson }[] = [];
  courseData.forEach(w => {
    w.lessons.forEach(l => {
      allLessons.push({ weekId: w.id, lesson: l });
    });
  });
  const currentIndex = allLessons.findIndex(
    item => item.weekId === weekNum && item.lesson?.slug === lessonSlug
  );
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Track last lesson
  useEffect(() => {
    if (weekNum && lessonSlug) {
      setLastLesson(weekNum, lessonSlug);
    }
  }, [weekNum, lessonSlug, setLastLesson]);

  if (!week || !lesson) {
    return (
      <div className="py-12 px-6 text-center">
        <h1 className="text-h1 text-neutral-900 dark:text-white">Lesson not found</h1>
        <Link to="/syllabus" className="text-primary-500 mt-4 inline-block">Back to syllabus</Link>
      </div>
    );
  }

  const completed = isComplete(lesson.id);
  const Icon = lessonIcons[lesson.type];

  return (
    <div className="py-12 px-6">
      <div className="max-w-[720px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          <Link to="/" className="hover:text-neutral-900 dark:hover:text-white">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/week/${week.id}`} className="hover:text-neutral-900 dark:hover:text-white">Week {week.id}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 dark:text-white truncate">{lesson.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary-500" />
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/30 text-primary-500 text-xs font-medium rounded">
                {lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
              </span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <Clock className="w-4 h-4" /> {lesson.duration}
              </span>
            </div>
          </div>
          <h1 className="text-h1 text-neutral-900 dark:text-white">{lesson.title}</h1>
        </div>

        {/* Mark Complete */}
        <button
          onClick={() => toggleComplete(lesson.id)}
          className={`w-full flex items-center justify-center gap-2 h-12 rounded-lg font-medium transition-all mb-8 ${completed
            ? 'bg-success/10 text-success border border-success'
            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
        >
          {completed ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Completed
            </>
          ) : (
            <>
              <Square className="w-5 h-5" />
              Mark as Complete
            </>
          )}
        </button>

        {/* Video Embed */}
        {lesson.videoUrl && (
          <div className="mb-8">
            <div className="aspect-video bg-neutral-900 rounded-xl overflow-hidden">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Slides Embed */}
        {lesson.slidesUrl && (
          <div className="mb-8">
            <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden">
              <iframe
                src={lesson.slidesUrl}
                title={`${lesson.title} Slides`}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Content with Proper Markdown Rendering */}
        {lesson.content && (
          <div className="mb-8 relative">
            {isLocked && (
              <div className="absolute inset-0 z-10 bg-white/5 dark:bg-neutral-900/5 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-neutral-500" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Pro Lesson</h3>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-md mb-6">
                  This lesson is part of our Pro curriculum. Upgrade to access all 10 weeks of content, projects, and expert guest sessions.
                </p>
                <button
                  onClick={() => window.location.href = '/#pricing'}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Upgrade to Pro
                </button>
              </div>
            )}
            <div className={`bg-surface dark:bg-neutral-800 rounded-xl p-8 shadow-card prose prose-lg prose-neutral dark:prose-invert max-w-none ${isLocked ? 'blur-sm select-none pointer-events-none opacity-50 h-[400px] overflow-hidden' : ''
              }
              prose-headings:text-neutral-900 dark:prose-headings:text-white
              prose-h1:text-2xl prose-h1:font-bold prose-h1:mt-0 prose-h1:mb-4
              prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3
              prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-4 prose-h3:mb-2
              prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:leading-relaxed
              prose-li:text-neutral-700 dark:prose-li:text-neutral-300
              prose-strong:text-neutral-900 dark:prose-strong:text-white
              prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:p-0 prose-pre:bg-transparent prose-pre:overflow-hidden prose-pre:rounded-lg
              prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
            `}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeString = String(children).replace(/\n$/, '');

                    if (!inline && (match || codeString.includes('\n'))) {
                      return (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match ? match[1] : 'text'}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                          }}
                          {...props}
                        >
                          {codeString}
                        </SyntaxHighlighter>
                      );
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {lesson.content}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Readings */}
        {lesson.readings && lesson.readings.length > 0 && (
          <div className="mb-8">
            <h2 className="text-h3 text-neutral-900 dark:text-white mb-4">Required Readings</h2>
            <div className="space-y-3">
              {lesson.readings.map((reading, index) => (
                <a
                  key={index}
                  href={reading.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-surface dark:bg-neutral-800 rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all group"
                >
                  <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-neutral-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors truncate">
                      {reading.title}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{reading.duration}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Assignment */}
        {lesson.assignment && (
          <div className="mb-8">
            <h2 className="text-h3 text-neutral-900 dark:text-white mb-4">Assignment</h2>
            <div className="bg-surface dark:bg-neutral-800 rounded-xl p-6 shadow-card">
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{lesson.assignment.title}</h3>
              <p className="text-neutral-500 dark:text-neutral-400 mb-4">{lesson.assignment.description}</p>
              <a
                href={lesson.assignment.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Code2 className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-neutral-200 dark:border-neutral-700">
          {prevLesson && prevLesson.lesson ? (
            <Link
              to={`/week/${prevLesson.weekId}/${prevLesson.lesson.slug}`}
              className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Previous</span>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson && nextLesson.lesson ? (
            <Link
              to={`/week/${nextLesson.weekId}/${nextLesson.lesson.slug}`}
              className="flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors"
            >
              <span className="text-sm font-medium">Next Lesson</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
