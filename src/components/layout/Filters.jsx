import { Checkbox } from "../ui/Input";

const FILTER_GROUPS = [
  { title: "Gender", options: ["Women", "Men", "Unisex", "Beauty"] },
  { title: "Category", options: ["Outerwear", "Tops", "Trousers", "Dresses", "Footwear", "Accessories", "Wigs"] },
  { title: "Colour", options: ["Charcoal", "Ivory", "Champagne Gold", "Olive", "Burgundy", "Jet Black", "Champagne Blonde", "Charcoal Brown"] },
  { title: "Size", options: ["XS", "S", "M", "L", "XL", "10\"", "12\"", "14\"", "16\"", "18\"", "20\"", "22\"", "24\"", "26\""] },
  { title: "Occasion", options: ["Everyday", "Office", "Evening", "Wedding"] },
];

export default function Filters({ selected = {}, onToggle, maxPrice, onMaxPriceChange, onClearAll }) {
  const activeCount = Object.values(selected).reduce((sum, arr) => sum + (arr?.length || 0), 0);

  return (
    <aside className="w-full lg:w-[260px] shrink-0">
      <div className="flex items-center justify-between mb-32">
        <h6 className="text-tiny uppercase tracking-[0.12em] text-charcoal">
          Filter{activeCount > 0 ? ` (${activeCount})` : ""}
        </h6>
        <button onClick={onClearAll} className="text-tiny text-muted hover:text-charcoal underline underline-offset-4">
          Clear all
        </button>
      </div>

      <div className="mb-32">
        <p className="text-tiny uppercase tracking-[0.1em] text-muted mb-16">Price</p>
        <input
          type="range"
          min="0"
          max="300000"
          step="1000"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-gold"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-tiny text-muted mt-8">
          <span>₦0</span>
          <span>₦{maxPrice.toLocaleString()}</span>
        </div>
      </div>

      {FILTER_GROUPS.map((group) => (
        <div key={group.title} className="mb-32">
          <p className="text-tiny uppercase tracking-[0.1em] text-muted mb-16">{group.title}</p>
          <div className="flex flex-col gap-12">
            {group.options.map((opt) => (
              <Checkbox
                key={opt}
                label={opt}
                checked={!!selected[group.title]?.includes(opt)}
                onChange={() => onToggle(group.title, opt)}
              />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
