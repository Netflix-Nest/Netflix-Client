import BookmarkMain from "@/components/bookmark/bookmark";
import { engagementApi, movieApi } from "@/utils/api";

export default async function BookmarkPage() {
  const res = await engagementApi.getBookmarks();
  const ids = res.data.map((r) => r.videoId);
  const resVideos = await movieApi.findVideoByIds(ids);
  return <BookmarkMain bookmarks={res.data} videos={resVideos.data} />;
}
