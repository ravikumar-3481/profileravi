import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, FaqSection, ContactTeaser } from "@/components/portfolio";
import { seo, faqs } from "@/data/portfolio";

// NOTE(SEO): Google rarely shows FAQ rich results for non-authority/non-government sites
// following their August 2023 update, but we retain FAQPage schema for structured entity clarity.
const faqLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": "https://profileravi.vercel.app/faq#webpage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://profileravi.vercel.app/faq#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://profileravi.vercel.app/" },
        {
          "@type": "ListItem",
          position: 2,
          name: "FAQ",
          item: "https://profileravi.vercel.app/faq",
        },
      ],
    },
  ],
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...seo(
      "FAQ | Ravi Kumar Vishwakarma",
      "Find answers to frequently asked questions about Ravi Kumar Vishwakarma, including AI and machine learning experience, tech stacks, and project workflows.",
      "/faq",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqLd) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="A few things you might wonder."
        description="Answers about Ravi’s AI and data science work, technology stack, collaborations, and contact information."
      />
      <FaqSection />
      <ContactTeaser />
    </>
  );
}
