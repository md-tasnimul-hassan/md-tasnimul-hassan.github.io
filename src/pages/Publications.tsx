import { m } from "motion/react";
import publicationsData from "../data/publications.json";
import { usePageTitle } from "../hooks/usePageTitle";
import { FileText, ExternalLink } from "lucide-react";

export function Publications({ isSection }: { isSection?: boolean }) {
  usePageTitle(isSection ? null : "Publications - Md. Tasnimul Hassan");

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
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-fg tracking-tight">Publications</h2>
            </div>
          )}
          <m.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-6 w-full"
          >
            {publicationsData.publications.map((pub) => (
              <m.div
                key={pub.id}
                variants={item}
                className="group flex flex-col bg-bg border border-border-subtle rounded-3xl overflow-hidden hover:border-fg/30 transition-all duration-300 shadow-sm hover:shadow-md p-6 md:p-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="mt-1 bg-fg/5 p-3 rounded-xl border border-border-subtle hidden sm:block">
                    <FileText size={24} className="text-fg/80" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-fg mb-2 leading-tight">
                      {pub.title}
                    </h3>
                    <div className="text-sm sm:text-base text-fg/80 font-medium mb-1">
                      {pub.authors.join(", ")}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted font-medium mb-3">
                      <span className="text-fg/80">{pub.conference}</span>
                      {pub.date && (
                        <>
                          <span className="opacity-50">•</span>
                          <span className="font-mono">{pub.date}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-fg/70 leading-relaxed text-pretty mb-4">
                      {pub.description}
                    </p>

                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-fg/5 border border-border-subtle text-fg hover:bg-fg/10 font-medium transition-colors w-fit"
                      >
                        Read Paper <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </m.div>
  );
}
