import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import SearchModal from './SearchModal';
import { useSearch } from '../hooks/useSearch';
import { useTheme } from '../hooks/useTheme';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const search = useSearch();
  const { theme, toggleTheme } = useTheme();
  
  const showSidebar = location.pathname.includes('/week/');

  return (
    <div className="min-h-screen bg-page dark:bg-neutral-900 flex flex-col">
      <Navbar 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        onSearchClick={search.openSearch}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      
      <div className="flex flex-1 pt-[72px]">
        {showSidebar && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
        
        <main className={`flex-1 ${showSidebar ? 'lg:ml-[280px]' : ''}`}>
          <Outlet />
        </main>
      </div>
      
      <Footer className={showSidebar ? 'lg:ml-[280px]' : ''} />
      
      <SearchModal 
        isOpen={search.isOpen} 
        onClose={search.closeSearch}
        query={search.query}
        setQuery={search.setQuery}
        results={search.results}
      />
    </div>
  );
}
