import { m } from "motion/react";
import { FolderGit2, Code2, ExternalLink, Github } from "lucide-react";
import projectsData from "../data/projects.json";
import { usePageTitle } from "../hooks/usePageTitle";

export function Projects() {
  usePageTitle("Projects - Machine Learning & Tech");

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
      <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] p-6">
      <div
        className="w-full max-w-5xl flex flex-col pt-12 pb-24"
        
        
        
        
      >
        <div className="flex flex-col gap-10 w-full">
          {projectsData.projects.map((project, index) => (
            <div
              key={project.id || index}
              className="group flex flex-col md:flex-row bg-bg border border-border-subtle rounded-3xl overflow-hidden hover:border-fg/30 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col w-full md:w-5/12 shrink-0 border-b md:border-b-0 md:border-r border-border-subtle bg-fg/5">
                {project.image && (
                  <div className="p-6 pb-0 md:p-10 md:pb-0">
                    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col gap-6 p-6 md:p-10 mt-auto">
                  <div className="flex flex-wrap gap-2.5">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-mono font-medium rounded-lg bg-bg text-fg/90 border border-border-subtle"
                      >
                        <Code2 size={14} className="text-muted" />
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
              
              <div className="flex flex-col flex-grow p-6 sm:p-8 md:p-10">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-fg mb-3 leading-tight">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-muted font-medium mb-4">
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

                <p className="text-base sm:text-lg text-fg/70 leading-relaxed text-pretty">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </m.div>
  );
}
