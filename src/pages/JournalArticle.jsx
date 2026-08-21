import { Link, useParams } from "react-router-dom";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import Newsletter from "../components/sections/Newsletter";
import EditorialCard from "../components/cards/EditorialCard";
import Breadcrumb from "../components/ui/Breadcrumb";
import { journal } from "../data/editorial";
import usePageTitle from "../hooks/usePageTitle";
import NotFound from "./NotFound";

/**
 * Journal article template — Ref: §1.11, "Journal / Blog... listing/index
 * page + article template." One template, driven by src/data/editorial.js.
 */
export default function JournalArticle() {
  const { slug } = useParams();
  const article = journal.find((j) => j.slug === slug);
  usePageTitle(article ? article.title : "Journal");

  if (!article) return <NotFound />;

  const more = journal.filter((j) => j.slug !== slug).slice(0, 3);

  return (
    <div className="bg-ivory">
      <Navigation transparentOnTop={false} />

      <article className="content-container pt-[112px] sm:pt-[152px] pb-64 max-w-[720px] mx-auto">
        <Breadcrumb items={["Home", "Journal", article.category]} />

        <p className="text-tiny uppercase tracking-[0.14em] text-gold-text mt-24 mb-16">{article.eyebrow}</p>
        <h1 id="main-heading" tabIndex="-1" className="font-display text-h1 sm:text-display-sm text-heading">
          {article.title}
        </h1>
        <p className="text-caption text-muted mt-16">{article.date} · {article.meta}</p>

        <div className="rounded-img overflow-hidden aspect-[16/10] mt-40 mb-48">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="flex flex-col gap-24">
          {article.body.map((para, i) => (
            <p key={i} className="text-body-md text-charcoal leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-64 pt-32 border-t border-border">
          <Link to="/journal" className="text-caption text-muted hover:text-charcoal underline underline-offset-4">
            ← Back to the Journal
          </Link>
        </div>
      </article>

      {more.length > 0 && (
        <div className="content-container pb-120">
          <h2 className="text-tiny uppercase tracking-[0.1em] text-muted mb-32">More from the Journal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-48">
            {more.map((j) => (
              <EditorialCard key={j.slug} {...j} />
            ))}
          </div>
        </div>
      )}

      <Newsletter />
      <Footer />
    </div>
  );
}
