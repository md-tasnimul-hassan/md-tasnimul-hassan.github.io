import { m } from "motion/react";
import { FolderGit2, Code2, ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import projectsData from "../data/projects.json";
import { usePageTitle } from "../hooks/usePageTitle";

export function Projects({ isSection }: { isSection?: boolean }) {
  usePageTitle(isSection ? null : "Projects - Machine Learning & Tech");

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
      initial={isSection ? {} : { opacity: 0 }}
      animate={isSection ? {} : { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}
      exit={isSection ? {} : { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
      className="w-full"
    >
      <div className={`flex flex-col items-center ${isSection ? 'p-0' : 'min-h-[calc(100vh-4rem)] p-6'}`}>
      <div className="w-full max-w-7xl flex flex-col pt-6 pb-12">
        {isSection && (
          <div className="text-center w-full mb-10">
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-fg tracking-tight">Projects</h2>
          </div>
        )}
        <div className="flex flex-col gap-6 w-full">
          {projectsData.projects.map((project, index) => (
            <div
              key={project.id || index}
              id={project.id}
              className="group flex flex-col md:flex-row bg-bg border border-border-subtle rounded-3xl overflow-hidden hover:border-fg/30 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="contents md:flex md:flex-col md:w-1/3 md:shrink-0 md:border-r md:border-border-subtle md:bg-fg/5">
                {project.image && (
                  <div className="order-1 md:order-none p-3 pb-0 md:p-5 md:pb-0 bg-fg/5 md:bg-transparent border-b border-border-subtle md:border-none">
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                )}
                
                <div className="order-3 md:order-none flex flex-col gap-4 p-6 md:p-8 mt-auto md:border-t-0 border-t border-border-subtle bg-bg md:bg-transparent">
                  <div className="flex flex-wrap gap-2.5">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono font-medium rounded-md bg-fg/10 text-fg/90 border border-transparent"
                      >
                        <Code2 size={12} className="text-muted" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-5 border-t border-border-subtle/50">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center sm:w-auto w-full px-6 py-2.5 gap-2 rounded-xl bg-fg text-bg hover:opacity-90 font-medium transition-opacity"
                      >
                        <Github size={18} /> Source
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center sm:w-auto w-full px-6 py-2.5 gap-2 rounded-xl bg-fg text-bg hover:opacity-90 font-medium transition-opacity"
                      >
                        <ExternalLink size={18} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="order-2 md:order-none flex flex-col flex-grow p-6 sm:p-8">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div>
                    {(project as any).detailsLink ? (
                      <a href={(project as any).detailsLink}>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-fg mb-2 leading-tight hover:text-fg/80 transition-colors">
                          {project.title}
                        </h3>
                      </a>
                    ) : (
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-fg mb-2 leading-tight">
                        {project.title}
                      </h3>
                    )}
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted font-medium mb-3">
                      <span className="text-fg/80">{project.category}</span>
                      {project.date && (
                        <>
                          <span className="opacity-50">•</span>
                          <span className="font-mono">{project.date}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-fg/70 leading-relaxed text-pretty flex-grow">
                  {project.description}
                </p>

                {(project as any).detailsLink && (
                  <div className="mt-6 pt-4 border-t border-border-subtle/50 w-full flex justify-end">
                    <a
                      href={(project as any).detailsLink}
                      className="group/link flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-fg hover:text-fg/80 transition-colors"
                    >
                      View Details
                      <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </m.div>
  );
}
