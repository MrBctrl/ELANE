import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router does not scroll to top on navigation by default. Without
 * this, navigating from a scrolled-down position on one page lands you at
 * the same scroll offset on the next page — sometimes past its content
 * entirely. Mounted once at the app root.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
