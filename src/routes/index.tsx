import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/portfolio";
import { seo, profile, imagekit } from "@/data/portfolio";
import projects from "@/data/projects.json";

const SITE_URL = "https://profileravi.vercel.app";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Ravi Kumar Vishwakarma | AI Engineer & Data Scientist Portfolio",
      description:
        "Portfolio of Ravi Kumar Vishwakarma — B.Tech CSE (AI & Data Science) student, AI engineer, and data scientist building intelligent systems, RAG applications, and data pipelines.",
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: "Ravi Kumar Vishwakarma Portfolio",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
        ],
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: profile.name,
      alternateName: ["Ravi Vishwakarma"],
      jobTitle: "AI Engineer & Data Scientist",
      url: `${SITE_URL}/`,
      image: imagekit("profileimage.png"),
      sameAs: [
        profile.github,
        profile.linkedin,
        "https://leetcode.com/u/ravivish3481/",
        "https://www.kaggle.com/ravivishwakarma0909",
        "https://topmate.io/ravi_vishwakarma0",
        "https://dev.to/ravi_kumar3481",
        "https://x.com/ravikumar3481",
        "https://www.instagram.com/i_am_ravi.07",
      ],
      affiliation: {
        "@type": "EducationalOrganization",
        name: "AKS University Satna",
        sameAs: "https://www.aksuniversity.ac.in",
      },
      email: profile.email,
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Power BI",
        "Python",
        "SQL",
        "Data Visualization",
        "Automation",
        "Retrieval-Augmented Generation (RAG)",
        "Natural Language Processing",
        "FastAPI",
        "React",
        "LangChain",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Satna",
        addressRegion: "Madhya Pradesh",
        addressCountry: "IN",
      },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#projects`,
      name: "Featured AI, Data Science & Developer Projects by Ravi Kumar Vishwakarma",
      description:
        "AI applications, RAG systems, NLP pipelines, and developer tooling built by Ravi Kumar Vishwakarma.",
      url: `${SITE_URL}/#projects`,
      numberOfItems: projects.slice(0, 4).length,
      itemListElement: projects.slice(0, 4).map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "SoftwareApplication",
          name: p.title.split(" - ")[0],
          headline: p.title,
          description: p.result1,
          url: `${SITE_URL}/projects/${p.slug}`,
          applicationCategory: p.applicationCategory || "BusinessApplication",
          operatingSystem: "Web Browser",
          author: { "@id": `${SITE_URL}/#person` },
          codeRepository: p.codeLink,
          ...(p.liveLink ? { sameAs: p.liveLink } : {}),
        },
      })),
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo(
      "Ravi Kumar Vishwakarma | AI Engineer & Data Scientist",
      "Explore Ravi Kumar Vishwakarma's AI and data science portfolio, including machine learning projects, RAG applications, Python tools, and data analytics.",
      "/",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  component: HomePage,
});
