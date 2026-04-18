import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../cn";

const SCROLL_SCOPED_STYLES_PX = 80;

export const NAV_LINKS = [
  { sectionId: "authority", label: "専門性", href: "#authority" },
  { sectionId: "capabilities", label: "できること", href: "#capabilities" },
  { sectionId: "works", label: "制作実績", href: "#works" },
  { sectionId: "story", label: "歩み", href: "#story" },
  { sectionId: "research", label: "研究・執筆", href: "#research" },
  { sectionId: "career", label: "経歴", href: "#career" },
  { sectionId: "stance", label: "スタンス", href: "#stance" },
  { sectionId: "contact", label: "お問い合わせ", href: "#contact" },
] as const;

function pickActiveSectionFallback(): string | null {
  const probe = window.scrollY + SCROLL_SCOPED_STYLES_PX + 8;
  let current: string | null = null;
  for (const { sectionId } of NAV_LINKS) {
    const el = document.getElementById(sectionId);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= probe) current = sectionId;
  }
  return current;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const entryRatios = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  const updateScrolled = useCallback(() => {
    setScrolled(window.scrollY > SCROLL_SCOPED_STYLES_PX);
  }, []);

  const recomputeActiveSection = useCallback(() => {
    if (window.scrollY < 32) {
      setActiveSection(null);
      return;
    }

    const doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 3) {
      setActiveSection(NAV_LINKS[NAV_LINKS.length - 1]!.sectionId);
      return;
    }

    let fromIo: string | null = null;
    let bestTop = Number.POSITIVE_INFINITY;
    for (const { sectionId } of NAV_LINKS) {
      const e = entryRatios.current.get(sectionId);
      if (!e?.isIntersecting) continue;
      const t = e.boundingClientRect.top;
      if (t < bestTop) {
        bestTop = t;
        fromIo = sectionId;
      }
    }
    if (fromIo !== null) {
      setActiveSection(fromIo);
      return;
    }
    setActiveSection(pickActiveSectionFallback());
  }, []);

  useEffect(() => {
    updateScrolled();
    recomputeActiveSection();
  }, [updateScrolled, recomputeActiveSection]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      updateScrolled();
      if (raf) return;
      raf = requestAnimationFrame(() => {
        recomputeActiveSection();
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [updateScrolled, recomputeActiveSection]);

  useEffect(() => {
    const sections = NAV_LINKS.map(({ sectionId }) =>
      document.getElementById(sectionId)
    ).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          entryRatios.current.set((e.target as HTMLElement).id, e);
        }
        recomputeActiveSection();
      },
      {
        root: null,
        rootMargin: `-${SCROLL_SCOPED_STYLES_PX}px 0px -42% 0px`,
        threshold: [0, 0.02, 0.06, 0.12, 0.2, 0.35, 0.5, 0.75, 1],
      }
    );

    sections.forEach((el) => io.observe(el));
    recomputeActiveSection();

    return () => {
      sections.forEach((el) => io.unobserve(el));
      io.disconnect();
    };
  }, [recomputeActiveSection]);

  useLayoutEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const panel = overlayRef.current;
    if (!panel) return;

    const list = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href]'
      )
    );
    const first = list[0];
    const last = list[list.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        window.setTimeout(() => menuButtonRef.current?.focus(), 0);
        return;
      }
      if (e.key !== "Tab" || list.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 0);
  }, []);

  const openMenu = useCallback(() => setMenuOpen(true), []);

  const menuTitleId = "site-nav-menu-title";
  const menuPanelId = "site-nav-drawer";

  return (
    <>
      <header
        className={cn(
          "site-nav",
          scrolled && "site-nav--scrolled",
          menuOpen && "site-nav--menu-open"
        )}
        aria-label="サイトナビゲーション"
      >
        <div className="site-nav-inner">
          <a className="site-nav-brand" href="#top">
            <span className="site-nav-brand-ja">小瀧 雄基</span>
            {scrolled ? (
              <span className="site-nav-brand-en" lang="en">
                Yuki Kotaki
              </span>
            ) : null}
          </a>

          <nav className="site-nav-links" aria-label="ページ内ジャンプ">
            {NAV_LINKS.map(({ sectionId, label, href }) => (
              <a
                key={sectionId}
                href={href}
                data-section={sectionId}
                aria-current={
                  activeSection === sectionId ? "location" : undefined
                }
                className={activeSection === sectionId ? "is-active" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className="site-nav-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuPanelId}
            aria-haspopup="dialog"
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {menuOpen ? (
              <X className="site-nav-menu-icon" aria-hidden />
            ) : (
              <Menu className="site-nav-menu-icon" aria-hidden />
            )}
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        id={menuPanelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={menuTitleId}
        aria-hidden={!menuOpen}
        className={cn("site-nav-overlay", menuOpen && "is-open")}
      >
        <div
          className="site-nav-overlay-backdrop"
          aria-hidden
          onClick={closeMenu}
        />
        <div className="site-nav-overlay-inner">
          <div className="site-nav-overlay-bar">
            <p id={menuTitleId} className="site-nav-overlay-title">
              メニュー
            </p>
            <button
              type="button"
              className="site-nav-overlay-close"
              onClick={closeMenu}
              aria-label="メニューを閉じる"
            >
              <X className="site-nav-menu-icon" aria-hidden />
            </button>
          </div>
          <nav
            className="site-nav-overlay-links"
            aria-label="ページ内ジャンプ（モバイル）"
          >
            {NAV_LINKS.map(({ sectionId, label, href }) => (
              <a
                key={sectionId}
                href={href}
                data-section={sectionId}
                aria-current={
                  activeSection === sectionId ? "location" : undefined
                }
                className={cn(activeSection === sectionId && "is-active")}
                onClick={closeMenu}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
