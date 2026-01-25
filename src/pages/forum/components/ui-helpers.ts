export function clsx(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

export function formatSectionName(key: string) {
  const map: Record<string, string> = {
    home: "首页",
    help: "故障求助",
    life: "生活分享",
    tech: "技术讨论",
    announce: "官方公告",
    other: "其他问题",
    mine_posts: "我的帖子",
    mine_fav: "我的收藏",
    mine_hidden: "我的隐藏",
  };
  return map[key] ?? "未知";
}
