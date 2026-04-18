import {
  Banknote,
  BarChart3,
  Bot,
  Calculator,
  FileText,
  Home,
  MessagesSquare,
  PenLine,
  ScanLine,
  Search,
  Target,
} from "lucide-react";
import { ProjectCard, type ProjectFeature } from "../ui/ProjectCard";
import { Reveal } from "../ui/Reveal";

const YEBISU_FEATURES: ProjectFeature[] = [
  {
    icon: Calculator,
    title: "物件購入シミュレーター",
    teaser: "購入前後の財務インパクトを1画面で比較・可視化",
    body: "次に買う物件が自社の財務にどう影響するかを即座に分析。DSCR / 自己資本比率 / ROA等を自動計算し、購入前後の変化を可視化。",
  },
  {
    icon: Banknote,
    title: "借入金ポートフォリオ可視化",
    teaser: "複数借入の残高・返済計画をグラフで一元管理",
    body: "複数の借入金を一元管理。残高推移と年次返済計画をグラフで可視化。元利均等返済を自動計算。",
  },
  {
    icon: Home,
    title: "物件パフォーマンスダッシュボード",
    teaser: "利回り・稼働率・キャッシュフローをヒートマップで可視化",
    body: "所有物件ごとの利回り・稼働率・キャッシュフローをヒートマップで表示。好調・不調の物件が一目で分かる。",
  },
  {
    icon: FileText,
    title: "銀行提出資料 自動生成ツール",
    teaser: "融資審査向けサマリーと8指標をA4一枚で自動生成",
    body: "決算書と物件データからA4 1枚の銀行向けサマリーを自動生成。融資審査の8指標を自動計算・判定。",
  },
  {
    icon: Bot,
    title: "経営参謀",
    teaser: "経営判断のための専属の戦略壁打ち相手となる環境を構築。",
    body: "経営判断のための専属の戦略壁打ち相手となる環境を構築。",
  },
  {
    icon: BarChart3,
    title: "統合版経営ダッシュボード",
    teaser: "複数の業務ツールを1つのダッシュボードに統合し、入力とAIプロンプトを連動",
    body: "複数の業務ツールを1つのダッシュボードに統合。一度の入力で全機能に反映、AIプロンプトも自動生成。",
  },
];

const MIRAI_FEATURES: ProjectFeature[] = [
  {
    icon: Search,
    title: "事業ベンチマーク分析",
    teaser: "競合の事業モデルをAIで分析し、戦略会議の議論のたたき台に",
    body: "競合の事業モデルをAI駆動で徹底分析。戦略会議で使える「議論のたたき台」として資料化。",
  },
  {
    icon: Target,
    title: "戦略会議パートナー",
    teaser: "新規事業検討向けのAI参謀として、会議中の壁打ち相手に",
    body: "新規事業検討用のAI参謀。会議中の壁打ち相手として活用。",
  },
  {
    icon: MessagesSquare,
    title: "イベント企画パートナー（壁打ちアシスタント）",
    teaser:
      "子ども向け体験イベントの企画段階で、代表と同じ前提でアイデアを練る対話環境",
    body: "スポーツ・理科・野外が組み合わさる体験づくりを核に、季節や会場、対象年齢、日帰り／宿泊などの条件からプログラムの骨子を言語化。安全配慮と保護者に伝わる価値、当日の見せ方までを論点に含めた対話設計にし、具体的な実験・おやつ・流れのたたき台を一緒に組み立てられるよう整備しています。",
  },
];

const PERSONAL_FEATURES: ProjectFeature[] = [
  {
    icon: PenLine,
    title: "推敲ツール（小説の文章健康診断）",
    teaser: "推敲のヒントを返すブラウザ向けサービス（個人プロダクト・β）",
    body: "LINEオープンチャットで、日本語の文章に悩み、指摘に耐えられず退会していく人を見たことが開発のきっかけ。作品の点数化ではなく、次の一行に進むための推敲ヒントを返すブラウザ向けサービス。",
  },
  {
    icon: ScanLine,
    title: "SmartCapturer",
    teaser: "フルページキャプチャのChrome拡張（開発一時保留・学習継続中）",
    body: "Chrome 拡張でページを縦に繋ぎ、一枚の画像／PDF にまとめるツールを目指した個人プロジェクトです（GoFullPage 系の体験を参考）。ビューポートや固定ヘッダなどサイト差分の扱いが想定以上に広く、開発は一時保留。Extension・CDP・キャンバス連結まわりを学習し直しています。",
  },
];

export function Works() {
  return (
    <div className="works-root flex flex-col gap-8">
      <aside className="works-trust-note" aria-label="守秘義務と対応規模の補足">
        <p className="works-trust-note-text">
          一部実績は守秘義務契約により詳細を匿名化していますが、
          <span className="works-trust-badge">
            大手IT企業グループを含む案件にも対応しています。
          </span>
        </p>
      </aside>

      <Reveal delayMs={100}>
      <section
        className="works-foundation rounded-card border border-brand-line bg-white p-5 shadow-card md:p-6"
        id="foundation"
        aria-labelledby="works-foundation-title"
      >
        <p className="works-foundation-kicker">土台となっている運用知見</p>
        <h3
          className="works-foundation-title h-card"
          id="works-foundation-title"
        >
          AI実装の原点・長文生成の運用経験
        </h3>
        <p className="works-foundation-lead">
          文章生成AIを、趣味の領域で徹底的に運用してきた経験が、実務の制作実績を支える「表現設計」と「長文・構造化生成の運用知見」の土台になっています。
          この運用知見は、
          <a href="#works-grid" className="works-foundation-link">
            経営資料の自動生成ツールや意思決定支援
          </a>
          にそのまま転用しています。
        </p>
        <ul className="works-foundation-bullets" aria-label="主な実績の要約">
          <li>
            長編小説生成の仕組み化（投稿サイト内評価・上位0.2%帯の維持、公式OP・ノベルゲーム化など）
          </li>
          <li>ファンタジー小説大賞「大賞」</li>
          <li>歴史・時代小説大賞「読者賞（読者投票1位）」</li>
          <li>その他、奨励賞を複数受賞</li>
        </ul>
      </section>
      </Reveal>

      <div className="works-project-grid grid gap-6" id="works-grid">
        <Reveal delayMs={200}>
        <ProjectCard
          index={1}
          industryTag="不動産 × 金融 × 経営"
          clientMeta="クライアント: 株式会社YEBISU 様"
          title="株式会社YEBISU様 プロジェクト群"
          subtitle="不動産 × 金融 × 経営判断の統合AIツール群"
          description="不動産・金融・経営判断をつなぐAIツールを、同一クライアント向けに継続的に設計・実装。"
          features={YEBISU_FEATURES}
        />
        </Reveal>
        <ProjectCard
          index={2}
          industryTag="教育 × 新規事業"
          clientMeta="クライアント: 一般社団法人MiRAI 様"
          title="一般社団法人MiRAI様 プロジェクト群"
          subtitle="戦略支援と、体験型イベント企画の壁打ちパートナー"
          description="地域の子どもと家族に届く教育・体験事業を支えるMiRAI様向けに、競合分析から新規事業の戦略会議までの参謀に加え、年間を通じた体験型イベントの企画フェーズで使う対話型アシスタントを設計・実装しています。ミッションと現場の条件を前提に、担当者が思考を深めやすい対話の型をプロンプトと利用手順に落とし込んでいます。"
          features={MIRAI_FEATURES}
        />
        <ProjectCard
          index={3}
          industryTag="個人開発・検証"
          clientMeta="区分: 個人開発・学習（クライアント案件外）"
          title="個人プロジェクト群"
          subtitle="趣味と仕事のあいだで育てる、個人のプロダクトと技術検証"
          description="依頼案件の傍ら、自分の課題や興味から立ち上げたブラウザ向けサービスや拡張機能です。完成スピードより、試行と学びを積み重ねながら形にしています。"
          features={PERSONAL_FEATURES}
        />
      </div>
    </div>
  );
}
