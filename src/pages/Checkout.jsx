import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import { TextField, Select } from "../components/ui/Input";
import { Check } from "lucide-react";
import usePageTitle from "../hooks/usePageTitle";
import { useCart } from "../context/CartContext";

const STEPS = ["Shipping", "Delivery", "Payment", "Review"];

export default function Checkout() {
  usePageTitle("Checkout");
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [placing, setPlacing] = useState(false);

  const next = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      clearCart();
    }, 1200);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="bg-ivory min-h-screen">
      <Navigation transparentOnTop={false} />

      <div className="content-container pt-[112px] sm:pt-[152px] pb-120 max-w-[760px]">
        {placed ? (
          <Confirmation />
        ) : items.length === 0 ? (
          <EmptyCheckout />
        ) : (
          <>
            <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 text-heading mb-48">Checkout</h1>

            {/* Stepper */}
            <div className="flex items-center gap-16 mb-64">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center gap-16">
                  <div className="flex items-center gap-8">
                    <span
                      className={`w-28 h-28 rounded-full flex items-center justify-center text-tiny shrink-0 ${
                        i <= step ? "bg-charcoal text-warm-white" : "bg-beige text-muted"
                      }`}
                    >
                      {i < step ? <Check size={13} strokeWidth={2} /> : i + 1}
                    </span>
                    <span className={`text-caption hidden sm:inline ${i <= step ? "text-charcoal" : "text-muted"}`}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && <span className="w-24 h-px bg-border" />}
                </div>
              ))}
            </div>

            {step === 0 && <ShippingStep />}
            {step === 1 && <DeliveryStep />}
            {step === 2 && <PaymentStep />}
            {step === 3 && <ReviewStep subtotal={subtotal} />}

            <div className="flex items-center justify-between mt-64">
              {step > 0 ? (
                <button
                  onClick={back}
                  disabled={placing}
                  className="text-caption text-muted hover:text-charcoal underline underline-offset-4 disabled:opacity-40 disabled:pointer-events-none"
                >
                  Back
                </button>
              ) : <span />}
              <Button variant="primary" onClick={next} loading={placing}>
                {step === STEPS.length - 1 ? "Place Order" : "Continue"}
              </Button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

function ShippingStep() {
  return (
    <div className="grid sm:grid-cols-2 gap-24">
      <TextField label="First Name" placeholder="Brendan" />
      <TextField label="Last Name" placeholder="Chidi" />
      <TextField label="Email" type="email" placeholder="you@email.com" className="sm:col-span-2" />
      <TextField label="Phone" placeholder="+234" />
      <TextField label="Address" placeholder="Street address" className="sm:col-span-2" />
      <TextField label="City" placeholder="Warri" />
      <Select label="State" options={["Delta", "Lagos", "Abuja", "Rivers"]} />
    </div>
  );
}

function DeliveryStep() {
  return (
    <div className="flex flex-col gap-16">
      {[
        { label: "Standard Delivery — 3–5 business days", price: "₦3,500" },
        { label: "Express Delivery — 1–2 business days", price: "₦8,000" },
      ].map((opt, i) => (
        <label
          key={opt.label}
          className="flex items-center justify-between border border-border rounded-card px-24 py-20 cursor-pointer has-[:checked]:border-charcoal"
        >
          <span className="flex items-center gap-12">
            <input type="radio" name="delivery" className="peer sr-only" defaultChecked={i === 0} />
            <span className="w-18 h-18 rounded-full border border-border-light peer-checked:border-charcoal flex items-center justify-center shrink-0">
              <span className="w-8 h-8 rounded-full bg-charcoal scale-0 peer-checked:scale-100 transition-transform" />
            </span>
            <span className="text-body-sm text-charcoal">{opt.label}</span>
          </span>
          <span className="text-body-sm text-charcoal">{opt.price}</span>
        </label>
      ))}
    </div>
  );
}

function PaymentStep() {
  return (
    <div className="flex flex-col gap-24">
      <TextField label="Card Number" placeholder="•••• •••• •••• ••••" />
      <div className="grid grid-cols-2 gap-24">
        <TextField label="Expiry" placeholder="MM / YY" />
        <TextField label="CVV" placeholder="•••" />
      </div>
      <TextField label="Name on Card" placeholder="Brendan Chidi" />
    </div>
  );
}

function ReviewStep({ subtotal }) {
  return (
    <div className="flex flex-col gap-24 text-body-sm text-charcoal">
      <div className="border border-border rounded-card p-24">
        <p className="text-tiny uppercase tracking-[0.08em] text-muted mb-8">Ship To</p>
        <p>Brendan Chidi, Warri, Delta State</p>
      </div>
      <div className="border border-border rounded-card p-24">
        <p className="text-tiny uppercase tracking-[0.08em] text-muted mb-8">Delivery</p>
        <p>Standard Delivery — 3–5 business days</p>
      </div>
      <div className="border border-border rounded-card p-24">
        <p className="text-tiny uppercase tracking-[0.08em] text-muted mb-8">Payment</p>
        <p>Card ending •••• 4242</p>
      </div>
      <div className="flex justify-between font-heading text-h5 text-heading pt-8">
        <span>Order Total</span>
        <span>₦{(subtotal + 3500).toLocaleString()}</span>
      </div>
    </div>
  );
}

function EmptyCheckout() {
  return (
    <div className="text-center py-80">
      <div className="w-80 h-80 rounded-full bg-beige mx-auto mb-32" />
      <h3 className="font-heading text-h4 text-heading">Your bag is empty</h3>
      <p className="text-body-sm text-muted mt-16">
        Add something to your bag before checking out.
      </p>
      <Button as={Link} to="/collection" variant="primary" className="mt-32">
        Explore the Collection
      </Button>
    </div>
  );
}

function Confirmation() {
  return (
    <div className="text-center py-64">
      <div className="w-64 h-64 rounded-full bg-emerald/15 flex items-center justify-center mx-auto mb-32">
        <Check size={26} strokeWidth={1.5} className="text-emerald" />
      </div>
      <h1 className="font-display text-h2 text-heading">Order confirmed</h1>
      <p className="text-body-md text-muted mt-16 max-w-[46ch] mx-auto">
        Thank you for choosing ÉLANE. A confirmation has been sent to your
        email, and your order is already being prepared.
      </p>
      <p className="text-tiny uppercase tracking-[0.1em] text-muted mt-32">
        Order #EL-24891
      </p>
    </div>
  );
}
