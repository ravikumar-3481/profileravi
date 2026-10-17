import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, ActivitiesSection, GithubSection, TestimonialsSection, ContactTeaser } from '@/components/portfolio';
import { seo } from '@/data/portfolio';

const activitiesLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Activities & Open Source | Ravi Kumar Vishwakarma',
  description:
    'Open source contributions, hackathons, technical content creation, GitHub statistics, and recommendations for Ravi Kumar Vishwakarma.',
  url: 'https://profileravi.vercel.app/activities',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://profileravi.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Activities', item: 'https://profileravi.vercel.app/activities' },
    ],
  },
};

export const Route = createFileRoute('/activities')({
  head: () => ({
    ...seo(
      'Activities & Open Source Contributions | Ravi Kumar Vishwakarma',
      'Discover Ravi Kumar Vishwakarma’s open source contributions, GitHub activity, hackathon projects, and community recommendations.',
      '/activities',
      undefined,
      'Open Source Contributions, GitHub Activity, Hackathons, Technical Writing, Ravi Vishwakarma Community, AI Developer India'
    ),
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(activitiesLd) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro
        eyebrow="ACTIVITIES"
        title="Curiosity beyond the code."
        description="Open source contributions, hackathons, technical content, and Ravi’s wider engineering journey."
      />
      <ActivitiesSection />
      <GithubSection />
      <TestimonialsSection />
      <ContactTeaser />
    </>
  );
}
