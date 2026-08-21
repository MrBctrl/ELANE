import { Link } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import usePageTitle from "../hooks/usePageTitle";

export default function NotFound() {
  usePageTitle("Page Not Found");

  return (
    <div className="bg-ivory min-h-screen flex flex-col">
      <Navigation transparentOnTop={false} />
      <div className="flex-1 flex items-center justify-center text-center px-24 pt-[112px] sm:pt-[152px] pb-120">
        <div className="max-w-[420px]">
          <p className="font-display text-display-md text-heading">404</p>
          <h1 className="font-heading text-h3 text-heading mt-16">This page wandered off</h1>
          <p className="text-body-sm text-muted mt-16">
            The page you're looking for doesn't exist, or has moved somewhere quieter.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-16 mt-32">
            <Button as={Link} to="/" variant="primary">Back to Home</Button>
            <Button as={Link} to="/collection" variant="secondary">Browse Collection</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
