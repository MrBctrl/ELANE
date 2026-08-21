/**
 * Ref: §3.18 — Skeleton Loader, Image Placeholder, Button Loading, Checkout Loading.
 * "Never use ugly spinners."
 */

export function ProductCardSkeleton() {
  return (
    <div>
      <div className="rounded-product bg-beige aspect-[4/5] animate-pulse" />
      <div className="mt-16 space-y-8">
        <div className="h-10 w-2/5 bg-beige rounded-full animate-pulse" />
        <div className="h-16 w-4/5 bg-beige rounded-full animate-pulse" />
        <div className="h-14 w-1/3 bg-beige rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-24 sm:gap-32">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ImagePlaceholder({ className = "" }) {
  return <div className={`bg-beige animate-pulse ${className}`} />;
}
