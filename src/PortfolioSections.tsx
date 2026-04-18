import { Section } from "../components/layout/Section";
import { AuthorityBody } from "./sections/AuthorityBody";
import { Capabilities } from "../components/sections/Capabilities";
import { Works } from "../components/sections/Works";
import { Journey } from "../components/sections/Journey";
import { Research } from "../components/sections/Research";
import { Career } from "../components/sections/Career";
import { Stance } from "../components/sections/Stance";
import { ContactBody } from "./sections/ContactBody";

export function PortfolioSections() {
  return (
    <>
      <Section
        id="authority"
        className="authority-section"
        tone="paper"
        title="公的な立場・専門性"
        lead="教育現場・学術・公的機関での活動実績"
      >
        <AuthorityBody />
      </Section>

      <Section
        id="capabilities"
        className="capabilities-section"
        tone="white"
        title="できること"
        lead="AIと教育、両方の視点から現場で使える仕組みを作ります"
      >
        <Capabilities />
      </Section>

      <Section
        id="works"
        className="works-section"
        tone="paper"
        title="AI制作実績"
        lead="実際のクライアント様向けに構築した事例"
      >
        <Works />
      </Section>

      <Section
        id="story"
        className="story-section"
        tone="white"
        title="これまでの歩み"
        lead="学校と研究から、地域と実装へ"
      >
        <Journey />
      </Section>

      <Section
        id="research"
        className="research-section"
        tone="paper"
        title="研究・執筆活動"
        lead="教育とAI、臨床心理の領域で論文・発表を行っています"
      >
        <Research />
      </Section>

      <Section
        id="career"
        className="timeline-section career-section"
        tone="white"
        title="経歴"
        lead="教育現場11年 + 大学院での研究 + AI実装（2025年に個人事業として開業）"
      >
        <Career />
      </Section>

      <Section
        id="stance"
        className="stance-section"
        tone="ink"
        parallaxInk
        title="スタンス"
        lead="私はこういう形で仕事をしています"
      >
        <Stance />
      </Section>

      <Section
        id="contact"
        className="contact-section"
        tone="white"
        title="お問い合わせ"
      >
        <ContactBody />
      </Section>
    </>
  );
}
