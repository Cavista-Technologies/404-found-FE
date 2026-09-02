import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconRight, Search } from "../icons";
import { ChevronDown, MoveDown, MoveUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export type Column<T> = {
  header: string | ReactNode;
  accessor: keyof T | ((row: T, index: number) => ReactNode);
  sortable?: boolean;
  hideInMobile?: boolean;
  width?: string;
  className?: string;
  headerClassName?: string;
  sortKey?: string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string | ReactNode;
  emptySubMessage?: string | ReactNode;
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  onRowClick?: (row: T, index: number) => void;
  loading?: boolean;
  loadingRows?: number;
  totalCount?: number;
  pageCount?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (page: number) => void;
  onSortChange?: (field: string, order: 1 | 2 | undefined) => void;
  showPagination?: boolean;
};

export function TableComponent<T>({
  data,
  columns,
  emptyMessage = "No data yet",
  emptySubMessage = "No data to show yet",
  className = "",
  headerClassName = "",
  rowClassName = "",
  onRowClick,
  loading = false,
  loadingRows = 5,
  currentPage = 1,
  pageSize = 10,
  totalCount = data.length,
  pageCount,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  showPagination,
}: TableProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);
  const pageSizeOptions = [5, 10, 20, 30, 50, 100, 200];

  const totalPages = pageCount ? pageCount : Math.ceil(totalCount / pageSize);
  const paginatedData = data;

  // Notify parent of the sort changes
  useEffect(() => {
    if (!onSortChange) return;

    const order: 1 | 2 | undefined =
      sortField === null ? undefined : sortOrder === "asc" ? 1 : 2;
    onSortChange(sortField ?? "", order);
  }, [sortField, sortOrder]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsPageSizeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <tbody>
      {Array.from({ length: loadingRows }).map((_, index) => (
        <tr key={index} className="border-b border-grey-100 w-full">
          {columns.map((_, colIndex) => (
            <td key={colIndex} className="py-6 px-4 w-full">
              <div className="h-4 bg-grey-200 rounded animate-pulse w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="h-125 w-full space-y-4 font-poppins flex items-center justify-center flex-col">
      <div className="lg:size-18 size-10 flex justify-center items-center bg-grey-50 rounded-full">
        <Search className="lg:size-10.5 size-4.5 text-grey-500" />
      </div>
      <div className="space-y-2 flex flex-col justify-center items-center">
        <h4 className="lg:text-xl text-lg text-grey-900 font-medium">
          {emptyMessage}
        </h4>
        <p className="text-sm text-grey-500">{emptySubMessage}</p>
      </div>
    </div>
  );

  // Get row class name
  const getRowClassName = (row: T, index: number) => {
    const baseClasses = "border-b border-grey-200 h-[56px]";
    const hoverClasses = onRowClick ? "hover:bg-grey-50 cursor-pointer" : "";

    if (typeof rowClassName === "function") {
      return `${baseClasses} ${hoverClasses} ${rowClassName(row, index)}`;
    }

    return `${baseClasses} ${hoverClasses} ${rowClassName}`;
  };

  const getPaginationRange = (
    current: number,
    total: number,
  ): (number | "...")[] => {
    const delta = 1;
    const range: (number | "...")[] = [];
    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);

    if (left > 2) {
      range.push("...");
    }

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) {
      range.push("...");
    }

    if (total > 1) {
      range.push(total);
    }

    return range;
  };

  const handleSortChange = (col: Column<T>) => {
    const field =
      col.sortKey ?? (typeof col.accessor === "string" ? col.accessor : null);
    if (!field) return;

    if (sortField !== field) {
      setSortField(field);
      setSortOrder("asc");
      return;
    }

    if (sortOrder === "asc") {
      setSortOrder("desc");
      return;
    }

    setSortField(null);
    setSortOrder("asc");
  };

  const getSortedData = () => {
    if (!sortField) return paginatedData;

    return [...paginatedData].sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const aVal = (a as any)[sortField];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bVal = (b as any)[sortField];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (aStr < bStr) return sortOrder === "asc" ? -1 : 1;
      if (aStr > bStr) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortedData = onSortChange ? paginatedData : getSortedData();

  return (
    <>
      <div>
        {loading ? (
          <div className="min-h-[80vh]">
            <table className="w-full table-fixed">
              <thead>
                <tr
                  className={`text-left text-sm bg-grey-100 ${headerClassName}`}
                >
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className={cn(
                        "py-6 px-3  font-poppins font-medium text-base text-left text-grey-500",
                        col.width,
                        col.headerClassName,
                        index === 0 && "rounded-l-lg",
                        index === columns.length - 1 && "rounded-r-lg",
                        col.hideInMobile && "hidden lg:table-cell",
                      )}
                      style={{ width: col.width }}
                    ></th>
                  ))}
                </tr>
              </thead>
              <LoadingSkeleton />
            </table>
          </div>
        ) : data.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            className={`min-h-[50vh] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none ${className}`}
          >
            <table className="w-full">
              <thead>
                <tr
                  className={`text-left text-sm bg-grey-100 ${headerClassName}`}
                >
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className={cn(
                        "py-3 px-3  font-poppins font-medium text-base text-left text-grey-500",
                        col.width,
                        col.headerClassName,
                        index === 0 && "rounded-l-lg",
                        index === columns.length - 1 && "rounded-r-lg",
                        col.hideInMobile && "hidden lg:table-cell",
                      )}
                      style={{ width: col.width }}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-between",
                          col.sortable && "cursor-pointer",
                        )}
                      >
                        {col.header}
                        {col.sortable && (
                          <button
                            className=" text-grey-400 hover:text-grey-600 cursor-pointer"
                            onClick={() => {
                              handleSortChange(col);
                            }}
                          >
                            {sortField ===
                            (col.sortKey ??
                              (typeof col.accessor === "string"
                                ? col.accessor
                                : null)) ? (
                              sortOrder === "asc" ? (
                                <MoveUp className="size-4" />
                              ) : (
                                <MoveDown className="size-4" />
                              )
                            ) : (
                              <IconRight />
                            )}
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {sortedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={getRowClassName(row, rowIndex)}
                    onClick={() => onRowClick?.(row, rowIndex)}
                  >
                    {columns.map((col, colIndex) => {
                      const cellContent =
                        typeof col.accessor === "function"
                          ? col.accessor(row, rowIndex)
                          : (row[col.accessor] as ReactNode);

                      return (
                        <td
                          key={colIndex}
                          className={cn(
                            "py-3 px-4 font-poppins text-grey-500 text-sm",
                            col.className,
                            col.hideInMobile && "hidden lg:table-cell",
                          )}
                          style={{ width: col.width }}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showPagination && sortedData.length > 0 && data.length > 0 && (
          <div className="px-3 pt-12 pb-6 font-poppins">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Page Info */}
              <div className="text-sm text-grey-900 font-medium">
                Page {currentPage} of {totalPages}
              </div>

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onPageChange?.(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`mr-3 h-9 text-white rounded-md flex items-center justify-center text-sm transition-colors px-3  disabled:border-0 disabled:border-grey-200 disabled:text-grey-400 disabled:bg-grey-200 cursor-pointer disabled:cursor-not-allowed hover:bg-primary-500 hover:text-white font-poppins`}
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
                  ),
                )}

                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onPageChange?.(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`rounded-md flex items-center justify-center h-9 ml-3 disabled:border-0 disabled:border-grey-200 text-white disabled:text-grey-400 disabled:bg-grey-200 cursor-pointer disabled:cursor-not-allowed hover:bg-primary-500 hover:text-white font-poppins`}
                >
                  Next
                </Button>
              </div>

              {/* Go to Page Dropdown */}
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
        )}
      </div>
    </>
  );
}