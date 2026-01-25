import { useNavigate } from "react-router-dom";
import { clsx } from "./ui-helpers";

type Props = {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
};

export default function ForumTopBar({ title = "论坛", subtitle, onBack }: Props) {
  const nav = useNavigate();

  const handleBack = () => {
    if (onBack) return onBack();
    nav(-1);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
      <div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">FORUM</div>
        <div className="mt-1 flex items-center gap-3">
          <div className="text-xl font-semibold text-slate-900">{title}</div>
          {subtitle ? <div className="text-sm text-slate-500">{subtitle}</div> : null}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleBack}
          className={clsx(
            "rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700",
            "bg-white hover:bg-slate-50 active:translate-y-[1px]"
          )}
        >
          返回
        </button>
      </div>
    </div>
  );
}
