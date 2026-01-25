import type { ForumSection, SectionKey } from "../forumTypes";
import { clsx } from "./ui-helpers";

type Props = {
  sections: ForumSection[];
  active: SectionKey;
  onSelect: (key: SectionKey) => void;
};

export default function ForumSidebar({ sections, active, onSelect }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm">
      <div className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        板块
      </div>
      <div className="divide-y divide-slate-100">
        {sections.map((section) => (
          <button
            key={section.key}
            type="button"
            onClick={() => !section.locked && onSelect(section.key)}
            className={clsx(
              "w-full px-4 py-3 text-left text-sm flex items-center gap-2 transition-colors",
              section.locked
                ? "cursor-not-allowed text-slate-400"
                : active === section.key
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-50"
            )}
          >
            <span className="flex-1">{section.label}</span>
            {section.badge === "new" ? (
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 text-[11px] leading-none border",
                  active === section.key
                    ? "border-white/70 bg-white/15 text-white"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                )}
              >
                NEW
              </span>
            ) : null}
            {typeof section.count === "number" ? (
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 text-[11px] leading-none border",
                  active === section.key
                    ? "border-white/70 bg-white/15 text-white"
                    : "border-slate-200 bg-slate-100 text-slate-600"
                )}
              >
                {section.count}
              </span>
            ) : null}
            {section.locked ? (
              <span className="text-xs" role="img" aria-label="locked">
                🔒
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
