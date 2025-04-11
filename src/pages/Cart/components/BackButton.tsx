import React from "react";
import { Icon } from "@ui/Icon";

export const BackButton: React.FC = () => {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex items-center gap-2 text-gray-500 mb-4"
    >
      <Icon id="back-arrow" size={6} />
      Back
    </button>
  );
};
