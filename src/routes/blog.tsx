import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, BlogSection, ContactTeaser } from "@/components/portfolio";
import { seo } from "@/data/portfolio";

const blogLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://profileravi.vercel.app/blog#webpage",
  name: "AI & ML Articles | Ravi Kumar Vishwakarma",
  description:
    "Read insightful technical guides by Ravi Kumar Vishwakarma covering machine learning algorithms, RAG pipelines, and modern Python software engineering.",
  url: "https://profileravi.vercel.app/blog",
  author: {
    "@type": "Person",
    name: "Ravi Kumar Vishwakarma",
    alternateName: ["Ravi Vishwakarma"],
    url: "https://profileravi.vercel.app/",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": "https://profileravi.vercel.app/blog#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://profileravi.vercel.app/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://profileravi.vercel.app/blog",
      },
    ],
  },
};

export const Route = createFileRoute("/blog")({
  head: () => ({
    ...seo(
      "AI & ML Articles | Ravi Kumar Vishwakarma",
      "Read insightful technical guides by Ravi Kumar Vishwakarma covering machine learning algorithms, RAG pipelines, and modern Python software engineering.",
      "/blog",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(blogLd) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro
        eyebrow="WRITING & IDEAS"
        title="Notes from the journey."
        description="Read Ravi Vishwakarma’s articles on AI, machine learning, development, and the ideas behind his projects."
      />
      <BlogSection full />
      <ContactTeaser />
    </>
  );
}
