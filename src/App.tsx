import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import SyllabusPage from './pages/SyllabusPage';
import WeekPage from './pages/WeekPage';
import LessonPage from './pages/LessonPage';
import ResourcesPage from './pages/ResourcesPage';
import ToolsPage from './pages/ToolsPage';
import GlossaryPage from './pages/GlossaryPage';
import FAQPage from './pages/FAQPage';
import CommunityPage from './pages/CommunityPage';
import AboutPage from './pages/AboutPage';
import ProjectPage from './pages/ProjectPage';
import PaymentResultPage from './pages/PaymentResultPage';

function App() {
  return (
    <ProgressProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="syllabus" element={<SyllabusPage />} />
              <Route path="week/:weekId" element={<WeekPage />} />
              <Route path="week/:weekId/:lessonSlug" element={<LessonPage />} />
              <Route path="resources" element={<ResourcesPage />} />
              <Route path="resources/tools" element={<ToolsPage />} />
              <Route path="resources/glossary" element={<GlossaryPage />} />
              <Route path="resources/faq" element={<FAQPage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="payment" element={<PaymentResultPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="project" element={<ProjectPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ProgressProvider>
  );
}

export default App;
