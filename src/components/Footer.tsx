import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import homeData from "../data/home.json";
import footerData from "../data/footer.json";

const IconWrapper = ({ children, size = 26 }: { children: React.ReactNode, size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

const YoutubeIcon = ({ size }: { size?: number }) => (
  <IconWrapper size={size}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </IconWrapper>
);

const GithubIcon = ({ size }: { size?: number }) => (
  <IconWrapper size={size}>
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57A12.02 12.02 0 0 0 24 12c0-6.627-5.373-12-12-12z"/>
  </IconWrapper>
);

const LinkedinIcon = ({ size }: { size?: number }) => (
  <IconWrapper size={size}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </IconWrapper>
);

const OrcidIcon = ({ size }: { size?: number }) => (
  <IconWrapper size={size}>
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/>
  </IconWrapper>
);

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = () => {
    // Decoding the obfuscated email string: dGFzbmltdWwuZWVlQGdtYWlsLmNvbQ==
    // This prevents standard bots from easily scraping the address
    const emailToCopy = atob("dGFzbmltdWwuZWVlQGdtYWlsLmNvbQ==");
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(emailToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <footer className="w-full border-t border-border-subtle mt-16 mt-auto bg-bg-footer transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium text-fg/80">Mail to: </span>
              {/* Spans visually concatenated to avoid regex scraping from DOM */}
              <span className="text-lg font-mono text-muted tracking-tight">tasnimul.eee<span>@</span>gmail.com</span>
              <button 
                onClick={handleCopyEmail}
                className="ml-2 p-2 rounded-md bg-fg/5 hover:bg-fg/10 text-muted hover:text-fg transition-colors"
                title="Copy email address"
                aria-label="Copy email address"
              >
                {isCopied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </button>
            </div>
            <span className="text-base text-muted mt-2">
              &copy; {currentYear} All rights reserved.
            </span>
          </div>

          <div className="flex items-center space-x-6">
            {footerData.socials.map((social) => {
              let Icon = null;
              if (social.name === "YouTube") Icon = YoutubeIcon;
              if (social.name === "GitHub") Icon = GithubIcon;
              if (social.name === "LinkedIn") Icon = LinkedinIcon;
              if (social.name === "ORCID") Icon = OrcidIcon;
              
              if (!Icon) return null;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-fg transition-colors"
                  aria-label={social.name}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
