import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, ContactSection } from '@/components/portfolio';
import { seo } from '@/data/portfolio';

const contactLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Ravi Kumar Vishwakarma',
  description:
    'Get in touch with Ravi Kumar Vishwakarma regarding AI engineering roles, data science internships, projects, or collaborations.',
  url: 'https://profileravi.vercel.app/contact',
  mainEntity: {
    '@type': 'Person',
    name: 'Ravi Kumar Vishwakarma',
    email: 'ravivish968@gmail.com',
    url: 'https://profileravi.vercel.app/',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://profileravi.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://profileravi.vercel.app/contact' },
    ],
  },
};

export const Route = createFileRoute('/contact')({
  head: () => ({
    ...seo(
      'Contact Ravi Kumar Vishwakarma | Hire AI Engineer & Data Scientist',
      'Contact Ravi Kumar Vishwakarma for AI engineering, data science, machine learning projects, internships, and remote collaborations.',
      '/contact',
      undefined,
      'Contact Ravi Vishwakarma, Hire AI Engineer, Data Science Intern, AI Freelancer, Collaboration, Satna, India'
    ),
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(contactLd) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro
        eyebrow="CONTACT"
        title="Let’s start a conversation."
        description="Contact Ravi Vishwakarma about AI engineering, data science, internships, and remote collaborations."
      />
      <ContactSection />
    </>
  );
}
