import { createFileRoute } from "@tanstack/react-router";
import { ProjectsPage } from "@/components/portfolio";
import { seo } from "@/data/portfolio";
const projectsLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects | Ravi Kumar Vishwakarma",
  description:
    "Featured AI, Data Science, and Developer Tooling projects by Ravi Kumar Vishwakarma.",
  url: "https://profileravi.vercel.app/projects",
  breadcrumb: {
    "@type": "BreadcrumbList",
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
      "Projects | Ravi Kumar Vishwakarma — AI Applications & Developer Tools",
      "Explore Ravi Kumar Vishwakarma’s AI applications and developer tools: Aura Health, MeetingSense AI, PyCLI, and NewsPulse AI.",
      "/projects",
      undefined,
      "AI Projects, Machine Learning Projects, RAG Chatbot, FastAPI, Python Scaffolding, NLP Sentiment Analysis, Ravi Kumar Vishwakarma Portfolio",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(projectsLd) }],
  }),
  component: ProjectsPage,
});
