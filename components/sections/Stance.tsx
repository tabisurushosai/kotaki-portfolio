import { Fragment } from "react";
import { Reveal } from "../ui/Reveal";

const STANCE_ITEMS = [
  {
    n: "1",
    title: "作って、渡して、繋ぎます",
    body:
      "まずは形にし、現場で回せる形でお渡しします。将来的には、運用をMiRAIで育った次の世代へつないでいきたいと考えています。技術パートナーとして、必要なときだけお手伝いします。",
  },
  {
    n: "2",
    title: "教育から、AIを使いこなす人を育てます",
    body:
      "AIを使いこなす未来の人材を育てるところまで見据え、研修・マニュアル・引き継ぎ設計まで視野に入れています。",
  },
  {
    n: "3",
    title: "地域の中小企業を応援します",
    body:
      "三重・愛知の経営者が、AIで判断のスピードを上げ、将来をより良くしていく。そのための仕組みづくりと支援を行います。",
  },
] as const;

export function Stance() {
  return (
    <div className="stance-panel">
      <div className="stance-grid">
        {STANCE_ITEMS.map((item, idx) => {
          const card = (
            <article className="stance-card">
              <span className="stance-card-index" aria-hidden="true">
                {item.n}
              </span>
              <h3 className="stance-card-title h-card">{item.title}</h3>
              <p className="stance-card-body">{item.body}</p>
            </article>
          );
          if (idx === 0) {
            return (
              <Reveal key={item.n} delayMs={100}>
                {card}
              </Reveal>
            );
          }
          return <Fragment key={item.n}>{card}</Fragment>;
        })}
      </div>

      <div className="stance-closing-bleed">
        <div className="stance-closing-line" aria-hidden="true" />
        <p className="stance-closing-text">
          ── 長期的にお互い気持ちよく仕事できる関係を大切にしています
        </p>
      </div>
    </div>
  );
}
