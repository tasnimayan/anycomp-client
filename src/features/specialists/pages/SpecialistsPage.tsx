import { Pagination, SearchInput } from "@/components/shared";
import { useMemo, useState } from "react";
import { useTableSelection } from "../../../hooks/useTableSelection";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { ServiceActions, ServiceTable, ServiceTabs } from "../components";
import { mockServices } from "../services/specialists.api";
import { type ServiceTabFilter } from "../types";

const ITEMS_PER_PAGE = 6;

export function SpecialistsPage() {
  const [activeTab, setActiveTab] = useState<ServiceTabFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { selectedIds, isSelected, toggle, toggleAll, clear } =
    useTableSelection<string>();
  const [currentPage, setCurrentPage] = useState(1);

  // Filter services based on tab and search
  const filteredServices = useMemo(() => {
    let services = mockServices;

    // Filter by tab
    if (activeTab === "published") {
      services = services.filter((s) => s.publishStatus === "published");
    } else if (activeTab === "drafts") {
      services = services.filter((s) => s.publishStatus === "not-published");
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      services = services.filter((s) => s.title.toLowerCase().includes(query));
    }

    return services;
  }, [activeTab, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredServices.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredServices, currentPage]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      toggleAll(paginatedServices.map((s) => s.id));
    } else {
      clear();
    }
  };

  // Reset page when filters change
  const handleTabChange = (tab: ServiceTabFilter) => {
    setActiveTab(tab);
    setCurrentPage(1);
    clear();
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <DashboardLayout breadcrumb={["Dashboard"]} title="Services">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">Specialists</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Create and publish your services for Client's & Companies
        </p>
      </div>

      {/* Tabs */}
      <ServiceTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Toolbar */}
      <div className="flex items-center justify-between mt-6 mb-4">
        <SearchInput
          placeholder="Search Services"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-64"
        />
        <ServiceActions
          onCreateClick={() => console.log("Create clicked")}
          onExportClick={() => console.log("Export clicked")}
        />
      </div>

      {/* Table */}
      <ServiceTable
        services={paginatedServices}
        selectedIds={selectedIds}
        onSelectToggle={toggle}
        isSelected={isSelected}
        onSelectAll={handleSelectAll}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className="mt-6"
        />
      )}
    </DashboardLayout>
  );
}
