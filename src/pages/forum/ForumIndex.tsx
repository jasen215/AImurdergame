import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceShell from "../../components/DeviceShell";
import { forumPosts, forumSections, sectionCountOffset } from "./forumData";
import type { SectionKey } from "./forumTypes";
import ForumTopBar from "./components/ForumTopBar";
import ForumSidebar from "./components/ForumSidebar";
import PostList from "./components/PostList";

export default function ForumIndex() {
  const nav = useNavigate();
  const [activeSection, setActiveSection] = useState<SectionKey>("home");

  const filteredPosts = useMemo(() => {
    if (activeSection === "home") return forumPosts;
    return forumPosts.filter(
      (p) => p.section === activeSection || p.mirrors?.includes(activeSection)
    );
  }, [activeSection]);

  const sectionCounts = useMemo(() => {
    const counts: Record<SectionKey, number> = {
      home: forumPosts.length,
      help: 0,
      life: 0,
      tech: 0,
      announce: 0,
      other: 0,
      mine_posts: 0,
      mine_fav: 0,
      mine_hidden: 0,
    };
    forumPosts.forEach((p) => {
      counts[p.section] += 1;
      p.mirrors?.forEach((m) => {
        counts[m] += 1;
      });
    });
    return counts;
  }, []);

  const boostedCounts = useMemo(() => {
    const next = { ...sectionCounts };
    Object.entries(sectionCountOffset).forEach(([key, extra]) => {
      const k = key as SectionKey;
      next[k] = (next[k] ?? 0) + (extra ?? 0);
    });
    return next;
  }, [sectionCounts]);

  const sections = useMemo(() => {
    return forumSections.map((s) => ({
      ...s,
      count: boostedCounts[s.key] ?? s.count,
    }));
  }, [boostedCounts]);

  return (
    <DeviceShell title="XX 论坛" variant="tablet">
      <div className="h-full bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="mx-auto h-full max-w-5xl px-4 py-6">
          <div className="sticky top-0 z-20 bg-gradient-to-b from-slate-50 via-white to-transparent pb-2">
            <ForumTopBar subtitle="HomeMind / 讨论" onBack={() => nav(-1)} />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[240px,1fr] md:items-start">
            <div className="md:sticky md:top-24">
              <ForumSidebar sections={sections} active={activeSection} onSelect={(key) => setActiveSection(key)} />
            </div>
            <div className="md:h-[calc(100vh-220px)] md:overflow-y-auto md:pr-2">
              <PostList posts={filteredPosts} activeSection={activeSection} />
            </div>
          </div>
        </div>
      </div>
    </DeviceShell>
  );
}
