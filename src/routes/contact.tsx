import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, ContactSection } from '@/components/portfolio';
import { seo } from '@/data/portfolio';
export const Route = createFileRoute('/contact')({ head: () => seo('Contact', 'Contact Ravi Vishwakarma about AI engineering, data science, internships, and remote collaborations.', '/contact'), component: Page });
function Page() { return <><PageIntro eyebrow="CONTACT" title="Let’s start a conversation." description={'Contact Ravi Vishwakarma about AI engineering, data science, internships, and remote collaborations.'}/><ContactSection/></>; }
