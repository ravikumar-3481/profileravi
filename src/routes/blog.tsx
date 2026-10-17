import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, BlogSection, ContactTeaser } from '@/components/portfolio';
import { seo } from '@/data/portfolio';

const blogLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Technical Blog & Writing | Ravi Kumar Vishwakarma',
  description:
    'Read articles by Ravi Kumar Vishwakarma on Autonomous AI Agents, Agentic Workflows, Jev AI, LLMs, and Machine Learning Systems.',
  url: 'https://profileravi.vercel.app/blog',
  author: {
    '@type': 'Person',
    name: 'Ravi Kumar Vishwakarma',
    url: 'https://profileravi.vercel.app/',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://profileravi.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://profileravi.vercel.app/blog' },
    ],
  },
};

export const Route = createFileRoute('/blog')({
  head: () => ({
    ...seo(
      'AI & Tech Blog | Ravi Kumar Vishwakarma',
      'Read in-depth technical articles by Ravi Kumar Vishwakarma on Autonomous AI Agents, Agentic Workflows, Movie Recommendation Systems, Gemini vs Copilot, and LLMs.',
      '/blog',
      undefined,
      'AI Blog, Autonomous AI Agents, Agentic Workflows, LLM Tutorial, Movie Recommendation Machine Learning, Ravi Vishwakarma Dev.to, Tech Articles'
    ),
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(blogLd) }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageIntro
        eyebrow="WRITING & IDEAS"
        title="Notes from the journey."
        description="Read Ravi Vishwakarma’s articles on AI, machine learning, development, and the ideas behind his projects."
      />
      <BlogSection full />
      <ContactTeaser />
    </>
  );
}
