import { Reveal } from "../ui/Reveal";

type CareerEvent = {
  id: string;
  /** 期間表示（chip 内） */
  period: string;
  role: string;
  notes?: string[];
  current?: boolean;
  latest?: boolean;
};

type CareerBand = {
  id: string;
  /** 左軸の見出し（年度帯） */
  axisLabel: string;
  events: CareerEvent[];
};

/**
 * 上が新しい。同一 axis 内は並走（縦並び）。
 * sort はデータ配列の順序で固定（手動で年度降順を維持）。
 */
const CAREER_BANDS: CareerBand[] = [
  {
    id: "2026",
    axisLabel: "2026 –",
    events: [
      {
        id: "mirai",
        period: "2026 –",
        role: "MiRAIアカデミー小中等部の立ち上げに参画",
        notes: [
          "オープンスクール（午前）の運営や現場の運営を支援しつつ、AI × 教育のツール開発・実装にも関わっています。",
        ],
        current: true,
        latest: true,
      },
    ],
  },
  {
    id: "2025",
    axisLabel: "2025 –",
    events: [
      {
        id: "sole",
        period: "2025 –",
        role: "個人事業主として開業（商号：小瀧創造企画）",
        current: true,
      },
      {
        id: "juku",
        period: "2025 –",
        role: "塾講師",
        notes: ["小中学生向けの学習指導（個別指導を中心）。"],
        current: true,
      },
    ],
  },
  {
    id: "2022-2025",
    axisLabel: "2022 – 2025",
    events: [
      {
        id: "kasado",
        period: "2022 – 2025",
        role: "鈴鹿市立加佐登小学校 教諭",
      },
    ],
  },
  {
    id: "2021-2022",
    axisLabel: "2021 – 2022",
    events: [
      {
        id: "tenei",
        period: "2021 – 2022",
        role: "鈴鹿市立天栄中学校 教諭",
        notes: [
          "教諭職と並行し、三重県教育委員会 研修員として県総合教育センターで研究に従事。",
        ],
      },
      {
        id: "kenshuu-2122",
        period: "2021 – 2022",
        role: "三重県教育委員会 研修員（三重県総合教育センター）",
        notes: [
          "県教委事務局 研修担当として研究。天栄中学校の教諭職と並行。",
        ],
      },
    ],
  },
  {
    id: "2020-2022-iroha",
    axisLabel: "2020 – 2022",
    events: [
      {
        id: "iroha",
        period: "2020 – 2022",
        role: "牧田いろは教室 スタッフ（日本語指導・ボランティア）",
        notes: ["成人の外国籍の学習者向けに日本語を担当。"],
      },
    ],
  },
  {
    id: "2020-2021",
    axisLabel: "2020 – 2021",
    events: [
      {
        id: "kanbe",
        period: "2020 – 2021",
        role: "鈴鹿市立神戸小学校 教諭",
        notes: [
          "教諭職と並行し、三重県教育委員会 研修員として県総合教育センターで研究に従事。",
        ],
      },
      {
        id: "kenshuu-2021",
        period: "2020 – 2021",
        role: "三重県教育委員会 研修員（三重県総合教育センター）",
        notes: [
          "県教委事務局 研修担当として研究。神戸小学校の教諭職と並行。",
        ],
      },
    ],
  },
  {
    id: "2018-2021",
    axisLabel: "2018 – 2021",
    events: [
      {
        id: "grad",
        period: "2018 – 2021",
        role: "三重大学大学院 教育学研究科 教育科学専攻 学校教育領域 修了",
        notes: [
          "夜間大学院として勤務と両立。日中は小学校教諭および三重県教育委員会の研修員として従事。",
        ],
      },
    ],
  },
  {
    id: "2014-2020",
    axisLabel: "2014 – 2020",
    events: [
      {
        id: "inao",
        period: "2014 – 2020",
        role: "鈴鹿市立稲生小学校 教諭",
      },
    ],
  },
  {
    id: "2010-2014",
    axisLabel: "2010 – 2014",
    events: [
      {
        id: "kogakukan",
        period: "2010 – 2014",
        role: "皇學館大学教育学部 教育学科 学校教育コース 卒業",
      },
    ],
  },
  {
    id: "2007-2010",
    axisLabel: "2007 – 2010",
    events: [
      {
        id: "matsusaka-hs",
        period: "2007 – 2010",
        role: "三重県立松阪高等学校 卒業",
      },
    ],
  },
];

function CareerEventCard({ event }: { event: CareerEvent }) {
  return (
    <article
      className={
        "career-event-card" +
        (event.current ? " is-current" : "") +
        (event.latest ? " is-latest" : "")
      }
    >
      <span className="career-period-chip">{event.period}</span>
      <h3 className="career-event-role h-card">{event.role}</h3>
      {event.notes?.length ? (
        <div className="career-event-notes">
          {event.notes.slice(0, 2).map((line, i) => (
            <p key={i} className="career-event-note">
              {line}
            </p>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function Career() {
  return (
    <div className="career-axis-timeline" aria-label="経歴の年度軸タイムライン">
      {CAREER_BANDS.map((band, bi) => (
        <div key={band.id} className="career-timeline-row">
          <div className="career-timeline-axis">
            <span className="career-timeline-axis-label">{band.axisLabel}</span>
          </div>
          <div className="career-timeline-stack">
            {band.events.map((event, ei) =>
              bi === 0 && ei === 0 ? (
                <Reveal key={event.id} delayMs={100}>
                  <CareerEventCard event={event} />
                </Reveal>
              ) : (
                <CareerEventCard key={event.id} event={event} />
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
