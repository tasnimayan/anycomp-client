import { Bell, ChevronDown, Mail, Menu, Search, X } from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface HeaderProps {
  navItems?: NavItem[];
  userAvatar?: string;
}

const defaultNavItems: NavItem[] = [
  { label: "Register a company", href: "/register" },
  { label: "Appoint a Company Secretary", href: "/appoint" },
  { label: "Company Secretarial Services", href: "/services", hasDropdown: true },
  { label: "How Anycomp Works", href: "/how-it-works" },
];

export const NavBar = ({ navItems = defaultNavItems, userAvatar }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-header text-header-foreground">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold tracking-wider">
              ANYCOMP
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link flex items-center gap-1"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </a>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search for any services"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 px-3 py-1.5 text-sm bg-header-foreground/10 border border-header-foreground/20 rounded-l-md text-header-foreground placeholder:text-header-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-r-md transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Action Icons */}
            <button className="p-2 hover:bg-header-foreground/10 rounded-full transition-colors" aria-label="Messages">
              <Mail className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-header-foreground/10 rounded-full transition-colors" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </button>

            {/* User Avatar */}
            <button className="w-8 h-8 rounded-full overflow-hidden border-2 border-header-foreground/30">
              {userAvatar ? (
                <img src={userAvatar} alt="User profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                  U
                </div>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 hover:bg-header-foreground/10 rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-header-foreground/20">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link flex items-center justify-between py-2"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </a>
              ))}
            </div>
            {/* Mobile Search */}
            <div className="flex items-center mt-4">
              <input
                type="text"
                placeholder="Search for any services"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-header-foreground/10 border border-header-foreground/20 rounded-l-md text-header-foreground placeholder:text-header-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-r-md transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
