import React from "react";
import { m } from "motion/react";
import { Download, Globe, Mail, Linkedin, Github, ExternalLink } from "lucide-react";
import cvData from "../data/cv.json";
import { usePageTitle } from "../hooks/usePageTitle";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-2xl font-bold uppercase tracking-wider text-fg border-b-2 border-border-subtle pb-2 mb-6">
      {title}
    </h2>
    <div className="flex flex-col gap-4">
      {children}
    </div>
  </section>
);

const ExperienceItem = ({
  title,
  subtitle,
  date,
  location,
  description,
  bullets
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  date: string;
  location?: string;
  description?: string;
  bullets?: React.ReactNode[];
}) => (
  <div className="flex flex-col">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start text-fg gap-4">
      <div>
        <h3 className="font-bold text-xl">{title}</h3>
        {subtitle && <p className="italic text-muted text-lg">{subtitle}</p>}
      </div>
      <div className="sm:text-right mt-1 sm:mt-0 text-base shrink-0 whitespace-nowrap">
        <p className="font-medium">{date}</p>
        {location && <p className="italic text-muted">{location}</p>}
      </div>
    </div>
    {description && <p className="mt-2 text-fg/80 text-lg">{description}</p>}
    {bullets && bullets.length > 0 && (
      <ul className="list-disc list-outside ml-5 mt-2 space-y-2 text-fg/80 text-lg">
        {bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
    )}
  </div>
);

export function CV() {
  usePageTitle("Curriculum Vitae");

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
      <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] p-4 sm:p-6">
      
      <div className="w-full max-w-4xl flex flex-col pb-24">
        
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pt-4">
          <p className="text-muted font-medium italic text-sm sm:text-base">
            "Drop an email for an updated CV"
          </p>
          <a
            href={cvData.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-fg text-bg hover:opacity-90 transition-opacity px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-bold shadow-md text-sm shrink-0"
          >
            <Download size={20} />
            <span>Download CV</span>
          </a>
        </div>

        <div className="w-full">
          {/* Main CV Document Style Container */}
          <div className="bg-bg border border-border-subtle rounded-xl p-6 sm:p-10 md:p-14 shadow-sm w-full mx-auto" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
            
            {/* Header */}
            <div className="text-center mb-10 pb-6">
              <h1 className="text-3xl sm:text-5xl font-bold uppercase tracking-widest text-fg border-b-2 border-transparent mb-2">
                Md. Tasnimul Hassan
              </h1>
              <p className="text-muted text-base sm:text-lg mt-2">BUET, Dhaka, Bangladesh</p>
              
              <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-5 text-base font-medium text-fg/80">
                <a href="https://md-tasnimul-hassan.github.io" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors flex items-center gap-1.5">
                  <Globe size={16} /> <span className="underline underline-offset-2">md-tasnimul-hassan.github.io</span>
                </a>
                <a href="mailto:tasnimul.eee@gmail.com" className="hover:text-fg transition-colors flex items-center gap-1.5">
                  <Mail size={16} /> <span className="underline underline-offset-2">tasnimul.eee@gmail.com</span>
                </a>
                <a href="https://linkedin.com/in/md-tasnimul-hassan/" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors flex items-center gap-1.5">
                  <Linkedin size={16} /> <span className="underline underline-offset-2">linkedin.com/in/md-tasnimul-hassan</span>
                </a>
                <a href="https://github.com/md-tasnimul-hassan" target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors flex items-center gap-1.5">
                  <Github size={16} /> <span className="underline underline-offset-2">github.com/md-tasnimul-hassan</span>
                </a>
              </div>
            </div>

            {/* Education */}
            <Section title="Education">
              <ExperienceItem
                title="Bangladesh University of Engineering and Technology"
                subtitle="Bachelor of Electrical and Electronic Engineering (Level 2 | Term 1)"
                date="March 2024 – Present"
                location="Dhaka, Bangladesh"
              />
              <ExperienceItem
                title="Rangpur Government College"
                subtitle="Higher Secondary School Certificate (HSC)"
                date="January 2021 – December 2023"
                location="Rangpur, Bangladesh"
              />
              <ExperienceItem
                title="Rangpur Zilla School"
                subtitle="Secondary School Certificate (SSC)"
                date="January 2016 – December 2020"
                location="Rangpur, Bangladesh"
              />
              <ExperienceItem
                title="Government Muslim High School"
                subtitle="Primary School Certificate (PSC)"
                date="January 2015 – December 2016"
                location="Chattogram, Bangladesh"
              />
            </Section>

            {/* Coursework */}
            <Section title="Relevant Coursework">
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 list-disc list-inside text-lg text-fg/80">
                <li>Machine Learning</li>
                <li>Signals and Systems</li>
                <li>Numerical Analysis</li>
                <li>Computer Programming</li>
                <li>Electrical Circuits</li>
                <li>Electronic Circuits</li>
                <li>Energy Conversion</li>
                <li>Multi-variable Calculus</li>
              </ul>
            </Section>

            {/* Experience */}
            <Section title="Experience">
              <ExperienceItem
                title="IEEE BUET Student Branch"
                subtitle="Batch Representative"
                date="April 2025 – Present"
                location="Dhaka, Bangladesh"
                bullets={[
                  "Assisted in arranging promotional campaigns for technical events (e.g., Arduino Workshop, PCB Design), resulting in a 20% increase in batch participation.",
                  "Gathered feedback from students regarding desired technical skills to assist the Executive Board in curating relevant future workshop topics."
                ]}
              />
            </Section>

            {/* Projects */}
            <Section title="Projects">
              <ExperienceItem
                title={
                  <span className="flex items-center gap-2">
                    GameZone - Gamify with Python
                    <a href="https://github.com/md-tasnimul-hassan/cs50P_Final_Project" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-normal text-base text-muted hover:text-fg transition-colors">
                      <Github size={16} /> <span className="underline underline-offset-2">Source Code</span>
                    </a>
                  </span>
                }
                subtitle={<span><em>Python, Pytest, Minimax</em></span>}
                date="Nov 2025"
                bullets={[
                  "Developed a modular CLI-based gaming platform featuring three distinct games, utilizing Pytest for comprehensive unit testing.",
                  "Engineered an unbeatable AI for Tic-Tac-Toe using the Minimax algorithm, optimizing decision trees for max difficulty.",
                  "Implemented a custom authentication system with Regex validation and a persistent CSV database to track user statistics."
                ]}
              />
            </Section>

            {/* Technical Skills */}
            <Section title="Technical Skills">
              <div className="flex flex-col gap-3 text-lg text-fg/80">
                <div><span className="font-bold text-fg">Languages:</span> C, C++, Python, MATLAB</div>
                <div><span className="font-bold text-fg">Simulation & Design:</span> PSpice, AutoCAD, TinkerCAD, Altium Designer</div>
                <div><span className="font-bold text-fg">Hardware / Embedded:</span> Arduino, Oscilloscopes, Function Generators</div>
                <div><span className="font-bold text-fg">General Tools:</span> VS Code, LaTeX, Git/GitHub, Microsoft Office</div>
              </div>
            </Section>

            {/* Extracurricular */}
            <Section title="Extracurricular">
              <ExperienceItem
                title="Waste Hero Ambassador"
                subtitle="Volunteer | Stockholm Environment Institute"
                date="August 2022"
                bullets={[
                  "Successfully completed the Design for Policy bootcamp series."
                ]}
              />
            </Section>

            {/* Certifications */}
            <Section title="Certifications">
              <ul className="flex flex-col gap-4 text-lg text-fg/80">
                <li className="flex flex-col sm:flex-row justify-between sm:items-center list-none pl-0">
                  <span>
                    <span className="font-bold text-fg">CS50's Introduction to Programming with Python</span> – Harvard University
                  </span>
                  <a href="https://certificates.cs50.io/0faea6cd-c4df-4079-b9e2-f290c4ee8916.pdf?size=letter" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg transition-colors font-medium text-base mt-1 sm:mt-0 flex items-center gap-1">
                    [ Verify ] <ExternalLink size={16} />
                  </a>
                </li>
                <li className="flex flex-col sm:flex-row justify-between sm:items-center list-none pl-0">
                  <span>
                    <span className="font-bold text-fg">Supervised Machine Learning</span> – DeepLearning.AI / Stanford University
                  </span>
                  <a href="https://www.coursera.org/account/accomplishments/verify/A4K19KR29CIL" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg transition-colors font-medium text-base mt-1 sm:mt-0 flex items-center gap-1">
                    [ Verify ] <ExternalLink size={16} />
                  </a>
                </li>
              </ul>
            </Section>
          </div>
        </div>
      </div>
    </div>
    </m.div>
  );
}
