import { useId, useState } from "react";
import { cn } from "../cn";
import { Reveal } from "../ui/Reveal";

type JourneyItem = {
  step: number;
  year: string;
  title: string;
  intro: string;
  /** 「──」始まりの引用一行（視覚的な軸） */
  pullQuote: string;
  outro: string;
};

const JOURNEY_ITEMS: JourneyItem[] = [
  {
    step: 1,
    year: "高校",
    title: "高校でつまずき、立ち直るまで",
    intro:
      "高校時代、学業でかなりつまずきました。「できない・分からない」ことが続く日々はつらく、努力から目をそらしてしまうこともありました。そこから持ち直すまでには、時間も、気持ちの整理も必要でした。",
    pullQuote:
      "── 同じように苦しい思いをしている人がいたら、寄り添える側に立ちたい——その思いが、教師を志す原点のひとつになっています。",
    outro: "",
  },
  {
    step: 2,
    year: "学生〜新卒",
    title: "研究と、学校現場での実践",
    intro:
      "学生時代、スクールカウンセラーが開く夜の学習・居場所支援で、アルバイトスタッフとして多様な生徒と関わりました。適応指導教室のキャンプや、長期不登校の生徒との関係づくりを通じて、小さな変化が人生を動かす瞬間に立ち会ってきました。その原体験から、当初は中学校志望でしたが、",
    pullQuote:
      "── 「もっと早い段階から支えたい」と考え、小学校段階での支援へ軸足を移しました。「下から支え、寄りかかれる大木のような存在でありたい」——その姿勢は、ここから始まっています。",
    outro: "",
  },
  {
    step: 3,
    year: "教員・大学院",
    title: "論文と学会で、知見を積み上げる",
    intro:
      "現場で「もっと良くできるはずだ」と感じた課題を深めるため、働きながら三重大学大学院（夜間コース・長期履修）で研究を続けました。その間も、査読付き論文の執筆や学会発表を通じて、",
    pullQuote:
      "── 現場での手応えを言語化し、知見を積み上げてきました。",
    outro: "",
  },
  {
    step: 4,
    year: "研修員",
    title: "県全体の教員支援の場へ",
    intro:
      "実践と研究の蓄積が評価され、三重県教育委員会の研修員として、三重県総合教育センター（県の教員研修の中核）で研究に携わりました。その後も学校現場と研修の往還を続けながら、",
    pullQuote:
      "── 「まだできることがある」という思いを持ち続け、現在の活動へつなげています。",
    outro: "",
  },
  {
    step: 5,
    year: "2025年〜",
    title: "個人事業として、設計・実装の軸を一本に",
    intro: "2025年、個人事業主として開業しました。",
    pullQuote:
      "── 商号は「小瀧創造企画」。学校現場での検証と学術的な裏付けをひとつの軸にまとめ、依頼に応じてAIの設計・実装につなげる体制を整えました。",
    outro: "",
  },
  {
    step: 6,
    year: "MiRAI",
    title: "MiRAIアカデミーに参画",
    intro: "いまは、MiRAIアカデミー小中等部の立ち上げにも参画しています。",
    pullQuote:
      "── 「子どもたちに未来を楽しむ力を育み、地域の教育インフラを創る」というビジョンの実現に向け、オープンスクールや運営の支援に加え、AI × 教育のツールづくりにも関わっています。",
    outro: "",
  },
  {
    step: 7,
    year: "いま",
    title: "子どもと地域の両方へ",
    intro: "",
    pullQuote:
      "── 子どもたちには、誇れるように「ちゃんとメシが食える」大人として社会で立っていってほしい。その思いから、AIを道具として使いこなし、社会で通用する力を育てることに寄与したいと考えています。",
    outro:
      "あわせて、株式会社YEBISU 代表の水谷真也さんとともに、三重・愛知の中小企業を支えるため、AIを活用した業務の効率化や、経営判断を速くするための伴走支援にも取り組み始めています。",
  },
];

const INITIAL_VISIBLE = 3;

export function Journey() {
  const [expanded, setExpanded] = useState(false);
  const rootId = useId();
  const moreId = `${rootId}-more`;

  return (
    <div
      className={cn("journey-root", expanded && "journey-root--expanded")}
      aria-label="これまでの歩み"
    >
      <div className="journey-rail">
        {JOURNEY_ITEMS.slice(0, INITIAL_VISIBLE).map((item, idx) =>
          idx === 0 ? (
            <Reveal key={item.step} delayMs={100}>
              <JourneyStep item={item} />
            </Reveal>
          ) : (
            <JourneyStep key={item.step} item={item} />
          )
        )}

        <div id={moreId} className="journey-more">
          {JOURNEY_ITEMS.slice(INITIAL_VISIBLE).map((item) => (
            <JourneyStep key={item.step} item={item} />
          ))}
        </div>
      </div>

      {!expanded ? (
        <button
          type="button"
          className="journey-expand-btn"
          aria-expanded="false"
          aria-controls={moreId}
          aria-label="歩みの続きをすべて表示する"
          onClick={() => setExpanded(true)}
        >
          全て読む
        </button>
      ) : null}
    </div>
  );
}

function JourneyStep({ item }: { item: JourneyItem }) {
  return (
    <div className="journey-step">
      <span className="journey-marker mix-en" aria-hidden>
        {item.step}
      </span>
      <div className="journey-step-content">
        <p className="journey-year">{item.year}</p>
        <h3 className="journey-title h-card">{item.title}</h3>
        {item.intro ? (
          <p className="journey-body">{item.intro}</p>
        ) : null}
        <blockquote className="journey-pull">{item.pullQuote}</blockquote>
        {item.outro ? <p className="journey-body">{item.outro}</p> : null}
      </div>
    </div>
  );
}
