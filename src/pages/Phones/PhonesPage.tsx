import React, { useState, useMemo } from "react";
import { ProductCard } from "@ui/ProductCard";
import { Typography } from "@ui/Typography";
import iphonesData from "@shared/data/iphones.json";
import { Icon } from "@ui/Icon";

type SortOption = "Newest" | "Alphabetically" | "Cheapest";

type Specs = {
  Screen: string;
  Capacity: string;
  RAM: string;
};

type Phone = {
  id: number | string;
  title: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  image: string;
  specs: Specs;
};

const generateMorePhones = () => {
  const originalCount = iphonesData.length;
  const targetCount = 70;

  const extraNeeded = targetCount - originalCount;

  const repeatTimes = Math.ceil(extraNeeded / originalCount);

  const extraPhones: Phone[] = [];
  const colorVariants = [
    "Black",
    "White",
    "Gold",
    "Silver",
    "Purple",
    "Red",
    "Blue",
    "Green",
  ];
  const storageVariants = [32, 64, 128, 256, 512];

  let count = 0;
  for (let i = 0; i < repeatTimes && count < extraNeeded; i++) {
    for (let j = 0; j < iphonesData.length && count < extraNeeded; j++) {
      const phone = iphonesData[j];
      const color =
        colorVariants[Math.floor(Math.random() * colorVariants.length)];
      const storage =
        storageVariants[Math.floor(Math.random() * storageVariants.length)];
      const priceAdjustment = Math.floor(Math.random() * 200) - 100;

      const newTitle = phone.title
        .replace(/\d+GB/, `${storage}GB`)
        .replace(/Silver|Gold|Black|Red/, color);

      const newSubtitle = phone.subtitle
        ? phone.subtitle
            .replace(/\d+GB/, `${storage}GB`)
            .replace(/Silver|Gold|Black|Red/, color)
        : "";

      extraPhones.push({
        ...phone,
        id: `${phone.id}-${i}-${j}`,
        title: newTitle,
        subtitle: newSubtitle,
        price: Math.max(499, phone.price + priceAdjustment),
        specs: {
          ...phone.specs,
          Capacity: `${storage} GB`,
        },
      });

      count++;
    }
  }

  return [...iphonesData, ...extraPhones];
};

const allPhones = generateMorePhones();

export const PhonesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortBy, setSortBy] = useState<SortOption>("Newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);

  const sortedPhones = useMemo(() => {
    const phones = [...allPhones];

    switch (sortBy) {
      case "Newest":
        // Always randomize the order when "Newest" is selected,
        // but keep the total count the same
        return [...phones].sort(() => Math.random() - 0.5);
      case "Alphabetically":
        return [...phones].sort((a, b) => a.title.localeCompare(b.title));
      case "Cheapest":
        return [...phones].sort((a, b) => a.price - b.price);
      default:
        return phones;
    }
  }, [sortBy]);

  const totalPages = Math.ceil(sortedPhones.length / itemsPerPage);

  const indexOfLastPhone = currentPage * itemsPerPage;
  const indexOfFirstPhone = indexOfLastPhone - itemsPerPage;
  const currentPhones = sortedPhones.slice(indexOfFirstPhone, indexOfLastPhone);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setShowSortDropdown(false);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handleItemsPerPageChange = (option: number) => {
    setItemsPerPage(option);
    setShowItemsDropdown(false);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center text-xs text-gray-500 mb-6">
        <span>Home</span>
        <span className="mx-1">›</span>
        <span className="text-black">Mobile phones</span>
      </div>

      <div className="mb-8">
        <Typography variant="h1" as="h1" className="mb-1">
          Mobile phones
        </Typography>
        <p className="text-sm text-gray-500">{sortedPhones.length} models</p>
      </div>

      <div className="flex justify-between items-end mb-8">
        <div className="relative">
          <p className="text-sm text-gray-500 mb-1">Sort by</p>
          <button
            className="w-[250px] h-[40px] border border-gray-300 flex items-center justify-between px-4"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <span>{sortBy}</span>
            <Icon id="arrow-right" size={16} className="transform rotate-90" />
          </button>
          {showSortDropdown && (
            <div className="absolute w-full mt-1 border border-gray-300 bg-white z-10">
              {(["Newest", "Alphabetically", "Cheapest"] as SortOption[]).map(
                (option) => (
                  <button
                    key={option}
                    className={`w-full text-left p-3 hover:bg-gray-100 ${
                      sortBy === option ? "font-medium" : ""
                    }`}
                    onClick={() => handleSortChange(option)}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <p className="text-sm text-gray-500 mb-1">Items on page</p>
          <button
            className="w-[176px] h-[40px] border border-gray-300 flex items-center justify-between px-4"
            onClick={() => setShowItemsDropdown(!showItemsDropdown)}
          >
            <span>{itemsPerPage}</span>
            <Icon id="arrow-right" size={16} className="transform rotate-90" />
          </button>
          {showItemsDropdown && (
            <div className="absolute w-full mt-1 border border-gray-300 bg-white z-10">
              {[8, 16, 32, 64].map((option) => (
                <button
                  key={option}
                  className={`w-full text-left p-3 hover:bg-gray-100 ${
                    itemsPerPage === option ? "font-medium" : ""
                  }`}
                  onClick={() => handleItemsPerPageChange(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-between -mx-2">
        {currentPhones.map((phone, index) => (
          <div
            key={phone.id}
            className="px-2 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <ProductCard
              title={phone.title}
              subtitle={phone.subtitle}
              price={phone.price}
              oldPrice={
                index % 3 === 0 ? Math.round(phone.price * 1.2) : undefined
              }
              image={phone.image}
              specs={phone.specs}
              onAddToCart={() => console.log(`Add to cart: ${phone.title}`)}
              onAddToFavorites={() =>
                console.log(`Add to favorites: ${phone.title}`)
              }
              initialFavorite={index % 7 === 2}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex items-center border border-gray-300">
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center border-r border-gray-300 disabled:opacity-50"
            aria-label="Previous page"
          >
            ‹
          </button>

          {totalPages <= 7 ? (
            // Show all page numbers if 7 or fewer
            Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-8 h-8 flex items-center justify-center ${
                  currentPage === index + 1 ? "bg-black text-white" : ""
                }`}
              >
                {index + 1}
              </button>
            ))
          ) : (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className={`w-8 h-8 flex items-center justify-center ${
                  currentPage === 1 ? "bg-black text-white" : ""
                }`}
              >
                1
              </button>

              {currentPage > 3 && (
                <span className="w-8 h-8 flex items-center justify-center">
                  ...
                </span>
              )}

              {currentPage > 2 && currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  {currentPage - 1}
                </button>
              )}

              {currentPage !== 1 && currentPage !== totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage)}
                  className="w-8 h-8 flex items-center justify-center bg-black text-white"
                >
                  {currentPage}
                </button>
              )}

              {currentPage < totalPages - 1 && currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  {currentPage + 1}
                </button>
              )}

              {currentPage < totalPages - 2 && (
                <span className="w-8 h-8 flex items-center justify-center">
                  ...
                </span>
              )}

              <button
                onClick={() => handlePageChange(totalPages)}
                className={`w-8 h-8 flex items-center justify-center ${
                  currentPage === totalPages ? "bg-black text-white" : ""
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center border-l border-gray-300 disabled:opacity-50"
            aria-label="Next page"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};
