import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { IconButton } from "../ui/Button";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

/**
 * Ref: Master Reference Part 2 §2.13, Part 4 §4.3
 * Sticky. Transparent over hero → solid ivory on scroll. Smooth transition.
 * Primary nav: Logo · New Collection · Women · Men · Beauty · Journal · About
 * Universal action layer: Search · Wishlist · Bag · Account (Part 4 §4.4)
 * Mobile is the primary experience per §1.13 — mobile menu carries the full action layer too.
 */

const LINKS = [
  { label: "New Collection", to: "/collection" },
  { label: "Women", to: "/collection?gender=Women" },
  { label: "Men", to: "/collection?gender=Men" },
  { label: "Beauty", to: "/collection" },
  { label: "Journal", to: "/journal" },
  { label: "About", to: "/about" },
];

function Badge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute top-2 right-2 min-w-[16px] h-16 px-4 rounded-full bg-gold text-charcoal text-[10px] font-medium flex items-center justify-center">
      {count}
    </span>
  );
}

export default function Navigation({ transparentOnTop = true }) {
  const [scrolled, setScrolled] = useState(!transparentOnTop);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const submitSearch = (e) => {
    e.preventDefault();
    const q = searchValue.trim();
    setSearchOpen(false);
    setSearchValue("");
    navigate(q ? `/collection?q=${encodeURIComponent(q)}` : "/collection");
  };

  useEffect(() => {
    if (!transparentOnTop) return;
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOnTop]);

  useEffect(() => {
    if (!mobileOpen && !searchOpen) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      setSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  const solid = scrolled || mobileOpen;
  const textColor = solid ? "text-charcoal" : "text-warm-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          solid ? "bg-ivory/95 backdrop-blur-sm shadow-nav" : "bg-transparent"
        }`}
      >
        <div className="content-container">
          <div className="flex items-center justify-between h-[72px] sm:h-[88px]">
            <Link
              to="/"
              className={`font-display text-h5 tracking-[0.22em] ${textColor}`}
            >
              ÉLANE
            </Link>

            <nav className="hidden lg:flex items-center gap-40">
              {LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-caption uppercase tracking-[0.08em] ${textColor} opacity-90 hover:opacity-100 border-b border-transparent hover:border-current transition-all duration-300 pb-4`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <IconButton
                icon={Search}
                label="Search"
                onClick={() => setSearchOpen(true)}
                className={textColor}
              />
              <span className="relative hidden sm:inline-flex">
                <IconButton as={Link} to="/wishlist" icon={Heart} label="Wishlist" className={textColor} />
                <Badge count={wishlistCount} />
              </span>
              <span className="relative">
                <IconButton as={Link} to="/cart" icon={ShoppingBag} label="Shopping bag" className={textColor} />
                <Badge count={cartCount} />
              </span>
              <IconButton as={Link} to="/account" icon={User} label="Account" className={`hidden sm:inline-flex ${textColor}`} />
              <button
                aria-label="Menu"
                onClick={() => setMobileOpen(true)}
                className={`lg:hidden inline-flex items-center justify-center w-40 h-40 ${textColor}`}
              >
                <Menu size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-ivory animate-in fade-in duration-300 overflow-y-auto">
          <div className="content-container flex items-center justify-between h-[72px]">
            <span className="font-display text-h5 tracking-[0.22em] text-charcoal">ÉLANE</span>
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <X size={22} strokeWidth={1.5} className="text-charcoal" />
            </button>
          </div>
          <nav className="content-container grid grid-cols-1 sm:grid-cols-2 gap-x-48 gap-y-28 mt-24 sm:max-w-[520px]">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="font-heading text-h4 text-charcoal"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="content-container flex items-center gap-24 mt-48 pt-32 border-t border-border sm:max-w-[520px]">
            <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="flex items-center gap-8 text-caption text-charcoal">
              <Heart size={18} strokeWidth={1.5} /> Wishlist{wishlistCount ? ` (${wishlistCount})` : ""}
            </Link>
            <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-8 text-caption text-charcoal">
              <ShoppingBag size={18} strokeWidth={1.5} /> Bag{cartCount ? ` (${cartCount})` : ""}
            </Link>
            <Link to="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-8 text-caption text-charcoal">
              <User size={18} strokeWidth={1.5} /> Account
            </Link>
          </div>
        </div>
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-ivory/98 backdrop-blur-sm flex flex-col items-center justify-center px-24">
          <button
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
            className="absolute top-24 right-24 sm:top-32 sm:right-32"
          >
            <X size={22} strokeWidth={1.5} className="text-charcoal" />
          </button>
          <form onSubmit={submitSearch} className="w-full max-w-[640px]">
            <input
              autoFocus
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products, collections, journal…"
              className="w-full bg-transparent border-b border-charcoal/30 pb-16 font-display text-[28px] sm:text-h3 text-charcoal placeholder:text-muted focus:outline-none"
            />
          </form>
        </div>
      )}
    </>
  );
}
