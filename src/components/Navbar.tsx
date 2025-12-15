import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, Sun, Moon, BookOpen, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/syllabus', label: 'Syllabus' },
  { to: '/resources', label: 'Resources' },
  { to: '/community', label: 'Community' },
  { to: '/about', label: 'About' },
];

export default function Navbar({ onMenuClick, onSearchClick, theme, onThemeToggle }: NavbarProps) {
  const location = useLocation();
  const showMenu = location.pathname.includes('/week/');
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 h-[72px] bg-surface dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 z-50 shadow-sm">
      <div className="h-full max-w-[1280px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showMenu && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            </button>
          )}
          
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg text-neutral-900 dark:text-white hidden sm:block">
              AI Dev Course
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? 'text-primary-500'
                  : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSearchClick}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-neutral-700 dark:text-neutral-200" />
          </button>
          
          <button
            onClick={onThemeToggle}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-neutral-700" />
            ) : (
              <Sun className="w-5 h-5 text-neutral-200" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
               <span className="text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">
                 {user.email?.split('@')[0]}
               </span>
               <button
                onClick={() => signOut()}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors text-neutral-700 dark:text-neutral-200"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
             <Link
              to="/login"
              className="flex items-center gap-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors text-neutral-700 dark:text-neutral-200"
              aria-label="Sign in"
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:block">Login</span>
            </Link>
          )}

          <Link
            to="/week/1/introduction"
            className="hidden sm:flex h-10 px-4 items-center bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-md transition-colors"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </nav>
  );
}
