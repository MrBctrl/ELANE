import { useState } from "react";

export default function Tabs({ tabs, initial = 0 }) {
  const [active, setActive] = useState(initial);

  return (
    <div>
      <div className="flex gap-40 border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`pb-16 text-caption uppercase tracking-[0.08em] border-b -mb-px transition-colors ${
              active === i
                ? "text-charcoal border-charcoal"
                : "text-muted border-transparent hover:text-charcoal"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-32">{tabs[active].content}</div>
    </div>
  );
}
