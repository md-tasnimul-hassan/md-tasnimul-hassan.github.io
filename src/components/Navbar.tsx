import { Moon, Sun, Laptop } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import navData from "../data/nav.json";
import homeData from "../data/home.json";
import { useTheme } from "./ThemeProvider";
import React, { useState } from "react";
import { m } from "motion/react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  // Cycle through themes
  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      window.location.href = "/";
    }, 150);
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-bg/80 border-b border-border-subtle transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" onClick={handleLogoClick} className="flex items-center group cursor-pointer" aria-label="Home">
              <img 
                src={`${import.meta.env.BASE_URL}favicon.ico`} 
                alt="Logo" 
                className={`w-8 h-8 rounded-full transition-all duration-200 ease-out ${isRotating ? "scale-90 opacity-70" : "group-hover:opacity-80 group-hover:scale-105"}`} 
              />
            </a>
          </div>
          
          <div className="hidden md:flex flex-grow justify-center space-x-8 relative">
            {navData.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative py-2 text-base font-semibold transition-colors group ${
                    isActive ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`absolute left-0 bottom-0 w-full h-[4px] bg-fg transform origin-left transition-transform duration-300 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-fg/5 text-muted hover:text-fg transition-colors"
              aria-label="Toggle theme"
              title={`Current theme: ${theme}. Click to change.`}
            >
              {theme === "light" && <Sun size={20} />}
              {theme === "dark" && <Moon size={20} />}
              {theme === "system" && <Laptop size={20} />}
            </button>
            <div className="md:hidden ml-2 flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-muted hover:text-fg focus:outline-none"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block w-full h-[2px] bg-current transition-transform ${isMobileMenuOpen ? "rotate-45 translate-y-[9px]" : ""}`} />
                  <span className={`block w-full h-[2px] bg-current transition-opacity ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                  <span className={`block w-full h-[2px] bg-current transition-transform ${isMobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <m.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:hidden bg-bg border-b border-border-subtle shadow-md"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navData.items.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "bg-fg text-bg"
                    : "text-muted hover:text-fg hover:bg-fg/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </m.div>
      )}
    </nav>
  );
}
