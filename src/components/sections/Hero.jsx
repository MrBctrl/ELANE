import { Link } from "react-router-dom";
import Button from "../ui/Button";

/**
 * Ref: Part 1 §1.7 Homepage wireframe — Full Screen Hero.
 * Photography dominates; text supports; no clutter.
 */
export default function Hero({ image, eyebrow, title, subtitle, ctaLabel = "Discover the Collection", ctaTo = "/collection" }) {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-transparent" />

      <div className="relative h-full content-container flex flex-col justify-end pb-64 sm:pb-80 lg:pb-120">
        {eyebrow && (
          <p className="text-tiny uppercase tracking-[0.2em] text-warm-white/80 mb-16">
            {eyebrow}
          </p>
        )}
        <h1 id="main-heading" tabIndex="-1" className="font-display text-display-sm sm:text-display-md lg:text-display-xl text-warm-white max-w-[16ch] leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="text-body-md text-warm-white/85 mt-24 max-w-[46ch]">{subtitle}</p>
        )}
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
