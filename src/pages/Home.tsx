import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { m } from "motion/react";
import homeData from "../data/home.json";
import { usePageTitle } from "../hooks/usePageTitle";
import { Projects } from "./Projects";
import { Publications } from "./Publications";
import { CV } from "./CV";

export function Home() {
  usePageTitle("Md. Tasnimul Hassan");
  const location = useLocation();

  const [loadedLevel, setLoadedLevel] = useState(0);

  useEffect(() => {
    if (loadedLevel < 3) {
      const timer = setTimeout(() => {
        setLoadedLevel((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loadedLevel]);

  useEffect(() => {
    if (loadedLevel === 3 && location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [loadedLevel, location.hash]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.3, ease: "easeOut" } }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
      className="w-full"
    >
      <section id="home" className="flex flex-col items-center min-h-[calc(100vh-4rem)] p-6">
      <div className="w-full max-w-7xl flex flex-col pt-6 pb-12">
        {/* Top Section: Title & Intro */}
        <div  className="text-center w-full mb-10 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-fg tracking-tight mb-4">
            {homeData.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted font-medium flex items-center justify-center">
            {homeData.title}
          </p>
        </div>

        {/* Bottom Section: Side by Side (Image & Text) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 xl:gap-32 items-center">
          
          {/* Left Side: Hero Image (Bigger) */}
          <div  className="relative w-full flex justify-center">
            <div className="relative w-64 h-80 sm:w-80 sm:h-[28rem] md:w-full md:max-w-md lg:h-[32rem]">
              <img 
                src={homeData.heroImage} 
                alt={homeData.name} 
                className="relative w-full h-full object-cover rounded-2xl border border-border-subtle shadow-md"
              />
            </div>
          </div>

          {/* Right Side: Description */}
          <div  className="flex flex-col space-y-8">
            <div className="space-y-3 text-sm sm:text-base text-fg/80 leading-relaxed text-left text-pretty max-w-prose mx-auto md:mx-0">
              {homeData.intro.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div 
              className="p-6 rounded-2xl bg-fg/5 border border-border-subtle self-start hover:scale-105 transition-transform duration-300"
            >
              <p className="text-xs text-muted uppercase tracking-wider font-semibold mb-2">
                Currently focused on
              </p>
              <p className="text-xl sm:text-2xl font-display font-bold text-fg">
                {homeData.focus}
              </p>
            </div>
          </div>

        </div>

        {/* Full Width Section: News & Updates */}
        <div className="mt-12 lg:mt-16 border-t border-border-subtle pt-10 w-full text-left">
          <div  className="flex flex-col mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-fg mb-8">News and Updates 📢</h2>
            <m.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-4"
            >
              {homeData.news.map((itemValue, index) => (
                <m.div key={index} variants={item} className="flex flex-col border-l-2 border-border-subtle pl-6 relative">
                  <span className="absolute w-3 h-3 bg-bg border-2 border-fg rounded-full -left-[7px] top-1"></span>
                  <span className="text-xs sm:text-sm font-mono font-medium text-muted mb-1">{itemValue.date}</span>
                  <p className="text-sm sm:text-base text-fg/90 leading-relaxed max-w-3xl">
                    {itemValue.content}
                    {itemValue.linkText && (
                      <a href={itemValue.link || "#"} target="_blank" rel="noopener noreferrer" className="ml-0 sm:ml-2 mt-2 sm:mt-0 inline-block font-medium text-sm border border-border-subtle bg-fg/5 px-2.5 py-1 rounded-md hover:bg-fg/10 transition-colors">
                        {itemValue.linkText}
                      </a>
                    )}
                  </p>
                </m.div>
              ))}
            </m.div>
          </div>
        </div>

        {/* Full Width Section: Experience */}
        {homeData.experience && homeData.experience.length > 0 && (
          <div className="border-t border-border-subtle pt-10 w-full text-left">
            <div className="flex flex-col mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-fg mb-8">Experience</h2>
              <m.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="space-y-4"
              >
                {homeData.experience.map((exp, index) => (
                  <m.div key={index} variants={item} className="flex flex-col border-l-2 border-border-subtle pl-6 relative">
                    <span className="absolute w-3 h-3 bg-bg border-2 border-fg rounded-full -left-[7px] top-1.5"></span>
                    <h3 className="text-lg font-bold text-fg mb-1">{exp.role}</h3>
                    <p className="text-sm sm:text-base text-fg/90 font-medium mb-1">
                      {exp.url ? (
                        <a href={exp.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-fg/80 transition-colors">
                          {exp.company}
                        </a>
                      ) : (
                        exp.company
                      )}
                      {" "}
                      <span className="font-mono text-xs sm:text-sm text-muted">({exp.period})</span>
                    </p>
                    <p className="text-xs sm:text-sm text-muted mb-1">{exp.location}</p>
                    <p className="text-sm sm:text-base text-fg/80">{exp.description}</p>
                  </m.div>
                ))}
              </m.div>
            </div>
          </div>
        )}

        {/* Grid Section: Education & Skills Side by Side */}
        <div className="mt-10 lg:mt-16 border-t border-border-subtle pt-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 w-full">
            
            {/* Left: Education (Timeline) */}
            <div  className="flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-fg mb-8">Education</h2>
              <m.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="space-y-4"
              >
                {homeData.education.map((edu, index) => (
                  <m.div key={index} variants={item} className="flex flex-col border-l-2 border-border-subtle pl-6 relative">
                    <span className="absolute w-3 h-3 bg-bg border-2 border-fg rounded-full -left-[7px] top-1.5"></span>
                    <a href={edu.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-fg/80 transition-all w-fit">
                      <h3 className="text-lg font-bold text-fg mb-1">{edu.institution}</h3>
                    </a>
                    <p className="text-sm sm:text-base text-fg/90 font-medium mb-1">
                      {edu.degree} <span className="font-mono text-xs sm:text-sm text-muted">({edu.period})</span>
                    </p>
                    <p className="text-xs sm:text-sm text-muted mb-1">{edu.location}</p>
                    <p className="text-xs sm:text-sm font-semibold text-fg/80">{edu.details}</p>
                  </m.div>
                ))}
              </m.div>
            </div>

            {/* Right: Skills */}
            <div  className="flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-fg mb-8">Skills</h2>
              <m.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="space-y-6"
              >
                {homeData.skills.map((skillGroup, index) => (
                  <m.div key={index} variants={item}>
                    <p className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
                      {skillGroup.category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skillValue, sIndex) => (
                        <span 
                          key={sIndex} 
                          className="px-3 py-1.5 rounded-md bg-fg/5 border border-border-subtle text-sm font-medium text-fg"
                        >
                          {skillValue}
                        </span>
                      ))}
                    </div>
                  </m.div>
                ))}
              </m.div>
            </div>

          </div>
      </div>
    </section>

    <section id="projects" className="w-full border-t border-border-subtle bg-bg py-16">
      <div className="max-w-7xl mx-auto px-6">
        {loadedLevel > 0 && <Projects isSection />}
      </div>
    </section>

    <section id="publications" className="w-full border-t border-border-subtle bg-bg py-16">
      <div className="max-w-7xl mx-auto px-6">
        {loadedLevel > 1 && <Publications isSection />}
      </div>
    </section>

    <section id="cv" className="w-full border-t border-border-subtle bg-bg py-16">
      <div className="max-w-7xl mx-auto px-6">
        {loadedLevel > 2 && <CV isSection />}
      </div>
    </section>
    
    </m.div>
  );
}
