import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { CINII_URL, SCHOLAR_URL } from "../../src/config/site";
import { Chip } from "../ui/Chip";
import { Reveal } from "../ui/Reveal";

type ResearchKind = "paper" | "conference" | "award";

type ResearchItem = {
  id: string;
  kind: ResearchKind;
  year: number;
  title: string;
  /** 著者・掲載誌・巻号など（1行ずつ、muted で表示） */
  metaLines: string[];
  tags?: string[];
};

const KIND_ORDER: Record<ResearchKind, number> = {
  paper: 0,
  conference: 1,
  award: 2,
};

const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "paper-2025-giga",
    kind: "paper",
    year: 2025,
    title: "生成AIの教育活用に関する一考察：GIGAスクール構想と未来展望",
    metaLines: [
      "稲垣友裕, 小瀧雄基",
      "常葉大学浜松キャンパス教職課程研究年報",
      "第2号 1-7, 2025",
    ],
  },
  {
    id: "paper-2024-ai-shidouan",
    kind: "paper",
    year: 2024,
    title:
      "教育の質向上を目指したAI活用の実践と評価：文章生成AIを用いた指導案作成と授業実践の有効性の検証",
    metaLines: [
      "小瀧雄基, 稲垣友裕",
      "日本基礎教育学会紀要",
      "第29号 177-184, 2024",
    ],
    tags: ["査読付き", "学会誌"],
  },
  {
    id: "paper-2024-ict-tokubetsu",
    kind: "paper",
    year: 2024,
    title: "特別支援教育における情報通信技術の活用：保護者との連携に焦点を当てて",
    metaLines: [
      "稲垣友裕, 小瀧雄基",
      "常葉大学浜松キャンパス教職課程研究年報",
      "第1号 1-10, 2024",
    ],
  },
  {
    id: "paper-2023-hojitsu",
    kind: "paper",
    year: 2023,
    title:
      "ねらい到達に寄与する補助発問の有効性の検証：小学校1年生における「特別の教科 道徳」と国語科の実践より",
    metaLines: [
      "稲垣友裕, 小瀧雄基",
      "日本基礎教育学会紀要",
      "第28号 59-64, 2023",
    ],
    tags: ["査読付き", "学会誌"],
  },
  {
    id: "conf-2023-jbes",
    kind: "conference",
    year: 2023,
    title:
      "ねらい到達に寄与する補助発問の有効性の検証：小学校1年生における「特別の教科 道徳」と国語科の実践より",
    metaLines: [
      "日本基礎教育学会 第28回研究大会",
      "会場：オンライン（Zoom） / 登壇日：2023年8月19日",
      "備考：共同研究者（稲垣友裕氏）の代理で登壇、研究発表を担当",
    ],
  },
  {
    id: "paper-2022-column",
    kind: "paper",
    year: 2022,
    title: "（萩原浩司）『ゼミナール初等社会科』へのコラム寄稿（2本）",
    metaLines: [
      "皇學館大学出版部",
      "2022年3月 / ISBN: 9784876442218",
      "皇學館大学の元教育学部長、深草正博教授のゼミでゼミ長を務めた経緯を踏まえ、後任の萩原浩司准教授からの依頼で寄稿。",
    ],
    tags: ["寄稿", "書籍"],
  },
  {
    id: "award-2025-sougakushou",
    kind: "award",
    year: 2025,
    title: "第1回 創學賞（2025年2月）",
    metaLines: [
      "授与団体：深草会（皇學館大学 教育学部 深草ゼミ・萩原ゼミ OBOG研究会）",
      "対象研究：「補助発問による発言変容の有効性 ―小学校実践から学ぶ発問の工夫―」",
      "概要：小学校における教育実践に基づく学術研究の成果が評価され、同会が創設した「創學賞」の第1回受賞者に選出。",
    ],
    tags: ["創學賞"],
  },
];

function sortResearchItems(items: ResearchItem[]): ResearchItem[] {
  return [...items].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return KIND_ORDER[a.kind] - KIND_ORDER[b.kind];
  });
}

const FILTER_TABS: { id: "all" | ResearchKind; label: string }[] = [
  { id: "all", label: "すべて" },
  { id: "paper", label: "論文" },
  { id: "conference", label: "学会発表" },
  { id: "award", label: "受賞" },
];

function ResearchOutputCard({ item }: { item: ResearchItem }) {
  const kindLabel =
    item.kind === "conference" ? "発表" : item.kind === "award" ? "受賞" : null;

  return (
    <article className="research-output-card">
      <div className="research-year-badge" aria-hidden="true">
        {item.year}
      </div>
      <div className="research-output-card__body">
        {kindLabel ? (
          <span className="research-kind-label">{kindLabel}</span>
        ) : null}
        <h3 className="research-output-card__title h-card">{item.title}</h3>
        <div className="research-output-card__meta">
          {item.metaLines.map((line, i) => (
            <p key={i} className="research-meta-line">
              {line}
            </p>
          ))}
        </div>
        {item.tags?.length ? (
          <div className="research-output-card__tags">
            {item.tags.map((t) => (
              <Chip key={t} variant="tag">
                {t}
              </Chip>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function Research() {
  const [filter, setFilter] = useState<"all" | ResearchKind>("all");

  const sorted = useMemo(() => sortResearchItems(RESEARCH_ITEMS), []);

  const visible = useMemo(
    () => (filter === "all" ? sorted : sorted.filter((i) => i.kind === filter)),
    [sorted, filter]
  );

  return (
    <>
      <aside
        className="research-profile-chip"
        aria-labelledby="research-collab-heading"
      >
        <p className="research-profile-chip__kicker" id="research-collab-heading">
          共同研究者
        </p>
        <p className="research-profile-chip__name h-card">稲垣友裕</p>
        <p className="research-profile-chip__affil">
          常葉大学 健康プロデュース学部 スポーツ健康科学科 講師
        </p>
        <p className="research-profile-chip__story">
          三重大学大学院在学時に同じ学生として出会い、共同研究を開始しました。
        </p>
      </aside>

      <div className="research-output-wrap" aria-label="研究・執筆アウトプット">
        <div className="research-filter-tabs" role="tablist" aria-label="表示の切り替え">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              className={
                "research-filter-tab" + (filter === tab.id ? " is-active" : "")
              }
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="research-output-list">
          {visible.map((item, idx) =>
            idx === 0 ? (
              <Reveal key={item.id} delayMs={100}>
                <ResearchOutputCard item={item} />
              </Reveal>
            ) : (
              <ResearchOutputCard key={item.id} item={item} />
            )
          )}
        </div>
      </div>

      <nav className="research-external-links" aria-label="研究プロフィール・論文データベース">
        <a
          className="research-external-link"
          href={SCHOLAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Google Scholar — 著者名で検索した一覧を開きます"
        >
          <span className="research-external-link__icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </span>
          <span className="research-external-link__label">Google Scholar</span>
          <ExternalLink className="research-external-link__external" size={14} aria-hidden />
        </a>
        <a
          className="research-external-link"
          href={CINII_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="CiNii Research — 国立情報学研究所の学術情報ナビゲータで検索"
        >
          <span className="research-external-link__icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </span>
          <span className="research-external-link__label">CiNii Research</span>
          <ExternalLink className="research-external-link__external" size={14} aria-hidden />
        </a>
      </nav>
    </>
  );
}
