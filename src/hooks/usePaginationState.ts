import { useState } from "react";

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onLimitChange: (items: number) => void;
}

export const usePaginationState = (initialPage: number, initialLimit: number): PaginationState => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onLimitChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return {
    currentPage,
    itemsPerPage,
    onPageChange,
    onLimitChange,
  };
};
