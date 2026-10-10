import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, FaqSection, ContactTeaser } from '@/components/portfolio';
import { seo, faqs } from '@/data/portfolio';
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
export const Route = createFileRoute('/faq')({ head: () => ({ ...seo('Frequently Asked Questions', 'Answers about Ravi’s AI and data science work, technology stack, collaborations, and contact information.', '/faq'), scripts: [{ type: 'application/ld+json', children: JSON.stringify(faqLd) }] }), component: Page });
function Page() { return <><PageIntro eyebrow="FREQUENTLY ASKED QUESTIONS" title="A few things you might wonder." description={'Answers about Ravi’s AI and data science work, technology stack, collaborations, and contact information.'}/><FaqSection/><ContactTeaser/></>; }
