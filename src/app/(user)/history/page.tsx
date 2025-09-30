import History from "@/components/history/history";
import { engagementApi, movieApi } from "@/utils/api";

export default async function HistoryPage() {
  const res = await engagementApi.getHistory();
  const ids = res.data.map((r) => r.videoId);
  const resVideos = await movieApi.findVideoByIds(ids);
  console.log(resVideos.data);
  return <History historiesData={res.data} videosData={resVideos.data} />;
}
