import { useMemo, useState } from "react";
import type { FilterState, Service } from "../types";

export const useServiceFilters = (services: Service[]) => {
  const [filters, setFilters] = useState<FilterState>({
    price: "all",
    sort: "recommended",
  });

  const filteredServices = useMemo(() => {
    let result = [...services];

    // Apply price filter
    switch (filters.price) {
      case "under-1000":
        result = result.filter((s) => s.price < 1000);
        break;
      case "1000-2000":
        result = result.filter((s) => s.price >= 1000 && s.price <= 2000);
        break;
      case "above-2000":
        result = result.filter((s) => s.price > 2000);
        break;
      default:
        break;
    }

    // Apply sorting
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [services, filters]);

  const setPriceFilter = (value: string) => {
    setFilters((prev) => ({ ...prev, price: value }));
  };

  const setSortFilter = (value: string) => {
    setFilters((prev) => ({ ...prev, sort: value }));
  };

  return {
    filters,
    filteredServices,
    setPriceFilter,
    setSortFilter,
  };
};
