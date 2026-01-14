import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-900">
      <div className="w-[760px] rounded-2xl border border-slate-200 bg-white/80 shadow-sm p-10">
        <div className="text-xs text-slate-500">AI MEMORY RECONSTRUCTION</div>
        <h1 className="mt-2 text-3xl font-semibold">回忆还原：小雅</h1>
        <p className="mt-4 text-sm text-slate-600 leading-relaxed">
          你整理她的遗物时发现了一份手机备份。系统提示：部分记录可能被编辑过。
        </p>

        <div className="mt-10 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Status: Backup Ready · Source: HomeMind
          </div>
          <button
            onClick={() => nav("/phone")}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-800"
          >
            开始还原
          </button>
        </div>
      </div>
    </div>
  );
}
