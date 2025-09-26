import { WatchList } from "@/components/watchlist/watchlist";
import { engagementApi } from "@/utils/api";

export default async function MyListPage() {
  const resList = await engagementApi.getWatchlists();
  return <WatchList list={resList.data} />;
}
