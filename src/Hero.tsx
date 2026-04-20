import { Container } from "../components/layout/Container";
import { HeroKpiAnimatedNumber } from "../components/ui/HeroKpiAnimatedNumber";

/**
 * ヒーロー画像: 本リポジトリは Vite のため next/image は未使用。
 * priority + sizes に相当するため loading="eager" / fetchPriority="high" / sizes を指定。
 */
export function Hero() {
  return (
    <section
      className="hero-section relative overflow-hidden bg-brand-paper text-left"
      aria-labelledby="hero-heading"
    >
      <div className="hero-grain pointer-events-none absolute inset-0 z-0" aria-hidden />
      <Container className="relative z-[1] py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 lg:gap-16 md:items-center">
          <div className="order-2 flex flex-col md:order-1">
            <p className="hero-eyebrow">教育 × AI × 実装</p>

            <h1 id="hero-heading" className="hero-headline text-balance">
              <span className="block">中小企業の経営判断と、</span>
              <span className="block">学校現場の業務を、AIで軽くします。</span>
            </h1>

            <p className="hero-lead mt-5 max-w-2xl">
              現場で使えるAIツールを、教育と臨床の視点で設計し、実装まで一貫して行います。
            </p>

            <ul
              className="hero-kpi-bar mt-8"
              aria-label="主な実績と資格"
            >
              <li className="hero-kpi-item">
                <span className="hero-kpi-value">
                  <HeroKpiAnimatedNumber value={11} durationMs={500} />
                </span>
                <span className="hero-kpi-label">教員歴（年）</span>
              </li>
              <li className="hero-kpi-item">
                <span className="hero-kpi-value">修士</span>
                <span className="hero-kpi-label">
                  教育学修士（夜間課程で研究と並走）
                </span>
              </li>
              <li className="hero-kpi-item">
                <span className="hero-kpi-value">心理士</span>
                <span className="hero-kpi-label">
                  学校心理士 / 三重県支部 副支部長
                </span>
              </li>
            </ul>

            <div className="hero-cta-row mt-8 flex flex-wrap gap-3">
              <a href="#works" className="hero-cta">
                AI制作実績を見る
              </a>
              <a href="#contact" className="hero-cta">
                お問い合わせの流れ
              </a>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2 md:justify-end md:pt-1">
            <div className="hero-photo-wrap">
              <img
                className="hero-photo"
                src="/kotaki-profile.png"
                alt="小瀧雄基の顔写真"
                width={1024}
                height={1024}
                sizes="(max-width: 768px) 160px, 224px"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
