import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, AboutSection, JourneySection, ActivitiesSection, ContactTeaser } from '@/components/portfolio';
import { seo } from '@/data/portfolio';
export const Route = createFileRoute('/about')({ head: () => seo('About', 'Get to know Ravi Vishwakarma, a Computer Science student focused on AI, data science, and thoughtful software.', '/about'), component: Page });
function Page() { return <><PageIntro eyebrow="ABOUT" title="The person behind the code." description={'Get to know Ravi Vishwakarma, a Computer Science student focused on AI, data science, and thoughtful software.'}/><AboutSection full/><JourneySection/><ActivitiesSection/><ContactTeaser/></>; }
