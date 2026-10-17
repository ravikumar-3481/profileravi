import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ContactTeaser } from "@/components/portfolio";
import { ExperienceSection, EducationSection } from "@/components/extras";
import { seo } from "@/data/portfolio";

const experienceLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Experience & Education | Ravi Kumar Vishwakarma",
  description:
    "Professional journey and education of Ravi Kumar Vishwakarma: Data Analyst Intern at Future Interns and Cognifyz Technologies, B.Tech CSE (AI & Data Science) at AKS University.",
  url: "https://profileravi.vercel.app/experience",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://profileravi.vercel.app/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Experience",
        item: "https://profileravi.vercel.app/experience",
      },
    ],
  },
};

export const Route = createFileRoute("/experience")({
  head: () => ({
    ...seo(
      "Work Experience & Education | Ravi Kumar Vishwakarma",
      "Explore Ravi Kumar Vishwakarma’s professional journey: Data Analyst internships at Future Interns and Cognifyz Technologies, B.Tech in CSE (AI & Data Science) at AKS University.",
      "/experience",
      undefined,
      "Ravi Kumar Vishwakarma Experience, Data Analyst Intern, Future Interns, Cognifyz Technologies, AKS University Satna, AI Education, Data Science Journey",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(experienceLd) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro
        eyebrow="EXPERIENCE & EDUCATION"
        title="The journey, so far."
        description="Explore Ravi’s data analyst internships at Future Interns and Cognifyz Technologies, and education at AKS University."
      />
      <ExperienceSection />
      <EducationSection />
      <ContactTeaser />
    </>
  );
}
