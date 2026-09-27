import { Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home";
import System from "./pages/System";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Journal from "./pages/Journal";
import JournalArticle from "./pages/JournalArticle";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Support from "./pages/Support";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import SkipLink from "./components/ui/SkipLink";
import ScrollToTop from "./components/ui/ScrollToTop";


function ProductDetailRoute() {
  const { id } = useParams();
  return <ProductDetail key={id} />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <SkipLink />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/system" element={<System />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<ProductDetailRoute />} />
        <Route path="/about" element={<About />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<JournalArticle />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account" element={<Account />} />
        <Route path="/support" element={<Support />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
