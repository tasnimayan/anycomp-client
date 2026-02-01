import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterButtonProps {
  label: string;
  options: FilterOption[];
  value?: string;
  onChange?: (value: string) => void;
}

const FilterButton = ({
  label,
  options,
  value,
  onChange,
}: FilterButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {label}
        <ChevronDown
          className={cn(
            "size-4 transition-transform",
            isOpen ? "rotate-180" : "",
          )}
        />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <ul
            role="listbox"
            className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-md shadow-lg z-20 py-1"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-secondary transition-colors ${
                  value === option.value ? "bg-secondary font-medium" : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

interface FilterBarProps {
  onPriceChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
  priceValue?: string;
  sortValue?: string;
}

const priceOptions: FilterOption[] = [
  { label: "All Prices", value: "all" },
  { label: "Under RM 1,000", value: "under-1000" },
  { label: "RM 1,000 - RM 2,000", value: "1000-2000" },
  { label: "Above RM 2,000", value: "above-2000" },
];

const sortOptions: FilterOption[] = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating", value: "rating" },
];

export const FilterBar = ({
  onPriceChange,
  onSortChange,
  priceValue,
  sortValue,
}: FilterBarProps) => {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <FilterButton
        label="Price"
        options={priceOptions}
        value={priceValue}
        onChange={onPriceChange}
      />
      <FilterButton
        label="Sort by"
        options={sortOptions}
        value={sortValue}
        onChange={onSortChange}
      />
    </div>
  );
};
