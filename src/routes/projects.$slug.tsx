import { createFileRoute, notFound } from '@tanstack/react-router';
import { ProjectDetails } from '@/components/portfolio';
import { projects, projectName, seo } from '@/data/portfolio';
export const Route = createFileRoute('/projects/$slug')({
 loader: ({ params }) => { const project = projects.find(p => p.slug === params.slug); if (!project) throw notFound(); return { project }; },
 head: ({ loaderData }) => loaderData ? seo(projectName(loaderData.project), loaderData.project.result1, `/projects/${loaderData.project.slug}`) : { meta: [{ title: 'Project Not Found — Ravi Kumar Vishwakarma' }, { name: 'robots', content: 'noindex' }] },
 component: Page,
});
function Page() { const { project } = Route.useLoaderData(); return <ProjectDetails project={project}/>; }
