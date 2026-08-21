export const worlds = [
  {
    name: "Inspire",
    purpose: "Create emotion.",
    pages: "Homepage · Campaign Pages · Collections · Lookbook",
    emotion: "\u201cI want to look like this.\u201d",
  },
  {
    name: "Discover",
    purpose: "Help visitors understand ÉLANE.",
    pages: "About · Brand Story · Philosophy · Craftsmanship",
    emotion: "\u201cI believe in this brand.\u201d",
  },
  {
    name: "Shop",
    purpose: "Sell beautifully.",
    pages: "Categories · Product Page · Search · Wishlist · Cart · Checkout",
    emotion: "\u201cThis is worth buying.\u201d",
  },
  {
    name: "Community",
    purpose: "Create belonging.",
    pages: "Journal · Style Guides · Fashion Tips · Customer Stories",
    emotion: "\u201cI want to stay connected.\u201d",
  },
  {
    name: "Support",
    purpose: "Reduce uncertainty.",
    pages: "FAQ · Contact · Returns · Shipping · Account",
    emotion: "\u201cI feel safe buying here.\u201d",
  },
];

export const emotionalArc = [
  "Curiosity", "Admiration", "Trust", "Desire", "Confidence", "Purchase", "Loyalty", "Advocacy",
];

export const emotionTimeline = [
  "Opening Website", "\u201cWow.\u201d", "\u201cThis looks premium.\u201d",
  "\u201cThey know fashion.\u201d", "\u201cI like this brand.\u201d",
  "\u201cI need this.\u201d", "Checkout", "\u201cI'll come back.\u201d",
];

export const navigationFlow = [
  "Homepage", "Collection", "Story", "Products", "Product Detail",
  "Reviews", "Cart", "Checkout", "Thank You", "Community",
];

export const keyPages = [
  { name: "Collections", to: "/collection", purpose: "Magazine-style browsing, not a catalogue grid." },
  { name: "Product Detail", to: "/product/p1", purpose: "Tells a story before it lists a spec." },
  { name: "About", to: "/about", purpose: "Builds trust — never opens with \u201cWe started in 2026.\u201d" },
  { name: "Journal", to: "/journal", purpose: "Doubles as the SEO engine and the trust layer." },
  { name: "Cart", to: "/cart", purpose: "Quiet, no fake urgency, no countdown timers." },
  { name: "Checkout", to: "/checkout", purpose: "Four steps. No unnecessary friction." },
];

export const interactionHighlights = [
  {
    title: "Quick View",
    detail: "Hover any product card, tap the eye icon — buy without ever leaving the grid.",
  },
  {
    title: "Live Cart & Wishlist State",
    detail: "Adding to bag or saving to wishlist updates the nav badge instantly, everywhere in the app.",
  },
  {
    title: "Toast Feedback, Not Alerts",
    detail: "Every action confirms itself quietly in the corner — never an ugly native browser popup.",
  },
  {
    title: "Guided Checkout",
    detail: "A four-step progress stepper replaces a single overwhelming form.",
  },
];
