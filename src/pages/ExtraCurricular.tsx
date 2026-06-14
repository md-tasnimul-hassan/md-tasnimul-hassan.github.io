import { m } from "motion/react";
import { Award, Calendar, ExternalLink, Leaf, Globe, Flag, Lightbulb, ScrollText, Users, Tag } from "lucide-react";
import data from "../data/extracurricular.json";

function getIconForTag(tagName: string) {
  const lower = tagName.toLowerCase();
  if (lower.includes('leader') || lower.includes('ambassador')) return <Flag size={12} className="text-muted" />;
  if (lower.includes('think') || lower.includes('brain')) return <Lightbulb size={12} className="text-muted" />;
  if (lower.includes('social') || lower.includes('community') || lower.includes('youth') || lower.includes('people')) return <Users size={12} className="text-muted" />;
  if (lower.includes('global') || lower.includes('world')) return <Globe size={12} className="text-muted" />;
  if (lower.includes('sustain') || lower.includes('environ') || lower.includes('climate')) return <Leaf size={12} className="text-muted" />;
  if (lower.includes('policy') || lower.includes('rule')) return <ScrollText size={12} className="text-muted" />;
  return <Tag size={12} className="text-muted" />;
}

export function ExtraCurricular() {
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
        <div className="grid grid-cols-1 gap-8 w-full">
          {data.activities.map((activity) => (
            <div
              key={activity.id}
              
              className="group relative bg-bg border border-border-subtle rounded-2xl p-6 sm:p-8 hover:border-fg/20 hover:bg-fg/5 transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-fg mb-2">
                        {activity.role}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-muted font-medium">
                        <span className="flex items-center gap-1.5 text-fg/80">
                          <Award size={16} />
                          {activity.organization}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="text-sm italic">{activity.issuer}</span>
                      </div>
                    </div>
                    <div className="inline-flex shrink-0 items-center gap-2 text-sm font-mono text-muted bg-fg/5 px-3 py-1.5 rounded-lg whitespace-nowrap">
                      <Calendar size={14} />
                      {activity.date}
                    </div>
                  </div>

                  <p className="text-base text-fg/80 leading-relaxed mb-6 text-pretty">
                    {activity.description}
                  </p>

                  <div className="flex flex-wrap gap-2 items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {activity.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded-md border border-border-subtle bg-bg text-fg/90"
                        >
                          {getIconForTag(tag)}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Certificate Showcase Column */}
                {(activity.certificateImage || activity.certificateLink) && (
                  <div className="w-full md:w-64 max-w-sm shrink-0 flex flex-col gap-3">
                    {activity.certificateImage ? (
                      <a href={activity.certificateLink || activity.certificateImage} target="_blank" rel="noopener noreferrer" className="block w-full aspect-[4/3] rounded-xl overflow-hidden border border-border-subtle hover:border-fg/40 transition-colors shadow-sm bg-bg/50">
                        <img 
                          src={activity.certificateImage} 
                          alt={`${activity.organization} Certificate`}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      </a>
                    ) : (
                      <div className="w-full h-32 rounded-xl border border-dashed border-border-subtle bg-fg/5 flex items-center justify-center text-muted font-medium text-sm p-4 text-center">
                        Certificate visual placeholder
                      </div>
                    )}
                    
                    {activity.certificateLink && (
                      <a 
                        href={activity.certificateLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-fg/5 hover:bg-fg/10 border border-transparent hover:border-border-subtle text-fg text-sm font-medium transition-all"
                      >
                        <ExternalLink size={16} /> View Certificate
                      </a>
                    )}
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
