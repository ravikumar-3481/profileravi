import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, SkillsSection, ContactTeaser } from '@/components/portfolio';
import { seo } from '@/data/portfolio';
export const Route = createFileRoute('/skills')({ head: () => seo('Skills & Toolbox', 'Explore Ravi kumar Vishwakarma’s programming, AI, data science, development tools, and collaboration skills.', '/skills'), component: Page });
function Page() { return <><PageIntro eyebrow="SKILLS & TOOLBOX" title="Tools of the craft." description={'Explore Ravi Vishwakarma’s programming, AI, data science, development tools, and collaboration skills.'}/><SkillsSection full/><ContactTeaser/></>; }
