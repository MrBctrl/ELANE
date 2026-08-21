export default function CollectionCard({ image, title, count }) {
  return (
    <a href="#" className="group relative block rounded-img overflow-hidden aspect-[16/9]">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
      <div className="absolute bottom-32 left-32 right-32 flex items-end justify-between">
        <h3 className="font-heading text-h3 text-warm-white">{title}</h3>
        {count && <span className="text-caption text-warm-white/80">{count} pieces</span>}
      </div>
    </a>
  );
}
