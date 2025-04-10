import React, { useState, useMemo } from "react";
import { Typography } from "@ui/Typography";
import { SortingDropdown } from "./components/SortingDropdown";
import { ItemsPerPageDropdown } from "./components/ItemsPerPageDropdown";
import { PhoneGrid } from "./components/PhoneGrid";
import { Pagination } from "./components/Pagination";
import { SortOption } from "./types";
import { allPhones } from "./utils/phoneData";

export const PhonesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortBy, setSortBy] = useState<SortOption>("Newest");

  const sortedPhones = useMemo(() => {
    const phones = [...allPhones];

    switch (sortBy) {
      case "Newest":
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
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (option: number) => {
    setItemsPerPage(option);
    setCurrentPage(1);
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
        <SortingDropdown value={sortBy} onChange={handleSortChange} />
        <ItemsPerPageDropdown
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        />
      </div>

      <PhoneGrid phones={currentPhones} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
