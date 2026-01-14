import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceShell from "../components/DeviceShell";
import IOSDock, { type DockItem } from "../components/IOSDock";
import { initialGameState } from "../store/gameState";

type AppItem = {
  id: string;
  label: string;
  iconEmoji?: string;
  iconSrc?: string;
  locked?: boolean;
  route?: string;
};

function AppIcon({
  label,
  iconEmoji,
  iconSrc,
  locked,
  onClick,
}: {
  label: string;
  iconEmoji?: string;
  iconSrc?: string;
  locked?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={() => !locked && onClick()}
      disabled={locked}
      className={[
        "flex flex-col items-center select-none",
        locked ? "opacity-55 cursor-not-allowed" : "cursor-pointer active:scale-[0.98]",
      ].join(" ")}
      title={locked ? "尚未解锁" : label}
    >
      <div
        className={[
          "h-16 w-16 rounded-2xl flex items-center justify-center",
          "bg-white/22 backdrop-blur-3xl",
          "border border-white/45",
          "shadow-[0_18px_50px_-35px_rgba(0,0,0,0.45)]",
          "ring-1 ring-black/5",
          locked ? "bg-slate-100/35" : "",
        ].join(" ")}
      >
        {locked ? (
          <span className="text-2xl">🔒</span>
        ) : iconSrc ? (
          <img src={iconSrc} alt={label} className="h-10 w-10 object-contain" draggable={false} />
        ) : (
          <span className="text-2xl">{iconEmoji ?? "⬜"}</span>
        )}
      </div>

      <div className="mt-2 text-[11px] text-slate-700">{label}</div>
    </button>
  );
}

function SystemModal({
  open,
  title,
  message,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/25" onClick={onClose} aria-hidden="true" />
      <div className="relative w-[min(92vw,360px)] rounded-2xl bg-white/80 backdrop-blur-2xl shadow-2xl border border-white/55 p-5 ring-1 ring-black/5">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-2 text-sm text-slate-700 leading-relaxed">{message}</div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800"
          >
            好的
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PhoneHome() {
  const nav = useNavigate();
  const gs = initialGameState;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    title: "提示",
    message: "此 app 不在探索范围内。",
  });

  const showOutOfScope = (label?: string) => {
    setModalMsg({
      title: "提示",
      message: label
        ? `「${label}」不在探索范围内。请回到论坛或 HomeMind 继续调查。`
        : "此 app 不在探索范围内。请回到论坛或 HomeMind 继续调查。",
    });
    setModalOpen(true);
  };

  const dockItems: DockItem[] = useMemo(
    () => [
      { id: "dock-forum", label: "论坛", iconEmoji: "💬", onClick: () => nav("/forum") },
      {
        id: "dock-homemind",
        label: "HomeMind",
        iconEmoji: "🧠",
        disabled: !gs.homemindUnlocked,
        onClick: () => (gs.homemindUnlocked ? nav("/homemind") : showOutOfScope("HomeMind")),
      },
      { id: "dock-photos", label: "相册", iconEmoji: "🖼️", onClick: () => showOutOfScope("相册") },
      { id: "dock-settings", label: "设置", iconEmoji: "⚙️", onClick: () => showOutOfScope("设置") },
    ],
    [nav, gs.homemindUnlocked]
  );

  const storyApps: AppItem[] = useMemo(
    () => [
      { id: "forum", label: "XX 论坛", iconEmoji: "💬", route: "/forum" },
      { id: "homemind", label: "HomeMind", iconEmoji: "🧠", locked: !gs.homemindUnlocked, route: "/homemind" },
      { id: "admin", label: "系统后台", iconEmoji: "🔧", locked: !gs.adminUnlocked, route: "/admin" },
      { id: "ending", label: "结局", iconEmoji: "🧩", route: "/ending" },
    ],
    [gs.adminUnlocked, gs.homemindUnlocked]
  );

  const systemApps: AppItem[] = useMemo(
    () => [
      { id: "camera", label: "相机", iconEmoji: "📷" },
      { id: "photos", label: "相册", iconEmoji: "🖼️" },
      { id: "calendar", label: "日历", iconEmoji: "📅" },
      { id: "calc", label: "计算器", iconEmoji: "🧮" },
      { id: "notes", label: "备忘录", iconEmoji: "📝" },
      { id: "mail", label: "邮件", iconEmoji: "✉️" },
      { id: "maps", label: "地图", iconEmoji: "🗺️" },
    ],
    []
  );

  const allApps = useMemo(() => [...storyApps, ...systemApps], [storyApps, systemApps]);

  const handleClickApp = (app: AppItem) => {
    if (app.route) {
      if (app.locked) return;
      nav(app.route);
      return;
    }
    showOutOfScope(app.label);
  };

  return (
    <DeviceShell title="Xiaoya’s Phone (Backup)" variant="tablet">
      {/* 注意：DeviceShell 已经渲染了顶部状态栏 + 底部 Home indicator
          这里不要再渲染第二套 */}
      <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100" />

        {/* 桌面：给 dock 留出空间（底部 indicator 也会占高度） */}
        <div className="relative h-full px-6 pt-10 pb-32 overflow-auto">
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-4 gap-x-10 gap-y-10 justify-items-center">
              {allApps.map((app) => (
                <AppIcon
                  key={app.id}
                  label={app.label}
                  iconEmoji={app.iconEmoji}
                  iconSrc={app.iconSrc}
                  locked={app.locked}
                  onClick={() => handleClickApp(app)}
                />
              ))}
            </div>

            <div className="mt-10 text-center text-xs text-slate-500">
              某些记录看起来被“整理过”。
            </div>
          </div>
        </div>

        {/* Dock：只渲染一次，由 PhoneHome 定位 */}
        <div className="absolute inset-x-0 bottom-4 px-4 md:px-6">
          <IOSDock items={dockItems} />
        </div>

        <SystemModal
          open={modalOpen}
          title={modalMsg.title}
          message={modalMsg.message}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </DeviceShell>
  );
}
