import { useEffect } from "react";
import { Hero } from "./Hero";
import { PortfolioSections } from "./PortfolioSections";
import { SiteFooter } from "./SiteFooter";
import { Nav } from "../components/layout/Nav";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("js-enabled");

    const revealTargets = document.querySelectorAll("footer");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    revealTargets.forEach((el) => {
      el.classList.add("reveal-on-scroll");
    });

    if (!reduceMotion && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealTargets.forEach((el) => observer.observe(el));
    } else {
      revealTargets.forEach((el) => el.classList.add("is-visible"));
    }
  }, []);

  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <PortfolioSections />
      </main>
      <SiteFooter />
    </>
  );
}
