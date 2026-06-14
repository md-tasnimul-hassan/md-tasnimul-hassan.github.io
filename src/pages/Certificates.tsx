import { m } from "motion/react";
import { ExternalLink } from "lucide-react";
import data from "../data/certificates.json";

export function Certificates() {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {data.items.map((cert) => (
            <div
              key={cert.id}
              
              className="flex flex-col h-full bg-bg border border-border-subtle rounded-2xl p-6 sm:p-8 hover:shadow-sm hover:border-fg/30 transition-all group overflow-hidden"
            >
              {"image" in cert && cert.image && (
                <div className="relative w-full mb-6 rounded-xl overflow-hidden border border-border-subtle bg-fg/5 aspect-[4/3] flex items-center justify-center">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-fg mb-3 leading-tight">
                  {cert.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                  <p className="text-base text-fg/70 break-words">{cert.issuer}</p>
                  <div className="flex items-center text-xs font-mono text-muted bg-fg/5 px-2 py-1 rounded-lg">
                    {cert.date}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border-subtle/50 mt-auto">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-fg text-bg hover:opacity-90 font-medium transition-opacity"
                >
                  Verify <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </m.div>
  );
}
