import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, BlogSection, ContactTeaser } from '@/components/portfolio';
import { seo } from '@/data/portfolio';
export const Route = createFileRoute('/blog')({ head: () => seo('Blogs', 'Read Ravi Kumar Vishwakarma’s articles on AI, machine learning, development, and the ideas behind his projects.', '/blog'), component: Page });
function Page() { return <><PageIntro eyebrow="WRITING & IDEAS" title="Notes from the journey." description={'Read Ravi Vishwakarma’s articles on AI, machine learning, development, and the ideas behind his projects.'}/><BlogSection full/><ContactTeaser/></>; }
