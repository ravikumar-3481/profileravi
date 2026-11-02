import { createFileRoute, notFound } from "@tanstack/react-router";
import { ProjectDetails } from "@/components/portfolio";
import { projects, projectName, seo, imagekit } from "@/data/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project Not Found | Ravi Kumar Vishwakarma" },
          { name: "robots", content: "noindex, nofollow" },
        ],
      };
    }
    const { project } = loaderData;
    const title = project.seoTitle || `${projectName(project)} — ${project.result}`;
    const desc = project.seoDescription || project.result1;
    const slugUrl = `https://profileravi.vercel.app/projects/${project.slug}`;
    const projectLd = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${slugUrl}#software`,
      name: projectName(project),
      headline: project.title,
      description: project.result1,
      applicationCategory: project.applicationCategory || "SoftwareApplication",
      operatingSystem: "Web Browser / Cross-platform",
      url: slugUrl,
      image: imagekit(project.thumbnail),
      author: {
        "@type": "Person",
        name: "Ravi Kumar Vishwakarma",
        alternateName: ["Ravi Vishwakarma"],
        url: "https://profileravi.vercel.app/",
      },
      codeRepository: project.codeLink,
      ...(project.liveLink ? { sameAs: project.liveLink } : {}),
      breadcrumb: {
        "@type": "BreadcrumbList",
        "@id": `${slugUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://profileravi.vercel.app/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: "https://profileravi.vercel.app/projects",
          },
          { "@type": "ListItem", position: 3, name: projectName(project), item: slugUrl },
        ],
      },
    };

    return {
      ...seo(title, desc, `/projects/${project.slug}`, project.thumbnail),
      scripts: [{ type: "application/ld+json", children: JSON.stringify(projectLd) }],
    };
  },
  component: Page,
});

function Page() {
  const { project } = Route.useLoaderData();
  return <ProjectDetails project={project} />;
}
