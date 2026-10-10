import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/components/portfolio';
import { seo, profile } from '@/data/portfolio';
export const Route = createFileRoute('/')({
 head: () => ({ ...seo('Ravi Kumar Vishwakarma | AI Engineer | Portfolio', 'Ravi kumar Vishwakarma builds intelligent applications, machine learning systems, and data-driven products. Explore projects, experience, and ideas.'), scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: 'AI Engineer & Data Scientist', email: profile.email, sameAs: [profile.github, profile.linkedin] }) }] }),
 component: HomePage,
});
