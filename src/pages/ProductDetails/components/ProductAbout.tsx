import React from "react";
import { Typography } from "@ui/Typography";

interface AboutSection {
  title: string;
  text: string[];
}

interface ProductAboutProps {
  description: string | AboutSection[];
}

export const ProductAbout: React.FC<ProductAboutProps> = ({ description }) => {
  const isSpecialTitle = (title: string) => {
    return title.includes("Shoot it. Flip it.");
  };

  return (
    <div>
      <Typography
        variant="h2"
        as="h2"
        className="text-[22px] font-mont font-extrabold leading-[140%] mb-4 pb-2 border-b border-gray-300"
      >
        About
      </Typography>

      {typeof description === "string" ? (
        <div className="font-mont text-[14px] font-normal leading-[21px] text-[#89939A]">
          {description}
        </div>
      ) : (
        Array.isArray(description) && (
          <div className="space-y-6">
            {description.map((section, index) => (
              <div key={index} className="mb-6">
                {isSpecialTitle(section.title) ? (
                  <Typography
                    variant="h4"
                    as="h4"
                    className="text-[22px] font-mont font-medium leading-[140%] text-[#313237] mb-6"
                  >
                    {section.title}
                  </Typography>
                ) : (
                  <Typography
                    variant="h4"
                    as="h4"
                    className="text-[22px] font-mont font-medium leading-[140%] text-[#313237] mb-2"
                  >
                    {section.title}
                  </Typography>
                )}
                {section.text.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="font-mont text-[14px] font-normal leading-[21px] text-[#89939A] mb-3"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
