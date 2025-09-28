import History from "@/components/history/history";
import { engagementApi, movieApi } from "@/utils/api";

export default async function HistoryPage() {
  const res = await engagementApi.getHistory();
  const ids = res.data.map((r) => r.contentId);
  const resContent = await movieApi.getContentByIds(ids, 1, 30);
  console.log(resContent.data);
  return <History histories={res.data} contents={resContent.data} />;
}
