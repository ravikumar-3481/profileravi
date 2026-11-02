import { createFileRoute } from "@tanstack/react-router";
import {
  PageIntro,
  ActivitiesSection,
  GithubSection,
  TestimonialsSection,
  ContactTeaser,
} from "@/components/portfolio";
import { seo } from "@/data/portfolio";

const activitiesLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://profileravi.vercel.app/activities#webpage",
  name: "Hackathons & Open Source | Ravi Kumar Vishwakarma",
  description:
    "Discover hackathons, open-source projects, and technical workshops completed by Ravi Kumar Vishwakarma, including AI competitions and developer tools.",
  url: "https://profileravi.vercel.app/activities",
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": "https://profileravi.vercel.app/activities#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://profileravi.vercel.app/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Activities",
        item: "https://profileravi.vercel.app/activities",
      },
    ],
  },
};

export const Route = createFileRoute("/activities")({
  head: () => ({
    ...seo(
      "Hackathons & Open Source | Ravi Kumar Vishwakarma",
      "Discover hackathons, open-source projects, and technical workshops completed by Ravi Kumar Vishwakarma, including AI competitions and developer tools.",
      "/activities",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(activitiesLd) }],
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
