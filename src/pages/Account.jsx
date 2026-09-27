import { useState } from "react";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import { TextField } from "../components/ui/Input";
import { useToast } from "../context/ToastContext";
import usePageTitle from "../hooks/usePageTitle";

/**
 * Account / Wishlist — Medium priority per the ÉLANE brief.
 * "Login/Register, Account dashboard, Order history + tracking."
 * This is a self-contained front-end shell (no backend yet): submitting
 * either form simply confirms via toast and switches to the signed-in
 * dashboard view so the flow can be demoed end-to-end.
 */
const ORDERS = [
  { id: "ELN-10482", date: "12 Aug 2026", status: "Delivered", total: "₦185,000" },
  { id: "ELN-10311", date: "02 Jul 2026", status: "In Transit", total: "₦96,000" },
];

function AuthPanel({ onSuccess }) {
  const [tab, setTab] = useState("login");
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(tab === "login" ? "Welcome back." : "Account created.", "success");
    onSuccess();
  };

  return (
    <div className="max-w-110 mx-auto">
      <div className="flex gap-32 border-b border-border mb-40">
        {["login", "register"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-16 text-caption uppercase tracking-[0.1em] border-b-2 -mb-px transition-colors ${
              tab === t ? "border-charcoal text-charcoal" : "border-transparent text-muted hover:text-charcoal"
            }`}
          >
            {t === "login" ? "Sign In" : "Create Account"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-24">
        {tab === "register" && <TextField label="Full Name" type="text" required placeholder="Your name" />}
        <TextField label="Email" type="email" required placeholder="you@email.com" />
        <TextField label="Password" type="password" required placeholder="••••••••" minLength={8} />
        {tab === "login" && (
          <button type="button" className="text-tiny text-muted hover:text-charcoal underline underline-offset-4 self-end -mt-8">
            Forgot password?
          </button>
        )}
        <Button type="submit" variant="primary" className="w-full mt-8">
          {tab === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>
    </div>
  );
}

function Dashboard({ onSignOut }) {
  return (
    <div className="max-w-[720px] mx-auto">
      <div className="flex items-center justify-between mb-48">
        <div>
          <p className="text-tiny uppercase tracking-[0.1em] text-gold-text mb-8">Welcome back</p>
          <h2 className="font-heading text-h4 text-heading">Your Account</h2>
        </div>
        <button onClick={onSignOut} className="text-tiny text-muted hover:text-charcoal underline underline-offset-4">
          Sign out
        </button>
      </div>

      <div className="mb-48">
        <h3 className="text-tiny uppercase tracking-[0.1em] text-muted mb-20">Order History</h3>
        <div className="flex flex-col gap-1 border border-border rounded-card overflow-hidden">
          {ORDERS.map((o) => (
            <div key={o.id} className="flex items-center justify-between px-24 py-20 bg-warm-white even:bg-beige/40">
              <div>
                <p className="text-body-sm text-charcoal">{o.id}</p>
                <p className="text-tiny text-muted mt-4">{o.date}</p>
              </div>
              <p className="text-tiny uppercase tracking-[0.08em] text-gold-text">{o.status}</p>
              <p className="text-body-sm text-charcoal">{o.total}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-tiny uppercase tracking-[0.1em] text-muted mb-20">Account Details</h3>
        <div className="grid sm:grid-cols-2 gap-24">
          <TextField label="Full Name" defaultValue="" placeholder="Your name" />
          <TextField label="Email" type="email" defaultValue="" placeholder="you@email.com" />
        </div>
        <Button variant="secondary" size="small" className="mt-24">Save Changes</Button>
      </div>
    </div>
  );
}

export default function Account() {
  usePageTitle("Account");
  const [signedIn, setSignedIn] = useState(false);

  return (
    <div className="bg-ivory min-h-screen">
      <Navigation transparentOnTop={false} />

      <div className="content-container pt-[112px] sm:pt-[152px] pb-120">
        {!signedIn && (
          <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 text-heading text-center mb-64">
            Account
          </h1>
        )}
        {signedIn ? (
          <Dashboard onSignOut={() => setSignedIn(false)} />
        ) : (
          <AuthPanel onSuccess={() => setSignedIn(true)} />
        )}
      </div>

      <Footer />
    </div>
  );
}
