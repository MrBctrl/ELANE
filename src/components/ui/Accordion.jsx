import { useState } from "react";
import { Plus } from "lucide-react";

export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between py-24 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-heading text-body-lg text-heading">{item.title}</span>
              <Plus
                size={18}
                strokeWidth={1.5}
                className={`text-muted transition-transform duration-300 shrink-0 ml-24 ${isOpen ? "rotate-45" : ""}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] pb-24" : "grid-rows-[0fr]"
              }`}
              style={{ display: "grid" }}
            >
              <div className="overflow-hidden">
                <p className="text-body-sm text-muted max-w-[60ch]">{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
