import React from "react";
import { Icon } from "@ui/Icon";
import { Container } from "@ui/layout/Container";

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-elements">
      <Container>
        <div className="h-[48px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold text-lg">NICE</span>
            <span className="text-[#F9A43F] font-bold text-lg">GADGETS</span>
          </div>

          <button
            className="w-8 h-8 flex items-center justify-center text-primary hover:text-secondary transition-colors"
            aria-label="Menu"
          >
            <Icon id="burger" />
          </button>
        </div>
      </Container>
    </header>
  );
};
