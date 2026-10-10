import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, ActivitiesSection, GithubSection, TestimonialsSection, ContactTeaser } from '@/components/portfolio';
import { seo } from '@/data/portfolio';
export const Route = createFileRoute('/activities')({ head: () => seo('Activities', 'Open source contributions, hackathons, technical content, and Ravi’s wider engineering journey.', '/activities'), component: Page });
function Page() { return <><PageIntro eyebrow="ACTIVITIES" title="Curiosity beyond the code." description={'Open source contributions, hackathons, technical content, and Ravi’s wider engineering journey.'}/><ActivitiesSection/><GithubSection/><TestimonialsSection/><ContactTeaser/></>; }
