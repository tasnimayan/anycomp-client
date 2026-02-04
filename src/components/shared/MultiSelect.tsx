import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface SelectOption {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface MultiSelectProps {
  options: SelectOption[];
  value?: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select items...",
  disabled = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Handle option selection
  const handleSelect = (optionId: string) => {
    const newValue = value.includes(optionId)
      ? value.filter((id) => id !== optionId)
      : [...value, optionId];
    onChange?.(newValue);
  };

  // Handle chip removal
  const handleRemoveChip = (optionId: string) => {
    const newValue = value.filter((id) => id !== optionId);
    onChange?.(newValue);
  };

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Get selected options
  const selectedOptions = options.filter((opt) => value.includes(opt.id));

  return (
    <div ref={containerRef} className="w-full relative">
      {/* Input Field with Chips */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full px-4 py-3 bg-transparent border border-border rounded text-sm focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center gap-2 flex-wrap text-left hover:border-gray-400 transition-colors"
      >
        {selectedOptions.length === 0 ? (
          <span className="text-gray-500">{placeholder}</span>
        ) : (
          <>
            {selectedOptions.map((option) => (
              <div
                key={option.id}
                className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 px-2.5 py-1 rounded-full text-xs font-medium"
              >
                <span>{option.label}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveChip(option.id);
                  }}
                  className="text-blue-600 hover:text-blue-800 transition-colors shrink-0"
                  aria-label={`Remove ${option.label}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </>
        )}
      </button>

      {/* Popover with Options List */}
      {isOpen && !disabled && (
        <div
          ref={popoverRef}
          className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded shadow-lg"
        >
          <div className="max-h-80 overflow-y-auto">
            <div className="space-y-3 p-3">
              {options.length > 0 ? (
                options.map((option) => {
                  const isSelected = value.includes(option.id);
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      className={`w-full text-left px-4 py-3 rounded-md border transition-all flex items-start gap-3 ${
                        isSelected
                          ? "bg-blue-50 border-blue-200"
                          : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {/* Icon */}
                      {option.icon && (
                        <div className="shrink-0 w-5 h-5 mt-0.5 text-gray-700">
                          {option.icon}
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium ${
                            isSelected ? "text-blue-900" : "text-gray-900"
                          }`}
                        >
                          {option.label}
                        </p>
                        {option.description && (
                          <p
                            className={`text-xs mt-0.5 ${
                              isSelected ? "text-blue-700" : "text-gray-600"
                            }`}
                          >
                            {option.description}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                  No items available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
