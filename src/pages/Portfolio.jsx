import { Link } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import usePageTitle from "../hooks/usePageTitle";
import {
  worlds,
  emotionalArc,
  emotionTimeline,
  navigationFlow,
  keyPages,
  interactionHighlights,
} from "../data/caseStudy";

/**
 * Ref: §1.21 — Portfolio Presentation Structure.
 * "Goal: a viewer should think 'they know how to create digital experiences
 * that support business goals,' not just 'they can design websites.'"
 */

function FlowRow({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-16">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-8">
          <span className="text-caption sm:text-body-sm text-charcoal bg-beige rounded-full px-16 py-8 sm:px-20 sm:py-10 whitespace-nowrap">
            {item}
          </span>
          {i < items.length - 1 && <span className="text-muted">→</span>}
        </span>
      ))}
    </div>
  );
}

function SectionLabel({ number, title }) {
  return (
    <div className="flex items-baseline gap-16 mb-32">
      <span className="font-display text-h4 text-gold-text">{number}</span>
      <h2 className="font-heading text-h2 text-heading">{title}</h2>
    </div>
  );
}

export default function Portfolio() {
  usePageTitle("Portfolio — ÉLANE Case Study");

  return (
    <div className="bg-ivory">
      <Navigation transparentOnTop={false} />

      {/* Opening */}
      <section className="content-container pt-[112px] sm:pt-[152px] pb-80">
        <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">
          Case Study: Nexcraft Creative Studio
        </p>
        <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 sm:text-display-md text-heading max-w-[20ch] leading-[1.1]">
          Designing ÉLANE: a digital experience, not just a website
        </h1>
        <p className="text-body-md text-muted mt-32 max-w-[62ch]">
          A full-stack case study, from emotional architecture and information
          design through to a working, responsive, production-ready build.
          Every decision below traces back to a single question: what should
          the visitor feel, not just what should the page contain.
        </p>
      </section>

      {/* 1. Website Vision */}
      <section className="section-padding bg-beige">
        <div className="content-container max-w-[900px]">
          <SectionLabel number="01" title="Website Vision" />
          <p className="text-body-lg text-charcoal max-w-[50ch]">
            The site should not primarily sell clothes; it should sell the
            feeling of <em className="not-italic text-gold-text">becoming an ÉLANE customer</em>.
            Products come second. Experience comes first.
          </p>
          <p className="text-body-sm text-muted mt-24 max-w-[60ch]">
            The reframing question that shaped every decision wasn't
            "what pages do we need?" It was "what journey should the
            visitor experience?" That single shift changes the brief from a
            sitemap exercise into a product-design problem.
          </p>
        </div>
      </section>

      {/* 2. Information Architecture */}
      <section className="section-padding">
        <div className="content-container">
          <SectionLabel number="02" title="Information Architecture" />
          <p className="text-body-sm text-muted max-w-[60ch] mb-48">
            Rather than a flat list of pages, the site is organized as five
            connected "worlds", each with its own purpose and intended
            visitor emotion.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-24">
            {worlds.map((w) => (
              <div key={w.name} className="border border-border rounded-card p-24">
                <h4 className="font-heading text-h5 text-heading">{w.name}</h4>
                <p className="text-caption text-muted mt-8">{w.purpose}</p>
                <p className="text-tiny text-muted mt-16 leading-relaxed">{w.pages}</p>
                <p className="text-tiny text-gold-text mt-16 italic">{w.emotion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. User Journey */}
      <section className="section-padding bg-beige">
        <div className="content-container">
          <SectionLabel number="03" title="User Journey" />
          <p className="text-tiny uppercase tracking-[0.1em] text-muted mb-20">Emotional Arc</p>
          <FlowRow items={emotionalArc} />

          <p className="text-tiny uppercase tracking-[0.1em] text-muted mt-56 mb-20">
            First-Visit Emotion Timeline
          </p>
          <FlowRow items={emotionTimeline} />
        </div>
      </section>

      {/* 4. Navigation Structure */}
      <section className="section-padding">
        <div className="content-container">
          <SectionLabel number="04" title="Navigation Structure" />
          <p className="text-body-sm text-muted max-w-[60ch] mb-32">
            A deep flow, not a flat funnel. Every page is designed to
            increase trust, not just move the visitor one step forward.
          </p>
          <FlowRow items={navigationFlow} />
        </div>
      </section>

      {/* 5 & 6. Homepage + Key Page Wireframes (live, not static mockups) */}
      <section className="section-padding bg-beige">
        <div className="content-container">
          <SectionLabel number="05-06" title="Homepage & Key Pages" />
          <p className="text-body-sm text-muted max-w-[60ch] mb-48">
            Every wireframe below is a live, working page, not a static
            mockup. Click through to see the real build.
          </p>

          <Link
            to="/"
            className="group flex items-center justify-between border border-border rounded-card p-32 mb-24 hover:border-charcoal transition-colors"
          >
            <div>
              <h4 className="font-heading text-h4 text-heading">Homepage</h4>
              <p className="text-caption text-muted mt-8">
                Full-screen hero → Featured Collection → Philosophy → Categories →
                Best Sellers → Journal → Newsletter
              </p>
            </div>
            <span className="text-caption text-charcoal group-hover:translate-x-4 transition-transform shrink-0 ml-24">
              View →
            </span>
          </Link>

          <div className="grid sm:grid-cols-2 gap-24">
            {keyPages.map((p) => (
              <Link
                key={p.name}
                to={p.to}
                className="group flex items-center justify-between border border-border rounded-card p-24 hover:border-charcoal transition-colors"
              >
                <div>
                  <h5 className="font-heading text-h5 text-heading">{p.name}</h5>
                  <p className="text-caption text-muted mt-8 max-w-[38ch]">{p.purpose}</p>
                </div>
                <span className="text-caption text-charcoal group-hover:translate-x-4 transition-transform shrink-0 ml-16">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. UI Direction */}
      <section className="section-padding">
        <div className="content-container">
          <SectionLabel number="07" title="UI Direction" />
          <p className="text-body-sm text-muted max-w-[60ch] mb-32">
            Ivory, champagne gold, and deep charcoal, never pure black or
            white. Fraunces for display type, Inter for body. Full token
            reference lives in the design system.
          </p>
          <div className="flex flex-wrap gap-16">
            {["ivory", "beige", "charcoal", "gold"].map((c) => (
              <div key={c} className={`w-64 h-64 rounded-card bg-${c} border border-border`} />
            ))}
          </div>
          <Button as={Link} to="/system" variant="secondary" className="mt-32">
            View Full Design System
          </Button>
        </div>
      </section>

      {/* 8 & 9. Mobile + Desktop Experience */}
      <section className="section-padding bg-beige">
        <div className="content-container grid sm:grid-cols-2 gap-48">
          <div>
            <SectionLabel number="08" title="Mobile Experience" />
            <p className="text-body-sm text-muted max-w-[42ch]">
              Mobile isn't an afterthought here. Filters collapse into a
              modal instead of pushing the grid down the page, the nav
              compresses to a 72px bar, and every display heading steps down
              in scale instead of overflowing a 375px viewport.
            </p>
          </div>
          <div>
            <SectionLabel number="09" title="Desktop Experience" />
            <p className="text-body-sm text-muted max-w-[42ch]">
              The full 12-column grid and 1280px content width give
              photography room to breathe, the thing the whole brief keeps
              coming back to: restraint over decoration.
            </p>
          </div>
        </div>
      </section>

      {/* 10. Final Screens */}
      <section className="section-padding">
        <div className="content-container">
          <SectionLabel number="10" title="Final Screens" />
          <p className="text-body-sm text-muted max-w-[60ch] mb-32">
            Nine working screens, one component library, zero throwaway mockups.
          </p>
          <div className="flex flex-wrap gap-12">
            {["/", "/collection", "/product/p1", "/about", "/journal", "/cart", "/checkout", "/wishlist", "/system"].map((path) => (
              <Link
                key={path}
                to={path}
                className="text-caption text-charcoal border border-border rounded-full px-20 py-10 hover:border-charcoal hover:bg-warm-white transition-colors"
              >
                {path === "/" ? "Home" : path}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Interaction Highlights */}
      <section className="section-padding bg-beige">
        <div className="content-container">
          <SectionLabel number="11" title="Interaction Highlights" />
          <div className="grid sm:grid-cols-2 gap-32">
            {interactionHighlights.map((h) => (
              <div key={h.title} className="border-l-2 border-gold pl-24">
                <h5 className="font-heading text-h5 text-heading">{h.title}</h5>
                <p className="text-body-sm text-muted mt-8 max-w-[42ch]">{h.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Reflection */}
      <section className="section-padding">
        <div className="content-container max-w-[720px]">
          <SectionLabel number="12" title="Reflection" />
          <p className="text-body-md text-charcoal max-w-[58ch]">
            The hardest part of this project wasn't the visual language.
            It was resisting decoration. Every luxury-brand instinct says
            "add more": more motion, more banners, more urgency. The brief's
            own rules said the opposite, and holding that line through nine
            pages and a full component library is the actual skill on
            display here, not the champagne-gold color palette.
          </p>
          <p className="text-body-md text-muted mt-24 max-w-[58ch]">
            What this project demonstrates isn't "I can design a fashion
            website." It's that a business goal (trust, conversion,
            perceived value) can be traced all the way from a one-sentence
            philosophy statement down to a single button's hover state,
            without losing the thread anywhere in between.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
