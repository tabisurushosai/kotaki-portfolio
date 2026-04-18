import { Fragment } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Calculator,
  FileStack,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Reveal } from "../ui/Reveal";

const ICON_MAP: Record<string, LucideIcon> = {
  Calculator,
  BarChart3,
  BookOpen,
  Sparkles,
  FileStack,
  GraduationCap,
};

const CAPABILITY_ITEMS = [
  {
    icon: "Calculator",
    title: "業務特化シミュレーター構築",
    desc: "業務の意思決定を数字で支援する計算ツールを設計・実装します。BS/PL連携、指標自動計算まで対応。",
  },
  {
    icon: "BarChart3",
    title: "データ可視化ダッシュボード",
    desc: "散らばっている数字を一画面で把握できる形に整えます。グラフ・ヒートマップ・リアルタイム集計。",
  },
  {
    icon: "BookOpen",
    title: "NotebookLM参謀の設計",
    desc: "貴社専用のAI壁打ち相手を構築します。ソース選定、プロンプト設計、運用テンプレート作成まで。",
  },
  {
    icon: "Sparkles",
    title: "AIプロンプト設計",
    desc: "ClaudeやGeminiが最大限活きるプロンプトを設計。業務フローに組み込める形で納品します。",
  },
  {
    icon: "FileStack",
    title: "AI連携による資料自動化",
    desc: "入力データから事業計画書やスライド用プロンプトを自動生成する仕組みを作ります。",
  },
  {
    icon: "GraduationCap",
    title: "AI活用教育・研修設計",
    desc: "教員・経営者向けのAI活用研修を設計・実施。大学院での研究成果を実務に落とし込んでいます。",
  },
] as const;

export function Capabilities() {
  return (
    <div className="capabilities-root">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITY_ITEMS.map((item, index) => {
          const Icon = ICON_MAP[item.icon];
          const card = (
            <article className="capability-card">
              <div className="capability-card-icon" aria-hidden>
                <Icon size={24} strokeWidth={1.75} className="text-brand-primary" />
              </div>
              <h3 className="capability-card-heading h-card">{item.title}</h3>
              <p className="capability-card-desc">{item.desc}</p>
            </article>
          );
          if (index === 0) {
            return (
              <Reveal key={item.title} delayMs={100}>
                {card}
              </Reveal>
            );
          }
          return <Fragment key={item.title}>{card}</Fragment>;
        })}
      </div>

      <p className="capabilities-bridge">
        次の「AI制作実績」では、これらを実際の案件でどう形にしたかを具体例でまとめています。
      </p>

      <p className="capabilities-footnote">
        ※ いずれも「現場で運用が回る」ところまで含めて設計します。
      </p>
    </div>
  );
}
