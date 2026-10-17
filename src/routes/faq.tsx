import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, FaqSection, ContactTeaser } from "@/components/portfolio";
import { seo, faqs } from "@/data/portfolio";

const faqLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
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
      "Frequently Asked Questions | Ravi Kumar Vishwakarma",
      "Find answers to common questions about Ravi Kumar Vishwakarma’s AI and data science expertise, technology stack, project availability, and collaborations.",
      "/faq",
      undefined,
      "FAQ, Ravi Vishwakarma FAQ, AI Engineer FAQ, Data Scientist Questions, Hiring AI Developer, Technology Stack Questions",
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
