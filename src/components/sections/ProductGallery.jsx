import { useState } from "react";

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-16">
      <div className="flex sm:flex-col gap-12 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={active === i}
            className={`w-64 h-80 sm:w-80 sm:h-[100px] rounded-card overflow-hidden shrink-0 border transition-colors ${
              active === i ? "border-charcoal" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <div className="flex-1 rounded-img overflow-hidden bg-beige flex items-center justify-center max-h-[75vh]">
        <img src={images[active]} alt="Product" className="w-full h-auto max-h-[75vh] object-contain" />
      </div>
    </div>
  );
}
