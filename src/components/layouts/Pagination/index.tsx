import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblingCount = 1
): (number | "...")[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + siblingCount * 2;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "...", totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + siblingCount * 2;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    );
    return [1, "...", ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, "...", ...middleRange, "...", totalPages];
  }

  return [];
}

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsPageSizeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="px-3 pt-12 pb-6 font-poppins">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="text-sm text-grey-900 font-medium">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-3 h-9 text-white rounded-md flex items-center justify-center text-sm transition-colors px-3 disabled:border-0 disabled:border-grey-200 disabled:text-grey-400 disabled:bg-grey-200 cursor-pointer disabled:cursor-not-allowed hover:bg-primary-500 hover:text-white font-poppins"
          >
            Prev
          </Button>

          {getPaginationRange(currentPage, totalPages).map((page, idx) =>
            typeof page === "number" ? (
              <button
                key={idx}
                onClick={() => onPageChange?.(page)}
                className={`w-9 h-9 cursor-pointer rounded-md font-poppins flex items-center justify-center text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "border border-primary-500 text-primary-500"
                    : "text-grey-400 hover:bg-grey-100 border-none"
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={idx} className="px-2 text-grey-400">
                ...
              </span>
            )
          )}

          <Button
            variant="default"
            size="sm"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md flex items-center justify-center h-9 ml-3 disabled:border-0 disabled:border-grey-200 text-white disabled:text-grey-400 disabled:bg-grey-200 cursor-pointer disabled:cursor-not-allowed hover:bg-primary-500 hover:text-white font-poppins"
          >
            Next
          </Button>
        </div>

        <div className="flex items-center gap-2 text-grey-400">
          <span className="text-sm text-grey-600">Page Size:</span>
          <div className="relative" ref={containerRef}>
            <button
              onClick={() => setIsPageSizeOpen(!isPageSizeOpen)}
              className="cursor-pointer px-3 py-1 border border-grey-300 rounded text-sm bg-white flex items-center gap-1 hover:border-grey-400 transition-colors"
            >
              {pageSize}
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  isPageSizeOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isPageSizeOpen && (
              <div className="absolute right-0 bottom-8.5 z-10 mt-1 bg-white border border-grey-300 rounded shadow-lg w-full">
                {pageSizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      onPageSizeChange?.(size);
                      setIsPageSizeOpen(false);
                    }}
                    className="cursor-pointer block w-full px-3 py-1 text-sm text-left hover:bg-grey-50 first:rounded-t last:rounded-b"
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};