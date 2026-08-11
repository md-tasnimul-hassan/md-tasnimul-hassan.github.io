import { m } from "motion/react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import projectsData from "../data/projects.json";
import { usePageTitle } from "../hooks/usePageTitle";
import { ArrowLeft, ExternalLink, Github, Code2 } from "lucide-react";

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projectsData.projects.find((p) => p.id === id);
  
  usePageTitle(project ? `${project.title} - Project Details` : "Project Not Found");

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

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
        <div className="w-full max-w-4xl flex flex-col pt-12 pb-24">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-muted hover:text-fg transition-colors w-fit mb-8 font-medium cursor-pointer"
          >
            <ArrowLeft size={20} /> Back to Projects
          </button>

          <m.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-10"
          >
            <m.div variants={item} className="flex flex-col gap-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-fg tracking-tight">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-base sm:text-lg text-muted font-medium">
                <span className="text-fg/80">{project.category}</span>
                {project.date && (
                  <>
                    <span className="opacity-50">•</span>
                    <span className="font-mono">{project.date}</span>
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5 mt-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-mono font-medium rounded-lg bg-fg/5 text-fg/90 border border-border-subtle"
                  >
                    <Code2 size={14} className="text-muted" />
                    {tech}
                  </span>
                ))}
              </div>
            </m.div>

            <m.div variants={item} className="flex flex-wrap items-center gap-4 border-b border-border-subtle pb-8">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:w-auto w-full px-6 py-2.5 gap-2 rounded-xl bg-fg text-bg hover:opacity-90 font-medium transition-opacity"
                >
                  <Github size={18} /> Source Code
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:w-auto w-full px-6 py-2.5 gap-2 rounded-xl bg-fg/5 border border-border-subtle text-fg hover:bg-fg/10 font-medium transition-colors"
                >
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
            </m.div>

            <m.div variants={item} className="flex flex-col gap-8 mt-4">
              {project.details ? (
                <div className="space-y-6 text-lg text-fg/80 leading-relaxed text-pretty">
                  {project.details.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="text-lg text-fg/80 leading-relaxed text-pretty">
                  {project.description}
                </p>
              )}
            </m.div>

            {project.media && project.media.length > 0 && (
              <m.div variants={item} className="flex flex-col gap-8 mt-8">
                <h2 className="text-2xl font-display font-bold text-fg">Media & Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.media.map((imgUrl, idx) => (
                    <div key={idx} className="w-full rounded-2xl overflow-hidden border border-border-subtle shadow-sm bg-fg/5">
                      <img 
                        src={imgUrl} 
                        alt={`${project.title} screenshot ${idx + 1}`}
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </m.div>
            )}
          </m.div>
        </div>
      </div>
    </m.div>
  );
}
