# ÉLANE — Image Drop-In Guide

Every image on the site points to a local file in this folder. **Save your
photo with the exact name listed below into the matching subfolder — no code
edits needed.**

## `/public/image/home/` — Homepage
| File | Used for | Status |
|---|---|---|
| `hero-banner.jpg` | Full-screen hero (1800×1200) | ✅ set |
| `category-women.jpg` | Category tile — Women (700×900) | ⬜ needed |
| `category-men.jpg` | Category tile — Men (700×900) | ⬜ needed |
| `category-beauty.jpg` | Category tile — Beauty (700×900) | ⬜ needed |
| `philosophy-craftsmanship.png` | "Our Philosophy" section (900×1100) | ✅ set |
| `lifestyle-everyday.jpg` | Lifestyle gallery, tile 1 (900×1100) | ✅ set |
| `lifestyle-evening.jpg` | Lifestyle gallery, tile 2 (900×1100) | ✅ set |
| `lifestyle-accessories.jpg` | Lifestyle gallery, tile 3 (900×1100) | ✅ set |

## `/public/image/products/` — Main catalogue photo (one per product, 800×1000, 4:5 portrait)
| File | Product | Status |
|---|---|---|
| `adire-wrap-coat.jpg` | The Adire Wrap Coat | ✅ set |
| `charcoal-tailored-trouser.jpg` | Charcoal Tailored Trouser | ✅ set |
| `ivory-silk-camisole.jpg` | Ivory Silk Camisole | ✅ set |
| `champagne-leather-loafer.jpg` | Champagne Leather Loafer | ✅ set |
| `structured-asooke-blaze.jpg` | Structured Aso-Oke Blazer | ✅ set |
| `soft-cashmere-scarf.jpg` | Soft Cashmere Scarf | ✅ set |
| `onyx-signet-cufflinks.jpg` | Onyx Signet Cufflinks | ✅ set |
| `beige-linen-shirt-dress.jpg` | Beige Linen Shirt Dress | ✅ set |

**Cleanup note:** two stray duplicate files are sitting in this folder —
`ROUND ONYX CUFFLINKS.jpg` and `beigelinen.jpg`. They're not referenced by any
code (the correctly-named files above already cover those two products), so
they're just extra clutter — safe to delete, or leave them, your call.

## `/public/image/products/gallery/` — Product detail page, 3 unique shots per product
**This is the fix for the bug you caught.** Each product now has its own
gallery — no more shared/duplicate images across products. Naming pattern:
`{product-slug}-detail.jpg`, `{product-slug}-texture.jpg`, `{product-slug}-on-model.jpg`.

Sizing note: these no longer need to be tall portrait — the "Lifestyle
Images" block on the product page now displays them at a **wider 3:2
landscape crop** (was 4:5 portrait, which is what made the shots look
"long/squeezed" before). Aim for **1200×800px, landscape**.

| Product | Files needed |
|---|---|
| Adire Wrap Coat | `adire-wrap-coat-detail.jpg`, `adire-wrap-coat-texture.jpg`, `adire-wrap-coat-on-model.jpg` |
| Charcoal Tailored Trouser | `charcoal-tailored-trouser-detail.jpg`, `charcoal-tailored-trouser-texture.jpg`, `charcoal-tailored-trouser-on-model.jpg` |
| Ivory Silk Camisole | `ivory-silk-camisole-detail.jpg`, `ivory-silk-camisole-texture.jpg`, `ivory-silk-camisole-on-model.jpg` |
| Champagne Leather Loafer | `champagne-leather-loafer-detail.jpg`, `champagne-leather-loafer-texture.jpg`, `champagne-leather-loafer-on-model.jpg` |
| Structured Aso-Oke Blazer | `structured-asooke-blazer-detail.jpg`, `structured-asooke-blazer-texture.jpg`, `structured-asooke-blazer-on-model.jpg` |
| Soft Cashmere Scarf | `soft-cashmere-scarf-detail.jpg`, `soft-cashmere-scarf-texture.jpg`, `soft-cashmere-scarf-on-model.jpg` |
| Onyx Signet Cufflinks | `onyx-signet-cufflinks-detail.jpg`, `onyx-signet-cufflinks-texture.jpg`, `onyx-signet-cufflinks-on-model.jpg` |
| Beige Linen Shirt Dress | `beige-linen-shirt-dress-detail.jpg`, `beige-linen-shirt-dress-texture.jpg`, `beige-linen-shirt-dress-on-model.jpg` |

**What each shot means:**
- `-detail` → close-up of stitching/buttons/hardware
- `-texture` → fabric/material close-up, no garment shape visible
- `-on-model` → full outfit worn by a person, natural pose

**Fallback:** if a product's gallery files aren't added yet, the page falls
back to the old generic template in `productDetail.js` (`gallery-detail-shot.jpg`
etc.) rather than breaking — but every product should get its own 3 shots
eventually so pages stop looking identical to each other.

## `/public/image/journal/` — Journal / Blog covers (800×1000, 4:5 portrait)
| File | Article |
|---|---|
| `capsule-wardrobe.png` | Building a Capsule Wardrobe the ÉLANE Way |
| `tailored-trouser.png` | The Quiet Power of a Well-Tailored Trouser |
| `charcoal-outfit.png` | Colour Psychology: Why Charcoal Never Fails |
| `wedding-styling.png` | Wedding Styling: Dressing the Whole Weekend |
| `office-fashion.png` | Office Fashion Without Losing Yourself |
| `shoe-care.png` | Shoe Care: Making Leather Last a Decade |
| `autumn-trends.png` | Reading the Season: Autumn Trends Worth Keeping |

## `/public/image/about/`
| File | Used for |
|---|---|
| `craftsmanship.png` | About page — "Craftsmanship" section (900×1100) |

## `introduction.png` (loose file in `/public/image/`)
Not referenced by any page — looks like a leftover from an earlier round
since `philosophy-craftsmanship.png` is already set separately. Safe to
delete, or tell me where you want it and I'll wire it in.

---
**Product galleries are now per-product and unique — the bug where every
product page showed the same 3 detail/texture/model images has been fixed.**
