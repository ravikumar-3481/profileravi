import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/portfolio";
import { seo } from "@/data/portfolio";
const projectsLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://profileravi.vercel.app/projects#webpage",
  name: "AI & Data Science Projects | Ravi Kumar Vishwakarma",
  description:
    "Explore featured AI, NLP, and machine learning projects by Ravi Kumar Vishwakarma, including production RAG chatbots, analytics pipelines, and CLI tools.",
  url: "https://profileravi.vercel.app/projects",
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": "https://profileravi.vercel.app/projects#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://profileravi.vercel.app/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://profileravi.vercel.app/projects",
      },
    ],
  },
};

export const Route = createFileRoute("/projects/")({
  head: () => ({
    ...seo(
      "AI & Data Science Projects | Ravi Kumar Vishwakarma",
      "Explore featured AI, NLP, and machine learning projects by Ravi Kumar Vishwakarma, including production RAG chatbots, analytics pipelines, and CLI tools.",
      "/projects",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(projectsLd) }],
  }),
  component: ProjectsPage,
});
