import React from "react";
import { Icon } from "@ui/Icon";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-white border-t border-elements py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
          <div className="mb-4 sm:mb-0">
            <div className="flex flex-col h-[22px] justify-between">
              <span className="text-primary font-bold text-[11px] leading-none">
                Linx
              </span>
              <span className="text-primary font-bold text-[11px] leading-none">
                Net👌
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-12">
            <a
              href="https://github.com/no1pain"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mont text-[12px] leading-[11px] tracking-[0.04em] font-[800] uppercase text-secondary hover:text-primary transition-colors"
            >
              Github
            </a>
            <Link
              to="www.linkedin.com/in/oleksandr-kazan-465771341"
              className="font-mont text-[12px] leading-[11px] tracking-[0.04em] font-[800] uppercase text-secondary hover:text-primary transition-colors"
            >
              Contacts
            </Link>
            <Link
              to="/rights"
              className="font-mont text-[12px] leading-[11px] tracking-[0.04em] font-[800] uppercase text-secondary hover:text-primary transition-colors"
            >
              Rights
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-8 self-center sm:self-auto sm:mt-0">
            <button
              onClick={scrollToTop}
              className="font-mont text-[12px] leading-[11px] tracking-[0.04em] font-[800] uppercase text-secondary hover:text-primary transition-colors"
            >
              Back to top
            </button>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 border border-elements flex items-center justify-center"
              aria-label="Back to top"
            >
              <Icon
                id="arrow-right"
                size={16}
                className="transform -rotate-90"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
