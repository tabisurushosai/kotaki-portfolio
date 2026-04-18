import { CINII_URL, SCHOLAR_URL } from "./config/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <p className="footer-name">小瀧 雄基 / Yuki Kotaki</p>
      <p className="footer-copy">&copy; 2026 Yuki Kotaki. All rights reserved.</p>

      <nav className="footer-nav" aria-label="ページ内ナビゲーション">
        <a href="#authority">専門性</a>
        <a href="#capabilities">できること</a>
        <a href="#works">制作実績</a>
        <a href="#story">歩み</a>
        <a href="#research">研究・執筆</a>
        <a href="#career">経歴</a>
        <a href="#stance">スタンス</a>
        <a href="#contact">お問い合わせ</a>
      </nav>

      <div className="footer-links" aria-label="研究プロフィール・論文データベース">
        <a
          className="footer-profile-link"
          href={SCHOLAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="Google Scholar — 著者名で検索した一覧を開きます"
          aria-label="Google Scholarで小瀧雄基を検索"
        >
          <span className="footer-profile-icon" aria-hidden="true">
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
          <span className="footer-profile-label">Google Scholar</span>
        </a>
        <a
          className="footer-profile-link"
          href={CINII_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="CiNii Research — 国立情報学研究所の学術情報ナビゲータで検索"
          aria-label="CiNii Researchで小瀧雄基の論文を開く"
        >
          <span className="footer-profile-icon" aria-hidden="true">
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
          <span className="footer-profile-label">CiNii Research</span>
        </a>
      </div>

      <div className="footer-legal" aria-labelledby="footer-legal-heading">
        <h2 className="footer-legal-heading" id="footer-legal-heading">
          著作権・利用制限
        </h2>
        <p className="footer-legal-text">
          © 2026 小瀧雄基。プログラム・文章・デザイン・画面構成等の著作権その他の知的財産権は、小瀧雄基に帰属します。無断転載、複製、配布、改変、および営利目的での二次利用（再配布・転売・サービスへの組み込み等を含む）を禁止します。上記行為には事前の書面による許諾が必要です。
        </p>
        <div className="footer-legal-insurance">
          <p className="footer-legal-insurance-text">
            小瀧雄基は、個人として法律費用保険（いわゆる弁護士保険）に加入しています。
          </p>
          <figure className="footer-legal-badge">
            <img
              src="/yell-legal-insurance-badge.png"
              alt="弁護士保険コモン+ 契約者証（エール少額短期保険株式会社）"
              width={112}
              height={112}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </footer>
  );
}
