import { SCHOLARLY_PUBLICATIONS } from "@/lib/research-scholarly-articles";
import { getSiteOrigin } from "@/lib/site-origin";

const SCHOLAR_URL =
  "https://scholar.google.com/scholar?hl=ja&as_sdt=0%2C5&q=%E5%B0%8F%E7%80%A7%E9%9B%84%E5%9F%BA&btnG=";
const CINII_PROFILE_URL =
  "https://cir.nii.ac.jp/all?q=%E5%B0%8F%E7%80%A7%E9%9B%84%E5%9F%BA";

export function buildSchemaOrgGraph(): Record<string, unknown> {
  const origin = getSiteOrigin();
  const personId = `${origin}/#person`;
  const serviceId = `${origin}/#service`;
  const websiteId = `${origin}/#website`;

  const person = {
    "@type": "Person",
    "@id": personId,
    name: "小瀧雄基",
    alternateName: "Yuki Kotaki",
    url: origin,
    jobTitle: "個人事業主（小瀧創造企画）・教育×AI×実装",
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "三重大学大学院",
      },
      {
        "@type": "EducationalOrganization",
        name: "皇學館大学",
      },
    ],
    knowsAbout: ["教育工学", "生成AI", "学校心理", "業務設計"],
    sameAs: [SCHOLAR_URL, CINII_PROFILE_URL],
  };

  const service = {
    "@type": "ProfessionalService",
    "@id": serviceId,
    name: "小瀧創造企画",
    provider: { "@id": personId },
    areaServed: [
      { "@type": "AdministrativeArea", name: "三重県" },
      { "@type": "AdministrativeArea", name: "愛知県" },
    ],
    serviceType: "AI実装支援 / 教育研修設計",
    url: origin,
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: origin,
    name: "小瀧雄基 | 教育 × AI × 実装",
    inLanguage: "ja",
    publisher: { "@id": personId },
  };

  const articles = SCHOLARLY_PUBLICATIONS.map((pub) => ({
    "@type": "ScholarlyArticle",
    "@id": `${origin}/#article-${pub.slug}`,
    headline: pub.headline,
    datePublished: pub.datePublished,
    url: pub.url,
    author: pub.authors.map((name) => ({
      "@type": "Person",
      name,
    })),
    isPartOf: {
      "@type": "Periodical",
      name: pub.publicationName,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [person, service, website, ...articles],
  };
}
