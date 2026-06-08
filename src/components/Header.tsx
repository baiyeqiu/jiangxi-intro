import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mountain, UtensilsCrossed, Landmark, Package } from "lucide-react";

const navItems = [
  { path: "/", label: "首页" },
  { path: "/scenery", label: "风光览胜", icon: Mountain },
  { path: "/cuisine", label: "赣味美食", icon: UtensilsCrossed },
  { path: "/culture", label: "人文底蕴", icon: Landmark },
  { path: "/specialties", label: "地方特产", icon: Package },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-jiangxi-green/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-jiangxi-green to-jiangxi-green-light flex items-center justify-center shadow-lg shadow-jiangxi-green/20 group-hover:shadow-xl transition-shadow">
              <span className="text-white font-display font-bold text-lg">赣</span>
            </div>
            <div className="hidden sm:block">
              <h1
                className={`font-display text-lg font-bold leading-tight transition-colors duration-300 ${
                  isScrolled ? "text-jiangxi-green-dark" : "text-white"
                }`}
              >
                赣鄱大地
              </h1>
              <p
                className={`text-xs transition-colors duration-300 ${
                  isScrolled ? "text-jiangxi-ink-light" : "text-white/80"
                }`}
              >
                发现江西之美
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-jiangxi-green text-white shadow-md shadow-jiangxi-green/25"
                      : isScrolled
                      ? "text-jiangxi-ink hover:bg-jiangxi-green/5 hover:text-jiangxi-green"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-jiangxi-ink hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="菜单"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-black/5 bg-white/95 backdrop-blur-md mt-2 rounded-b-2xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-jiangxi-green/10 text-jiangxi-green"
                      : "text-jiangxi-ink hover:bg-gray-50"
                  }`}
                >
                  {Icon && <Icon size={20} />}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
