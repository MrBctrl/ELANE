/**
 * Button / Primary|Secondary|Ghost|Icon / Size / State
 * Ref: Master Reference Part 2 §2.11, Part 3 §3.8
 *
 * Rule: small uppercase label, generous letter-spacing, soft hover — never loud.
 */

const base =
  "inline-flex items-center justify-center gap-8 font-body text-tiny font-medium uppercase tracking-[0.14em] transition-colors duration-300 ease-out disabled:opacity-40 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-charcoal text-warm-white rounded-btn px-32 py-16 hover:bg-[#3a332c]",
  secondary:
    "bg-transparent text-charcoal border border-charcoal rounded-btn px-32 py-16 hover:bg-charcoal hover:text-warm-white",
  ghost:
    "bg-transparent text-charcoal px-0 py-4 border-b border-transparent hover:border-charcoal",
};

const sizes = {
  default: "",
  small: "text-[11px] px-24 py-12",
  large: "text-caption px-40 py-16",
};

export default function Button({
  as: Tag = "button",
  variant = "primary",
  size = "default",
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}) {
  return (
    <Tag
      className={`${base} ${variants[variant]} ${sizes[size]} ${loading ? "opacity-70 pointer-events-none" : ""} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-8">
          <span className="w-6 h-6 rounded-full bg-current animate-pulse" />
          <span className="w-6 h-6 rounded-full bg-current animate-pulse [animation-delay:150ms]" />
          <span className="w-6 h-6 rounded-full bg-current animate-pulse [animation-delay:300ms]" />
        </span>
      ) : (
        children
      )}
    </Tag>
  );
}

export function IconButton({ as: Tag = "button", icon: Icon, label, className = "", ...props }) {
  return (
    <Tag
      aria-label={label}
      className={`inline-flex items-center justify-center w-40 h-40 rounded-full text-charcoal hover:bg-beige transition-colors duration-300 ${className}`}
      {...props}
    >
      <Icon size={19} strokeWidth={1.5} />
    </Tag>
  );
}
