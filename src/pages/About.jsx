import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import FeatureGrid from "../components/sections/FeatureGrid";
import { Feather, Leaf, HandHeart } from "lucide-react";
import usePageTitle from "../hooks/usePageTitle";

const values = [
  { icon: Feather, title: "Restraint", description: "We remove until only what matters is left." },
  { icon: HandHeart, title: "Craft", description: "Every seam is made by a hand that could have made ten more." },
  { icon: Leaf, title: "Longevity", description: "Built to outlive the season it was bought for." },
];

export default function About() {
  usePageTitle("About");
  return (
    <div className="bg-ivory">
      <Navigation transparentOnTop={false} />

      {/* Opening story, not "We started in 2026..." */}
      <section className="content-container pt-[112px] sm:pt-[152px] pb-120">
        <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">Our Story</p>
        <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 sm:text-display-md text-heading max-w-[18ch] leading-[1.1]">
          A tailor in Warri once told us that a good coat should feel like a decision, not an accident.
        </h1>
        <p className="text-body-md text-muted mt-32 max-w-[62ch]">
          That sentence became the reason ÉLANE exists. Not a trend, and not a
          season, but a standard. Everything we make is judged against it:
          does this feel like a decision someone made about who they are?
        </p>
      </section>

      {/* Mission / Vision */}
      <section className="section-padding bg-beige">
        <div className="content-container grid lg:grid-cols-2 gap-64">
          <div>
            <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">Mission</p>
            <h2 className="font-heading text-h2 text-heading max-w-[16ch]">
              Dress the version of you that isn't asking permission.
            </h2>
          </div>
          <div>
            <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">Vision</p>
            <h2 className="font-heading text-h2 text-heading max-w-[16ch]">
              A house recognised globally for African craftsmanship worn without translation.
            </h2>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="content-container">
          <h2 className="font-heading text-h2 text-heading text-center mb-80">What We Hold To</h2>
          <FeatureGrid features={values} />
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="section-padding bg-beige">
        <div className="content-container grid lg:grid-cols-2 gap-64 items-center">
          <img
            src="/image/about/craftsmanship.png"
            alt="ÉLANE craftsmanship"
            className="rounded-img w-full aspect-[4/5] object-cover order-2 lg:order-1"
            loading="lazy"
            decoding="async"
          />
          <div className="order-1 lg:order-2">
            <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">Craftsmanship</p>
            <h2 className="font-heading text-h2 text-heading max-w-[16ch]">
              Made with hands that remember
            </h2>
            <p className="text-body-md text-muted mt-24 max-w-[52ch]">
              We work with artisans across Warri, Abeokuta, and Cotonou,
              people who learned adire dyeing and tailoring the way it's
              always been learned: standing beside someone who already knew.
              Every ÉLANE piece carries that lineage forward.
            </p>
          </div>
        </div>
      </section>

      {/* Why ÉLANE exists */}
      <section className="section-padding">
        <div className="content-container text-center max-w-[640px] mx-auto">
          <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">Why ÉLANE Exists</p>
          <h2 className="font-heading text-h2 text-heading">
            Because confidence deserves better tailoring than an afterthought.
          </h2>
        </div>
      </section>

      <Footer />
    </div>
  );
}
