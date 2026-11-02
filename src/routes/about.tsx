import { createFileRoute } from "@tanstack/react-router";
import {
  PageIntro,
  AboutSection,
  JourneySection,
  ActivitiesSection,
  ContactTeaser,
} from "@/components/portfolio";
import { seo } from "@/data/portfolio";

const aboutLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://profileravi.vercel.app/about#webpage",
  name: "About Ravi Vishwakarma | AI & Data Science Student, India",
  description:
    "Learn about Ravi Vishwakarma, an AI and data science student in India building intelligent RAG systems, machine learning models, and modern web apps.",
  mainEntity: {
    "@type": "Person",
    name: "Ravi Vishwakarma",
    alternateName: ["Ravi Kumar Vishwakarma"],
    jobTitle: "AI Engineer & Data Scientist",
    affiliation: {
      "@type": "EducationalOrganization",
      name: "AKS University Satna",
      sameAs: "https://www.aksuniversity.ac.in",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": "https://profileravi.vercel.app/about#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://profileravi.vercel.app/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://profileravi.vercel.app/about",
      },
    ],
  },
};

export const Route = createFileRoute("/about")({
  head: () => ({
    ...seo(
      "About Ravi Vishwakarma | AI & Data Science Student, India",
      "Learn about Ravi Vishwakarma, an AI and data science student in India building intelligent RAG systems, machine learning models, and modern web apps.",
      "/about",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(aboutLd) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT"
        title="The person behind the code."
        description="Get to know Ravi Vishwakarma, a Computer Science student focused on AI, data science, and thoughtful software."
      />
      <AboutSection full />
      <JourneySection />
      <ActivitiesSection />
      <ContactTeaser />
    </>
  );
}
