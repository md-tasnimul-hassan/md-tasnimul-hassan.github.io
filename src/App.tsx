/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { CV } from "./pages/CV";
import { ExtraCurricular } from "./pages/ExtraCurricular";
import { Certificates } from "./pages/Certificates";
import { AnimatePresence, LazyMotion, domAnimation } from "motion/react";

function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}>
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/certificate" element={<Certificates />} />
        <Route path="/extra-curricular" element={<ExtraCurricular />} />
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
            <main className="max-w-5xl mx-auto w-full flex-grow">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </LazyMotion>
  );
}
