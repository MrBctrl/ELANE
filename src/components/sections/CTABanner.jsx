import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function CTABanner({ image, eyebrow, title, ctaLabel = "Shop Now", ctaTo = "/collection" }) {
  return (
    <section className="relative section-padding overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-charcoal/45" />
      <div className="relative content-container text-center max-w-[640px] mx-auto">
        {eyebrow && (
          <p className="text-tiny uppercase tracking-[0.14em] text-warm-white/80 mb-16">{eyebrow}</p>
        )}
        <h2 className="font-heading text-h2 text-warm-white">{title}</h2>
        <div className="mt-40">
          <Button
            as={Link}
            to={ctaTo}
            variant="secondary"
            className="!border-warm-white !text-warm-white hover:!bg-warm-white hover:!text-charcoal"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
