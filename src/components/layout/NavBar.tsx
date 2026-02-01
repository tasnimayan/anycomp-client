import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { UserActions } from "../shared/UserActions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const defaultNavItems: NavItem[] = [
  { label: "Register a company", href: "/register-company" },
  { label: "Appoint a Company Secretary", href: "/appoint-company-secretary" },
  {
    label: "Company Secretarial Services",
    href: "/company-secretarial-services",
    hasDropdown: true,
  },
  { label: "How Anycomp Works", href: "/how-it-works" },
];

function NavLink({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate?: () => void;
}) {
  return (
    <a
      href={item.href}
      className="flex items-center gap-1 py-2 lg:py-0 text-sm"
      onClick={onNavigate}
      aria-label={item.label}
    >
      {item.label}
      {item.hasDropdown && <ChevronDown className="w-4 h-4 shrink-0" />}
    </a>
  );
}

function NavLinkList({
  items,
  className,
  onNavigate,
}: {
  items: NavItem[];
  className: string;
  onNavigate?: () => void;
}) {
  return (
    <div className={className}>
      {items.map((item) => (
        <NavLink key={item.href} item={item} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  variant: "desktop" | "mobile";
}

function SearchBar({ value, onChange, variant }: SearchBarProps) {
  const isMobile = variant === "mobile";
  return (
    <div className="flex items-center">
      <Input
        placeholder="Search for any services"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search for services"
        className={cn(
          "text-sm",
          isMobile ? "flex-1 px-3 py-2" : "w-48 lg:w-64 px-3 py-1.5",
        )}
      />
      <Button
        type="button"
        variant="default"
        className={cn("rounded-l-none", isMobile ? "px-4 py-2" : "px-3 py-1.5")}
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
}

export function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 shadow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a
            href="/"
            className="text-lg sm:text-xl font-bold tracking-wider shrink-0"
          >
            ANYCOMP
          </a>

          {/* Desktop: nav links */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Main"
          >
            <NavLinkList
              items={defaultNavItems}
              className="flex items-center gap-6 xl:gap-8"
            />
          </nav>

          {/* Desktop: search + actions */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              variant="desktop"
            />
            <UserActions />
          </div>

          {/* Mobile: menu toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-md transition-colors"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden />
            ) : (
              <Menu className="w-6 h-6" aria-hidden />
            )}
          </Button>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`lg:hidden overflow-hidden transition-[height] duration-200 ease-out ${
            mobileMenuOpen ? "h-auto" : "h-0"
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <nav
            className="py-4 border-t border-header-foreground/20"
            aria-label="Main"
          >
            <NavLinkList
              items={defaultNavItems}
              className="flex flex-col gap-1"
              onNavigate={closeMobileMenu}
            />
            <div className="mt-4 pt-4 border-t border-header-foreground/20">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                variant="mobile"
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
