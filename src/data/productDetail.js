export const productDetail = {
  name: "The Adire Wrap Coat",
  category: "Women — Outerwear",
  price: "₦185,000",
  rating: 4,
  reviewCount: 18,
  sizes: ["XS", "S", "M", "L", "XL"],
  // NOTE: on the live product page, images[0] gets swapped for that product's own
  // photo from products.js automatically (see ProductDetail.jsx) -- images[1..3]
  // below are shared secondary/detail shots used on every product page until
  // per-product galleries are built. Drop 3 generic close-up/detail/on-model shots here.
  images: [
    "/image/products/gallery/gallery-primary-fallback.png",
    "/image/products/gallery/gallery-detail-shot.jpg",
    "/image/products/gallery/gallery-texture-closeup.png",
    "/image/products/gallery/gallery-on-model.png",
  ],
  story:
    "Cut from a single length of hand-dyed adire cloth, the wrap coat was built for the in-between moments, like leaving the studio at dusk or stepping into a room you want to be remembered in. It drapes rather than fits, moving with you instead of against you.",
  details: [
    {
      title: "Features",
      content:
        "Relaxed wrap silhouette, self-tie belt, oversized patch pockets, dropped shoulder seam, mid-calf length.",
    },
    {
      title: "Materials",
      content:
        "100% hand-dyed cotton adire, sourced from artisans in Abeokuta. Fully lined in breathable cupro.",
    },
    {
      title: "Care Instructions",
      content:
        "Dry clean only. Store on a padded hanger away from direct sunlight to preserve the indigo dye.",
    },
  ],
};

export const reviews = [
  {
    name: "Chiamaka U.",
    rating: 5,
    date: "2 weeks ago",
    text: "The fabric feels even richer in person. I get stopped every time I wear it.",
  },
  {
    name: "Tunde A.",
    rating: 4,
    date: "1 month ago",
    text: "Beautifully made, runs slightly long, but that's true to the wrap silhouette.",
  },
  {
    name: "Ifeoma B.",
    rating: 5,
    date: "1 month ago",
    text: "Worth every naira. The kind of piece you build an outfit around, not the other way round.",
  },
];
