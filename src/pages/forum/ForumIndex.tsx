import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceShell from "../../components/DeviceShell";
import { forumPosts, forumSections } from "./forumData";
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

  const sections = useMemo(
    () => forumSections.map((s) => ({ ...s, count: sectionCounts[s.key] ?? s.count })),
    [sectionCounts]
  );

  return (
    <DeviceShell title="XX 论坛" variant="tablet">
      <div className="h-full bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="mx-auto h-full max-w-5xl px-4 py-6">
          <ForumTopBar subtitle="HomeMind / 讨论" onBack={() => nav(-1)} />

          <div className="mt-4 grid h-[calc(100%-72px)] grid-cols-1 gap-4 md:grid-cols-[240px,1fr]">
            <ForumSidebar sections={sections} active={activeSection} onSelect={(key) => setActiveSection(key)} />
            <PostList posts={filteredPosts} activeSection={activeSection} />
          </div>
        </div>
      </div>
    </DeviceShell>
  );
}
