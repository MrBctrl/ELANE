import { useState } from "react";
import Button from "../ui/Button";
import { useToast } from "../../context/ToastContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      showToast("You're on the list. Welcome to ÉLANE.", "success");
    }, 900);
  };

  return (
    <section className="bg-beige section-padding">
      <div className="content-container text-center max-w-[560px] mx-auto">
        <h2 className="font-heading text-h3 text-heading">Stay close to ÉLANE</h2>
        <p className="text-body-md text-muted mt-16">
          Early access to new collections, styling notes, and stories from the studio.
        </p>
        <form className="flex flex-col sm:flex-row gap-16 mt-40" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 bg-warm-white border border-border rounded-btn px-24 py-16 text-body-sm placeholder:text-muted focus:outline-none focus:border-gold"
          />
          <Button type="submit" variant="primary" loading={loading}>Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
