import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Filters from "../components/layout/Filters";
import Breadcrumb from "../components/ui/Breadcrumb";
import Pagination from "../components/ui/Pagination";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import { Select } from "../components/ui/Input";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/cards/ProductCard";
import { products } from "../data/products";
import usePageTitle from "../hooks/usePageTitle";

const MAX_PRICE = 300000;
const PAGE_SIZE = 6;

/**
 * Ref: §1.9 — "Each collection should feel like a magazine, not a catalogue
 * grid: large photography, minimal text, editorial layout."
 * Ref: §1.13 — mobile is the primary experience, so filters live in a
 * modal on small screens rather than pushing the grid down the page.
 */
export default function Collection() {
  usePageTitle("New Collection");
  const [searchParams] = useSearchParams();
  const genderFromNav = searchParams.get("gender");
  const searchQuery = searchParams.get("q");

  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState("Newest");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [selected, setSelected] = useState(() =>
    genderFromNav ? { Gender: [genderFromNav] } : {}
  );

  const toggleFilter = (group, option) => {
    setSelected((prev) => {
      const current = prev[group] || [];
      const next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      return { ...prev, [group]: next };
    });
    setPage(1);
  };

  const clearAll = () => {
    setSelected({});
    setMaxPrice(MAX_PRICE);
    setPage(1);
  };

  const priceValue = (p) => Number(String(p.price).replace(/[^\d]/g, ""));

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (priceValue(p) > maxPrice) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      for (const [group, options] of Object.entries(selected)) {
        if (!options?.length) continue;
        if (group === "Gender" && !options.includes(p.gender)) return false;
        if (group === "Category" && !options.includes(p.type)) return false;
        if (group === "Colour" && !options.includes(p.colour)) return false;
        if (group === "Occasion" && !options.includes(p.occasion)) return false;
        if (group === "Size" && !options.some((s) => p.sizes?.includes(s))) return false;
      }
      return true;
    });
  }, [maxPrice, selected, searchQuery]);

  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    arr.sort((a, b) => {
      if (sort === "Price: Low to High") return priceValue(a) - priceValue(b);
      if (sort === "Price: High to Low") return priceValue(b) - priceValue(a);
      return 0; // Newest / Most Popular — original catalogue order (no date/popularity field yet)
    });
    return arr;
  }, [filteredProducts, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageProducts = sortedProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const gridTopRef = useRef(null);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heading = genderFromNav && genderFromNav !== "Unisex" ? genderFromNav : "New Collection";
  const eyebrow = genderFromNav && genderFromNav !== "Unisex" ? `${genderFromNav} — Autumn Line` : "Autumn Line";

  return (
    <div className="bg-ivory">
      <Navigation transparentOnTop={false} />

      <div className="content-container pt-[112px] sm:pt-[152px] pb-64">
        <Breadcrumb items={["Home", genderFromNav || "Collection", "New Collection"]} />
        <div className="flex items-end justify-between mt-24">
          <div>
            <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">
              {eyebrow}
            </p>
            <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 sm:text-display-sm text-heading max-w-[16ch]">
              {searchQuery ? `Results for "${searchQuery}"` : heading}
            </h1>
          </div>
          <p className="hidden sm:block text-body-sm text-muted">{sortedProducts.length} pieces</p>
        </div>
        <p className="text-body-md text-muted mt-24 max-w-[60ch]">
          Tailoring for the version of you that walks in already certain.
          {" "}{sortedProducts.length} of {products.length} pieces shown.
        </p>
      </div>

      <div className="content-container pb-120">
        <div className="flex flex-col lg:flex-row gap-64">
          <div className="hidden lg:block">
            <Filters
              selected={selected}
              onToggle={toggleFilter}
              maxPrice={maxPrice}
              onMaxPriceChange={(v) => { setMaxPrice(v); setPage(1); }}
              onClearAll={clearAll}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between lg:justify-end gap-16 mb-32">
              <Button
                variant="secondary"
                size="small"
                className="lg:hidden !inline-flex items-center gap-8"
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal size={14} strokeWidth={1.5} />
                Filter
              </Button>
              <Select
                aria-label="Sort by"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                options={["Newest", "Price: Low to High", "Price: High to Low", "Most Popular"]}
                className="!w-auto"
              />
            </div>

            {pageProducts.length > 0 ? (
              <div ref={gridTopRef} className="grid grid-cols-2 lg:grid-cols-3 gap-24 sm:gap-32 scroll-mt-[120px]">
                {pageProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div ref={gridTopRef} className="scroll-mt-[120px] py-80 text-center border border-dashed border-border rounded-card">
                <p className="font-heading text-h5 text-charcoal mb-8">No pieces match those filters</p>
                <p className="text-body-sm text-muted mb-24">Try clearing a filter or widening the price range.</p>
                <Button variant="secondary" size="small" onClick={clearAll}>Clear all filters</Button>
              </div>
            )}

            {totalPages > 1 && <Pagination page={currentPage} total={totalPages} onChange={handlePageChange} />}
          </div>
        </div>
      </div>

      <Modal open={filtersOpen} onClose={() => setFiltersOpen(false)} maxWidth="max-w-[400px]">
        <div className="p-32 pt-56">
          <Filters
            selected={selected}
            onToggle={toggleFilter}
            maxPrice={maxPrice}
            onMaxPriceChange={(v) => { setMaxPrice(v); setPage(1); }}
            onClearAll={clearAll}
          />
          <Button variant="primary" className="w-full mt-16" onClick={() => setFiltersOpen(false)}>
            Show Results ({sortedProducts.length})
          </Button>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
