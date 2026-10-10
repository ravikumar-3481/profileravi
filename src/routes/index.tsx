
import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/components/portfolio';
import { seo, profile } from '@/data/portfolio';

const SITE_URL = 'https://profileravi.vercel.app';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: profile.name,
      jobTitle: 'B.Tech CSE (AI & Data Science) Student',
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/og/img.webp`,
      sameAs: [profile.github, profile.linkedin],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'AKS University Satna',
        sameAs: 'https://www.aksuniversity.ac.in',
      },
      email: profile.email,
      knowsAbout: [
        'Artificial Intelligence',
        'Machine Learning',
        'Data Science',
        'Power BI',
        'Python',
        'SQL',
        'Data Visualization',
        'Business Analytics',
        'Automation',
        'UI/UX Design',
        'Figma',
        'Retrieval-Augmented Generation (RAG)',
        'Natural Language Processing',
        'Research',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Satna',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#projects`,
      name: 'Featured AI, Data Science & Full-Stack Projects by Ravi Kumar Vishwakarma',
      description:
        'AI applications, RAG systems, NLP pipelines, and data projects built by Ravi Kumar Vishwakarma.',
      url: `${SITE_URL}/#projects`,
      numberOfItems: 3,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Aura Health - AI-Powered Health Awareness Chatbot',
            headline: 'Source-Based Multilingual Health Awareness Chatbot',
            description:
              'A multilingual AI health awareness assistant using trusted health sources, RAG architecture, Mistral AI, and emergency symptom detection.',
            url: `${SITE_URL}/project/aura-health-chatbot`,
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web Browser',
            inLanguage: ['en', 'hi'],
            keywords: [
              'AI Chatbot',
              'RAG',
              'Healthcare AI',
              'FastAPI',
              'React',
              'LangChain',
              'Mistral AI',
              'Supabase',
              'Multilingual NLP',
            ],
            author: { '@id': `${SITE_URL}/#person` },
            codeRepository:
              'https://github.com/ravikumar-3481/health-awareness-chatbot',
            sameAs: 'https://aura-health-ai-assistence.vercel.app/',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'MeetingSense AI - AI Meeting Assistant',
            headline: 'Searchable AI Meeting Knowledge Assistant',
            description:
              'An AI meeting assistant that turns recordings, audio files, and transcripts into searchable knowledge using agent workflows, vector search, and multilingual transcription.',
            url: `${SITE_URL}/project/meetingsense-ai`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            inLanguage: ['en', 'hi'],
            keywords: [
              'AI Meeting Assistant',
              'LangGraph',
              'LangChain',
              'Pinecone',
              'Speech-to-Text',
              'Deepgram',
              'Sarvam AI',
              'FastAPI',
              'React',
              'Vector Search',
            ],
            author: { '@id': `${SITE_URL}/#person` },
            codeRepository:
              'https://github.com/ravikumar-3481/ai_meeting_assistence',
            sameAs: 'https://ai-meeting-assistence.vercel.app/',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'SoftwareApplication',
            name: 'NewsPulse AI - NLP Sentiment Analysis Pipeline',
            headline: 'Automated NLP Sentiment Analysis Pipeline',
            description:
              'An automated web-scraping ETL and NLP pipeline that analyzes news sentiment and presents insights through interactive Streamlit and Plotly dashboards.',
            url: `${SITE_URL}/project/newspulse-ai`,
            applicationCategory: 'DataAnalyticsApplication',
            operatingSystem: 'Web Browser',
            inLanguage: 'en',
            keywords: [
              'NLP',
              'Sentiment Analysis',
              'Python',
              'Streamlit',
              'NLTK',
              'TextBlob',
              'BeautifulSoup',
              'ETL Pipeline',
              'Data Science',
              'Plotly',
            ],
            author: { '@id': `${SITE_URL}/#person` },
            codeRepository:
              'https://github.com/ravikumar-3481/news-sentiment-analyser-',
            sameAs: 'https://news-pulse-ai.streamlit.app/',
          },
        },
      ],
    },
  ],
};

export const Route = createFileRoute('/')({
  head: () => ({
    ...seo(
      'Ravi Kumar Vishwakarma | AI Engineer & Data Scientist',
      "Explore Ravi Kumar Vishwakarma's AI and data science portfolio, including machine learning projects, RAG applications, Python tools, and data analytics."
    ),
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  component: HomePage,
});
