import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ContactTeaser } from "@/components/portfolio";
import { ExperienceSection, EducationSection } from "@/components/extras";
import { seo } from "@/data/portfolio";

const experienceLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://profileravi.vercel.app/experience#webpage",
  name: "Experience & Education | Ravi Kumar Vishwakarma",
  description:
    "Review the work experience, academic education, and practical project milestones of Ravi Kumar Vishwakarma in artificial intelligence and data science.",
  url: "https://profileravi.vercel.app/experience",
  about: {
    "@type": "Person",
    name: "Ravi Kumar Vishwakarma",
    alternateName: ["Ravi Vishwakarma"],
    jobTitle: "AI Engineer & Data Scientist",
    affiliation: {
      "@type": "EducationalOrganization",
      name: "AKS University Satna",
      sameAs: "https://www.aksuniversity.ac.in",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": "https://profileravi.vercel.app/experience#breadcrumb",
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
      "Experience & Education | Ravi Kumar Vishwakarma",
      "Review the work experience, academic education, and practical project milestones of Ravi Kumar Vishwakarma in artificial intelligence and data science.",
      "/experience",
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
