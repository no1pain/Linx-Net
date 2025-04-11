import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 7,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center border border-gray-300">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center border-r border-gray-300 disabled:opacity-50"
          aria-label="Previous page"
        >
          ‹
        </button>

        {totalPages <= maxVisiblePages ? (
          Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
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
              onClick={() => onPageChange(1)}
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
                onClick={() => onPageChange(currentPage - 1)}
                className="w-8 h-8 flex items-center justify-center"
              >
                {currentPage - 1}
              </button>
            )}

            {currentPage !== 1 && currentPage !== totalPages && (
              <button
                onClick={() => onPageChange(currentPage)}
                className="w-8 h-8 flex items-center justify-center bg-black text-white"
              >
                {currentPage}
              </button>
            )}

            {currentPage < totalPages - 1 && currentPage > 1 && (
              <button
                onClick={() => onPageChange(currentPage + 1)}
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
              onClick={() => onPageChange(totalPages)}
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
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center border-l border-gray-300 disabled:opacity-50"
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
};
