import { ChevronDown, type LucideIcon } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "../cn";

export type ProjectFeature = {
  icon: LucideIcon;
  title: string;
  teaser: string;
  body: string;
};

export type ProjectCardProps = {
  index: number;
  industryTag: string;
  clientMeta: string;
  title: string;
  subtitle: string;
  description: string;
  features: ProjectFeature[];
};

export function ProjectCard({
  index,
  industryTag,
  clientMeta,
  title,
  subtitle,
  description,
  features,
}: ProjectCardProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const num = String(index).padStart(2, "0");

  return (
    <article className="project-card overflow-hidden rounded-card border border-brand-line bg-white shadow-card">
      <div className="project-card-band relative flex h-[120px] items-center justify-center">
        <div
          className="project-card-band-bg absolute inset-0"
          aria-hidden
        />
        <span
          className="project-card-band-tag"
          aria-label={`業種・領域: ${industryTag}`}
        >
          {industryTag}
        </span>
        <span className="project-card-band-num mix-en" aria-hidden>
          {num}
        </span>
      </div>

      <div className="project-card-body flex flex-col gap-3 px-5 pb-5 pt-4">
        <p className="project-card-meta-chip">{clientMeta}</p>
        <h3 className="project-card-title h-section">{title}</h3>
        <p className="project-card-subtitle">{subtitle}</p>
        <p className="project-card-desc">{description}</p>

        <div
          className="project-card-features flex flex-col border-t border-brand-line/80 pt-1"
          role="list"
          aria-label="機能・成果の内訳"
        >
          {features.map((f, i) => {
            const open = openIndex === i;
            const panelId = `${baseId}-panel-${i}`;
            const headerId = `${baseId}-header-${i}`;
            const Icon = f.icon;

            return (
              <div key={f.title} className="project-feature border-b border-brand-line/60 last:border-b-0" role="listitem">
                <button
                  type="button"
                  id={headerId}
                  className="project-feature-trigger"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span className="project-feature-trigger-icon" aria-hidden>
                    <Icon size={18} strokeWidth={1.75} className="text-brand-primary" />
                  </span>
                  <span className="project-feature-trigger-text">
                    <span className="project-feature-title">{f.title}</span>
                    <span className="project-feature-teaser">{f.teaser}</span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "project-feature-chevron shrink-0 text-brand-ink/55",
                      open && "project-feature-chevron--open"
                    )}
                    size={20}
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={cn("project-feature-panel", open && "project-feature-panel--open")}
                >
                  <div className="project-feature-panel-inner">
                    <p className="project-feature-body">{f.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
