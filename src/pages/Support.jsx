import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import { TextField, Select } from "../components/ui/Input";
import Accordion from "../components/ui/Accordion";
import Tabs from "../components/ui/Tabs";
import { useToast } from "../context/ToastContext";
import usePageTitle from "../hooks/usePageTitle";

/**
 * Contact & Support — Low priority per the brief, but explicit:
 * "Contact form, FAQ (accordion), Shipping info, Returns policy...
 * reduce hesitation, make the visitor feel safe buying."
 * Previously the footer linked all four of these to "#" with no page at all.
 */
const FAQ_ITEMS = [
  {
    title: "How do I know what size to order?",
    content:
      "Every product page includes a full measurement guide alongside the size selector. If you're between sizes, we generally recommend sizing up for outerwear and true-to-size for tailored pieces.",
  },
  {
    title: "Do you ship outside Nigeria?",
    content:
      "Yes — we currently ship across West Africa with delivery in 3–5 business days, and internationally with delivery in 7–14 business days depending on destination.",
  },
  {
    title: "Can I change or cancel my order after placing it?",
    content:
      "Orders can be changed or cancelled within 2 hours of purchase. After that, the order enters fulfilment and can no longer be edited — but our returns policy still applies once it arrives.",
  },
  {
    title: "How should I care for hand-dyed adire pieces?",
    content:
      "Dry clean only, and always store away from direct sunlight — this preserves the depth of the indigo dye far longer than machine washing or air-drying in a bright room would.",
  },
];

function ContactForm() {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      e.target.reset();
      showToast("Message sent — we'll reply within one business day.", "success");
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-24 max-w-[520px]">
      <div className="grid sm:grid-cols-2 gap-24">
        <TextField label="Full Name" required placeholder="Your name" />
        <TextField label="Email" type="email" required placeholder="you@email.com" />
      </div>
      <Select
        label="Topic"
        options={["Order Enquiry", "Sizing & Fit", "Shipping & Delivery", "Returns & Exchanges", "Something Else"]}
      />
      <label className="block">
        <span className="block text-tiny uppercase tracking-[0.08em] text-muted mb-8">Message</span>
        <textarea
          required
          rows={5}
          placeholder="How can we help?"
          className="w-full bg-warm-white border border-border rounded-btn px-20 py-14 text-body-sm text-charcoal placeholder:text-muted focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </label>
      <Button type="submit" variant="primary" loading={submitting} className="self-start">
        Send Message
      </Button>
    </form>
  );
}

function ShippingInfo() {
  return (
    <div className="max-w-[640px] flex flex-col gap-24 text-body-sm text-charcoal">
      <div className="flex justify-between border-b border-border pb-16">
        <span>Lagos & Abuja</span>
        <span className="text-muted">1–2 business days</span>
      </div>
      <div className="flex justify-between border-b border-border pb-16">
        <span>Rest of Nigeria</span>
        <span className="text-muted">3–5 business days</span>
      </div>
      <div className="flex justify-between border-b border-border pb-16">
        <span>West Africa</span>
        <span className="text-muted">5–7 business days</span>
      </div>
      <div className="flex justify-between pb-16">
        <span>International</span>
        <span className="text-muted">7–14 business days</span>
      </div>
      <p className="text-caption text-muted mt-8">
        All orders are hand-packed and dispatched within 24 hours. Tracking is emailed as soon as your order leaves the studio.
      </p>
    </div>
  );
}

function ReturnsInfo() {
  return (
    <div className="max-w-[640px] flex flex-col gap-24 text-body-sm text-charcoal">
      <p>
        We accept returns within 14 days of delivery on unworn pieces with original tags attached.
        Made-to-order and final-sale items are not eligible.
      </p>
      <ol className="flex flex-col gap-16 list-decimal list-inside">
        <li>Request a return from your <a href="/account" className="underline underline-offset-4 text-gold-text">account dashboard</a>, or contact us directly.</li>
        <li>Pack the item in its original packaging with tags attached.</li>
        <li>Drop off at any partner courier point — a prepaid label is included.</li>
        <li>Refunds are processed within 5 business days of us receiving the return.</li>
      </ol>
    </div>
  );
}

export default function Support() {
  usePageTitle("Support");
  const [searchParams] = useSearchParams();

  const tabs = [
    { label: "Contact", content: <ContactForm /> },
    { label: "FAQ", content: <Accordion items={FAQ_ITEMS} /> },
    { label: "Shipping", content: <ShippingInfo /> },
    { label: "Returns", content: <ReturnsInfo /> },
  ];
  const requestedTab = searchParams.get("tab");
  const initial = Math.max(0, tabs.findIndex((t) => t.label === requestedTab));

  return (
    <div className="bg-ivory min-h-screen">
      <Navigation transparentOnTop={false} />

      <div className="content-container pt-[112px] sm:pt-[152px] pb-64">
        <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mb-16">We're here to help</p>
        <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 text-heading max-w-[16ch]">
          Contact &amp; Support
        </h1>
      </div>

      <div className="content-container pb-120">
        <Tabs tabs={tabs} initial={initial} />
      </div>

      <Footer />
    </div>
  );
}
