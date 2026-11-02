import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ContactSection } from "@/components/portfolio";
import { seo } from "@/data/portfolio";

const contactLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://profileravi.vercel.app/contact#webpage",
  name: "Contact Ravi Kumar Vishwakarma | AI & Data Roles",
  description:
    "Connect with Ravi Kumar Vishwakarma for AI engineering, data science, and machine learning opportunities, full-time roles, or technical collaborations.",
  url: "https://profileravi.vercel.app/contact",
  mainEntity: {
    "@type": "Person",
    name: "Ravi Kumar Vishwakarma",
    alternateName: ["Ravi Vishwakarma"],
    email: "ravivish968@gmail.com",
    url: "https://profileravi.vercel.app/",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": "https://profileravi.vercel.app/contact#breadcrumb",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://profileravi.vercel.app/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: "https://profileravi.vercel.app/contact",
      },
    ],
  },
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...seo(
      "Contact Ravi Kumar Vishwakarma | AI & Data Roles",
      "Connect with Ravi Kumar Vishwakarma for AI engineering, data science, and machine learning opportunities, full-time roles, or technical collaborations.",
      "/contact",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(contactLd) }],
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
