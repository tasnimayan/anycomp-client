import { Breadcrumb, FilterBar, PageHeader, ServiceGrid } from "../components";
import { useServiceFilters } from "../hooks/useServiceFilters";
import { sampleServices } from "../services/registerCompany.api";

const breadcrumbItems = [
  { label: "Home", href: "/", isHome: true },
  { label: "Specialists", href: "/specialists" },
  { label: "Register a New Company" },
];

export const RegisterCompanyPage = () => {
  const { filters, filteredServices, setPriceFilter, setSortFilter } =
    useServiceFilters(sampleServices);

  return (
    <>
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Page Header */}
      <PageHeader
        title="Register a New Company"
        subtitle="Get Your Company Registered with a Trusted Specialists"
      />

      {/* Filter Bar */}
      <div className="mb-8">
        <FilterBar
          priceValue={filters.price}
          sortValue={filters.sort}
          onPriceChange={setPriceFilter}
          onSortChange={setSortFilter}
        />
      </div>

      {/* Service Grid */}
      <ServiceGrid services={filteredServices} />
    </>
  );
};
