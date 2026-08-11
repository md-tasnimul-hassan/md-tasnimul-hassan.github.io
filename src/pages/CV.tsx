import React, { useMemo } from "react";
import { m } from "motion/react";
import { Download } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";
import cvData from "../data/cv.json";

function getEmbedConfig(url: string) {
  if (!url) return { isDrive: false, embedUrl: null };
  const match = url.match(/\/file\/d\/([^\/]+)/);
  if (match && match[1]) {
    return {
      isDrive: true,
      embedUrl: `https://drive.google.com/file/d/${match[1]}/preview`
    };
  }
  return { isDrive: false, embedUrl: null };
}

export function CV({ isSection }: { isSection?: boolean }) {
  usePageTitle(isSection ? null : "Curriculum Vitae");

  const pdfFileName = `${import.meta.env.BASE_URL}resume.pdf`;
  const cacheBusterUrl = useMemo(() => `${pdfFileName}?v=${new Date().getTime()}`, [pdfFileName]);
  const downloadUrl = cvData.downloadLink || pdfFileName;
  const { isDrive, embedUrl } = useMemo(() => getEmbedConfig(cvData.downloadLink), []);

  return (
    <m.div
      initial={isSection ? {} : { opacity: 0 }}
      animate={isSection ? {} : { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}
      exit={isSection ? {} : { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
      className="w-full"
    >
      <div className={`flex flex-col items-center ${isSection ? 'p-0' : 'min-h-[calc(100vh-4rem)] p-4 sm:p-6'}`}>
      
      <div className="w-full max-w-5xl flex flex-col pb-24">
        {isSection && (
          <div className="text-center w-full mb-10 mt-6">
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-fg tracking-tight">Curriculum Vitae</h2>
          </div>
        )}
        
        <div className="w-full flex flex-col items-center gap-4 mb-8 pt-4">
          <p className="text-muted font-medium italic text-sm sm:text-base text-center">
            "Drop an email for an updated CV"
          </p>
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-fg text-bg hover:opacity-90 transition-opacity px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-bold shadow-md text-sm shrink-0"
          >
            <Download size={20} />
            <span>Download CV</span>
          </a>
        </div>

        <div className="w-full h-[85vh] min-h-[600px] border border-border-subtle rounded-xl overflow-hidden bg-[#525659] shadow-sm">
          {isDrive && embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              title="CV Preview"
              allow="autoplay"
            />
          ) : (
            <object data={cacheBusterUrl} type="application/pdf" className="w-full h-full">
              <div className="flex flex-col justify-center items-center h-full text-white font-sans text-center p-5">
                <h2 className="text-2xl font-bold mb-2">View My Resume</h2>
                <p className="mb-4">Your mobile browser doesn't support inline PDFs.</p>
                <a 
                  href={downloadUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#4CAF50] text-white text-base font-bold mt-4 px-6 py-3 rounded-lg hover:bg-[#45a049] transition-colors"
                >
                  Tap here to open / download
                </a>
              </div>
            </object>
          )}
        </div>
      </div>
    </div>
    </m.div>
  );
}
