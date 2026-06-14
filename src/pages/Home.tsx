import { m } from "motion/react";
import homeData from "../data/home.json";

export function Home() {
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
        className="w-full max-w-6xl flex flex-col pt-12 pb-24"
        
        
        
        
      >
        {/* Top Section: Title & Intro */}
        <div  className="text-center w-full mb-16 md:mb-24">
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
          <div  className="relative w-full flex justify-center order-last md:order-first">
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
            <div className="space-y-4 text-base md:text-lg text-fg/80 leading-relaxed text-left text-pretty max-w-prose mx-auto md:mx-0">
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
        <div className="mt-24 lg:mt-32 border-t border-border-subtle pt-16 w-full text-left">
          <div  className="flex flex-col mb-20 md:mb-28">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-fg mb-10">News and Updates 📢</h2>
            <m.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-8"
            >
              {homeData.news.map((itemValue, index) => (
                <m.div key={index} variants={item} className="flex flex-col border-l-2 border-border-subtle pl-6 relative">
                  <span className="absolute w-3 h-3 bg-bg border-2 border-fg rounded-full -left-[7px] top-1"></span>
                  <span className="text-sm font-mono font-medium text-muted mb-2">{itemValue.date}</span>
                  <p className="text-lg text-fg/90 leading-relaxed max-w-3xl">
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

        {/* Grid Section: Education & Skills Side by Side */}
        <div className="mt-16 lg:mt-24 border-t border-border-subtle pt-16 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 w-full">
            
            {/* Left: Education (Timeline) */}
            <div  className="flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-fg mb-8">Education</h2>
              <m.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="space-y-10"
              >
                {homeData.education.map((edu, index) => (
                  <m.div key={index} variants={item} className="flex flex-col border-l-2 border-border-subtle pl-6 relative">
                    <span className="absolute w-3 h-3 bg-bg border-2 border-fg rounded-full -left-[7px] top-1.5"></span>
                    <a href={edu.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-fg/80 transition-all w-fit">
                      <h3 className="text-xl font-bold text-fg mb-1">{edu.institution}</h3>
                    </a>
                    <p className="text-base text-fg/90 font-medium mb-1">
                      {edu.degree} <span className="font-mono text-sm text-muted">({edu.period})</span>
                    </p>
                    <p className="text-sm text-muted mb-2">{edu.location}</p>
                    <p className="text-sm font-semibold text-fg/80">{edu.details}</p>
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
                className="space-y-8"
              >
                {homeData.skills.map((skillGroup, index) => (
                  <m.div key={index} variants={item}>
                    <p className="text-sm font-mono text-muted uppercase tracking-wider mb-3">
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
    </div>
    </m.div>
  );
}
