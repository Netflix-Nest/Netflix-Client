import { WatchListDetail } from "@/components/watchlist/watchlist.detail";
import { COMMON_ERROR } from "@/constants/response.message";
import { engagementApi, movieApi } from "@/utils/api";
interface IProps {
  params: { id: string };
}
export default async function WatchListDetailPage({ params }: IProps) {
  const { id } = await params;
  const resDetail = await engagementApi.getWatchlistsDetail(id);
  if (!resDetail || !resDetail.data) {
    throw new Error(COMMON_ERROR);
  }

  const contents = await movieApi.getContentByIds(
    resDetail.data?.contentIds || [],
    1,
    100
  );
  console.log("contentenfiasdnocd; ", contents.data);
  return (
    <WatchListDetail watchlist={resDetail.data} movies={contents.data || []} />
  );
}
