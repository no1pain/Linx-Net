import React from "react";
import { Icon } from "@ui/Icon";
import { Container } from "@ui/layout/Container";

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-elements">
      <Container className="!pr-0 !mr-0">
        <div className="h-[48px] xl:h-[64px] flex items-center justify-between !mr-0">
          <div className="flex items-center gap-8">
            <div className="flex flex-col h-[22px] justify-between">
              <span className="text-primary font-bold text-[11px] leading-none">
                Linx
              </span>
              <span className="text-primary font-bold text-[11px] leading-none">
                Net👌
              </span>
            </div>

            {/* Navigation - visible on tablet and above */}
            <nav className="hidden sm:flex items-center gap-8">
              <a
                href="/"
                className="text-primary font-bold hover:text-secondary transition-colors uppercase"
              >
                Home
              </a>
              <a
                href="/phones"
                className="text-secondary hover:text-primary transition-colors uppercase"
              >
                Phones
              </a>
              <a
                href="/tablets"
                className="text-secondary hover:text-primary transition-colors uppercase"
              >
                Tablets
              </a>
              <a
                href="/accessories"
                className="text-secondary hover:text-primary transition-colors uppercase"
              >
                Accessories
              </a>
            </nav>
          </div>

          <div className="flex items-center">
            <button
              className="hidden sm:flex w-[48px] h-[48px] items-center justify-center text-primary hover:text-secondary transition-colors border-l border-elements"
              aria-label="Favorites"
            >
              <Icon id="heart" className="w-4 h-4" />
            </button>
            <button
              className="hidden sm:flex w-[48px] h-[48px] items-center justify-center text-primary hover:text-secondary transition-colors border-l border-elements"
              aria-label="Cart"
            >
              <Icon id="cart" className="w-4 h-4" />
            </button>
            <button
              className="sm:hidden w-[48px] h-[48px] flex items-center justify-center text-primary hover:text-secondary transition-colors border-l border-elements"
              aria-label="Menu"
            >
              <Icon id="burger" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};
