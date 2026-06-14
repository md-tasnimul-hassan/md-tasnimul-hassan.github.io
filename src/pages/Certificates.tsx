import { m } from "motion/react";
import { ExternalLink } from "lucide-react";
import data from "../data/certificates.json";
import { usePageTitle } from "../hooks/usePageTitle";

export function Certificates() {
  usePageTitle("Certificates");

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
      // Inside /src/pages/Certificates.tsx

<div className="flex flex-col w-full min-h-[calc(100vh-4rem)]">
  {/* Added padding on the left and right (px-4 sm:px-6 lg:px-8) and added some top margin (pt-6) */}
  <div className="w-full flex flex-col pt-6 pb-24 px-4 sm:px-6 lg:px-8">
  
    {/* Added a gap (gap-6 lg:gap-8) to separate the items in the grid row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6 lg:gap-8">
      {data.items.map((cert) => (
        <div
          key={cert.id}
          // Restored borders all around and rounded corners so they stand alone elegantly
          className="flex flex-col w-full bg-bg border border-border-subtle rounded-2xl group overflow-hidden"
        >
          {"image" in cert && cert.image && (
            <div className="w-full relative bg-fg/5 flex items-center justify-center border-b border-border-subtle overflow-hidden">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          )}
          
          <div className="flex flex-row justify-between items-center gap-4 p-4 sm:p-6 w-full">
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl font-bold text-fg leading-tight">
                {cert.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm">
                <p className="text-fg/70">{cert.issuer}</p>
                <div className="font-mono text-muted bg-fg/5 px-1.5 py-0.5 rounded text-xs">
                  {cert.date}
                </div>
              </div>
            </div>
            
            <div className="shrink-0 flex items-center">
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-fg text-bg hover:opacity-90 font-medium transition-opacity text-sm whitespace-nowrap"
              >
                Verify <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </m.div>
  );
}
