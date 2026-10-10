import { createFileRoute } from '@tanstack/react-router';
import { ProjectsPage } from '@/components/portfolio';
import { seo } from '@/data/portfolio';
export const Route = createFileRoute('/projects/')({ head: () => seo('Project Archive', 'Explore Ravi Vishwakarma’s AI applications and developer tools: Aura Health, MeetingSense AI, PyCLI, and NewsPulse AI.', '/projects'), component: ProjectsPage });
