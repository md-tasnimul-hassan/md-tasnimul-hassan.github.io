/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigationType } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { CV } from "./pages/CV";
import { ExtraCurricular } from "./pages/ExtraCurricular";
import { Certificates } from "./pages/Certificates";
import { Publications } from "./pages/Publications";
import { ProjectDetail } from "./pages/ProjectDetail";
import { AnimatePresence, LazyMotion, domAnimation } from "motion/react";

function AppRoutes() {
  const location = useLocation();
  const navType = useNavigationType();
  const scrollPositions = useRef<Record<string, number>>({});
  const currentPath = useRef(location.pathname);

  useEffect(() => {
    currentPath.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const handleScroll = () => {
      scrollPositions.current[currentPath.current] = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <AnimatePresence 
      mode="wait" 
      onExitComplete={() => {
        if (navType === "POP") {
          const savedPos = scrollPositions.current[location.pathname] || 0;
          setTimeout(() => {
            window.scrollTo({ top: savedPos, left: 0, behavior: 'instant' });
          }, 10);
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
      }}
    >
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/certificate" element={<Certificates />} />
        <Route path="/certificates" element={<Navigate to="/certificate" replace />} />
        <Route path="/extra-curricular" element={<ExtraCurricular />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LazyMotion features={domAnimation}>
      <ThemeProvider defaultTheme="system" storageKey="mth-theme">
        <Router basename={import.meta.env.BASE_URL}>
          <div className="min-h-screen relative selection:bg-fg selection:text-bg flex flex-col">
            <Navbar />
            <main className="w-full flex-grow">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </LazyMotion>
  );
}
