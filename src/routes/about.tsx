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
  name: "About Ravi Kumar Vishwakarma",
  description:
    "Learn about Ravi Kumar Vishwakarma, an AI Engineer and Data Scientist specializing in machine learning, RAG systems, and data pipelines.",
  mainEntity: {
    "@type": "Person",
    name: "Ravi Kumar Vishwakarma",
    jobTitle: "AI Engineer & Data Scientist",
    alumniOf: "AKS University Satna",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
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
      "About Ravi Kumar Vishwakarma | AI Engineer & Data Scientist",
      "Get to know Ravi Kumar Vishwakarma — B.Tech Computer Science student specializing in AI & Data Science, ethical AI, RAG systems, and intelligent applications.",
      "/about",
      undefined,
      "Ravi Kumar Vishwakarma, About Ravi Vishwakarma, AI Engineer India, Data Scientist Satna, Machine Learning Engineer, AKS University",
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
