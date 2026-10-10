import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, ContactTeaser } from '@/components/portfolio';
import { ExperienceSection, EducationSection } from '@/components/extras';
import { seo } from '@/data/portfolio';
export const Route = createFileRoute('/experience')({ head: () => seo('Experience & Education', 'Explore Ravi’s data analyst internships at Future Interns and Cognifyz Technologies, and education at AKS University.', '/experience'), component: Page });
function Page() { return <><PageIntro eyebrow="EXPERIENCE & EDUCATION" title="The journey, so far." description={'Explore Ravi’s data analyst internships at Future Interns and Cognifyz Technologies, and education at AKS University.'}/><ExperienceSection/><EducationSection/><ContactTeaser/></>; }
