import React, { useState, useMemo, useEffect } from "react";
import { Typography } from "@ui/Typography";
import { SortingDropdown } from "@ui/SortingDropdown";
import { ItemsPerPageDropdown } from "@ui/ItemsPerPageDropdown";
import { Pagination } from "@ui/Pagination";
import { PhoneGrid } from "./components/PhoneGrid";
import { SortOption, Phone } from "./types";
import { fetchPhones } from "./utils/phoneData";
import { Link } from "react-router-dom";

export const PhonesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortBy, setSortBy] = useState<SortOption>("Newest");
  const [phones, setPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhones = async () => {
      try {
        setLoading(true);
        const phonesData = await fetchPhones();
        setPhones(phonesData);
      } catch (error) {
        console.error("Error loading phones:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPhones();
  }, []);

  const sortedPhones = useMemo(() => {
    if (!phones.length) return [];

    const phonesToSort = [...phones];

    switch (sortBy) {
      case "Newest":
        return phonesToSort; // Keep original order for newest
      case "Alphabetically":
        return [...phonesToSort].sort((a, b) => a.title.localeCompare(b.title));
      case "Cheapest":
        return [...phonesToSort].sort((a, b) => a.price - b.price);
      default:
        return phonesToSort;
    }
  }, [sortBy, phones]);

  const totalPages = Math.ceil(sortedPhones.length / itemsPerPage);

  const indexOfLastPhone = currentPage * itemsPerPage;
  const indexOfFirstPhone = indexOfLastPhone - itemsPerPage;
  const currentPhones = sortedPhones.slice(indexOfFirstPhone, indexOfLastPhone);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (option: string) => {
    setSortBy(option as SortOption);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (option: number) => {
    setItemsPerPage(option);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center text-xs text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-1">›</span>
        <span className="text-black">Mobile phones</span>
      </div>

      <div className="mb-8">
        <Typography variant="h1" as="h1" className="mb-1">
          Mobile phones
        </Typography>
        <p className="text-sm text-gray-500">
          {loading ? "Loading..." : `${sortedPhones.length} models`}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading phones...</div>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 items-end mb-8">
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
        </>
      )}
    </div>
  );
};
