import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, SkillsSection, ContactTeaser } from "@/components/portfolio";
import { seo } from "@/data/portfolio";

const skillsLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Technical Skills & Tools | Ravi Kumar Vishwakarma",
  description:
    "Comprehensive overview of programming languages, AI frameworks, data science libraries, and development tools mastered by Ravi Kumar Vishwakarma.",
  url: "https://profileravi.vercel.app/skills",
  breadcrumb: {
    "@type": "BreadcrumbList",
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
      "Skills & Technical Stack | Ravi Kumar Vishwakarma",
      "Explore Ravi Kumar Vishwakarma’s technical skillset: Python, TensorFlow, scikit-learn, LangChain, React, FastAPI, SQL, Power BI, Docker, and Git.",
      "/skills",
      undefined,
      "Python, TensorFlow, React, FastAPI, SQL, Power BI, LangChain, RAG, Machine Learning, Data Science Tools, Git, Docker, Ravi Vishwakarma Skills",
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
