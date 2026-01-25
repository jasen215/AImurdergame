import type { Post, SectionKey } from "../forumTypes";
import { Pill } from "./ui";
import { formatSectionName, isAuthor } from "./ui-helpers";

type Props = {
  posts: Post[];
  activeSection: SectionKey;
};

export default function PostList({ posts, activeSection }: Props) {
  const sectionLabel =
    activeSection === "home"
      ? "全部帖子"
      : activeSection.startsWith("mine_")
        ? "我的"
        : formatSectionName(activeSection) + " 区";

  const sorted = [...posts].sort((a, b) => Number(b.isPinned ?? 0) - Number(a.isPinned ?? 0));

  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white/90 shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">帖子列表</div>
          <div className="text-lg font-semibold text-slate-900">{sectionLabel}</div>
        </div>
        <div className="text-xs text-slate-500">{posts.length} 条</div>
      </div>

      <div className="mt-4 space-y-3">
        {sorted.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-8 text-center text-sm text-slate-500">
            暂无帖子。
          </div>
        ) : (
          sorted.map((post) => {
            const replyCount = post.replyList?.length ?? post.replies;
            return (
              <article
                key={post.id}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.45)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {post.isPinned ? <Pill tone="amber">置顶</Pill> : null}
                      <Pill tone="blue">{formatSectionName(post.section)}</Pill>
                      {post.mirrors?.map((mirror) => (
                        <Pill key={mirror} tone="slate">
                          #{formatSectionName(mirror)}
                        </Pill>
                      ))}
                      {post.tags?.map((tag) => (
                        <Pill key={tag} tone="slate">
                          #{tag}
                        </Pill>
                      ))}
                      {post.commentsDisabled ? <Pill tone="rose">评论已关闭</Pill> : null}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{post.title}</h3>
                    <p className="mt-1 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>

                  <div className="text-right text-xs text-slate-500 min-w-[140px]">
                    <div className="font-medium text-slate-700">{post.author}</div>
                    <div className="mt-1">{post.time}</div>
                    <div className="mt-2 text-slate-500">
                      {replyCount} 回复 · {post.views} 浏览
                    </div>
                  </div>
                </div>

                    {post.replyList && post.replyList.length > 0 ? (
                      <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                        {post.replyList.map((reply, idx) => (
                          <div key={`${post.id}-r${idx}`} className="flex gap-3 text-sm text-slate-700">
                            <div className="min-w-[120px] text-xs font-semibold text-slate-500 flex items-center gap-2">
                              <span className="text-slate-500">{reply.author}</span>
                              {isAuthor(reply.author) ? (
                                <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] leading-none text-rose-600 border border-rose-200">
                                  作者
                                </span>
                              ) : null}
                            </div>
                            <div className="flex-1">
                              <div className="text-[11px] text-slate-500">
                                {reply.time}
                                {reply.replyTo ? ` · 回复 ${reply.replyTo}` : ""}
                              </div>
                          <div className="leading-relaxed whitespace-pre-line">{reply.content}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })
        )}
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-3 text-center text-sm text-slate-600">
        更多精彩
      </div>
    </div>
  );
}
