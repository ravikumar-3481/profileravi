import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, SkillsSection, ContactTeaser } from "@/components/portfolio";
import { seo } from "@/data/portfolio";

const skillsLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://profileravi.vercel.app/skills#webpage",
  name: "Skills: Python, SQL, React, ML | Ravi Kumar Vishwakarma",
  description:
    "Explore the technical skill set of Ravi Kumar Vishwakarma across Python, SQL, machine learning, React, LangChain, and analytics tools for AI engineering.",
  url: "https://profileravi.vercel.app/skills",
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": "https://profileravi.vercel.app/skills#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://profileravi.vercel.app/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Skills",
        item: "https://profileravi.vercel.app/skills",
      },
    ],
  },
};

export const Route = createFileRoute("/skills")({
  head: () => ({
    ...seo(
      "Skills: Python, SQL, React, ML | Ravi Kumar Vishwakarma",
      "Explore the technical skill set of Ravi Kumar Vishwakarma across Python, SQL, machine learning, React, LangChain, and analytics tools for AI engineering.",
      "/skills",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(skillsLd) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro
        eyebrow="SKILLS & TOOLBOX"
        title="Tools of the craft."
        description="Explore Ravi Vishwakarma’s programming, AI, data science, development tools, and collaboration skills."
      />
      <SkillsSection full />
      <ContactTeaser />
    </>
  );
}
