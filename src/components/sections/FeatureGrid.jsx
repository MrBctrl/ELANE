export default function FeatureGrid({ features }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-64">
      {features.map((f) => (
        <div key={f.title} className="text-center">
          <div className="w-56 h-56 rounded-full bg-beige flex items-center justify-center mx-auto mb-24">
            <f.icon size={22} strokeWidth={1.5} className="text-charcoal" />
          </div>
          <h4 className="font-heading text-h5 text-heading">{f.title}</h4>
          <p className="text-body-sm text-muted mt-12 max-w-[36ch] mx-auto">{f.description}</p>
        </div>
      ))}
    </div>
  );
}
