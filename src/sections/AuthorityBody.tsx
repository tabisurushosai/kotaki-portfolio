import { Chip } from "../../components/ui/Chip";
import { Reveal } from "../../components/ui/Reveal";

export function AuthorityBody() {
  return (
    <div className="authority-grid">
      <Reveal delayMs={100}>
      <article className="authority-card">
        <p className="authority-card-eyebrow">行政</p>
        <h3 className="authority-card-title">三重県教育委員会 研修員</h3>
        <Chip variant="period">2020–2021</Chip>
        <p className="authority-description">
          三重県総合教育センターにて、教員の指導力向上を目的とした研究員として2年間従事。
        </p>
      </article>
      </Reveal>

      <article className="authority-card">
        <p className="authority-card-eyebrow">資格</p>
        <h3 className="authority-card-title">学校心理士</h3>
        <Chip variant="status">2021年1月 · 取得</Chip>
        <p className="authority-description">
          学校現場における心理支援の専門資格として活動しています。
        </p>
      </article>

      <article className="authority-card">
        <p className="authority-card-eyebrow">学会</p>
        <h3 className="authority-card-title">
          学校心理士会 三重県支部 副支部長
        </h3>
        <Chip variant="status">現任</Chip>
        <p className="authority-description">
          三重県内の学校心理士のネットワークを束ね、学校現場の支援と研修を推進する副支部長として活動しています。
        </p>
      </article>
    </div>
  );
}
