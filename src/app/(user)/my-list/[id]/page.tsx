import { WatchListDetail } from "@/components/watchlist/watchlist.detail";
import { COMMON_ERROR } from "@/constants/response.message";
import { FastToaster } from "@/lib/toaster.noti";
import { engagementApi, movieApi } from "@/utils/api";
interface IProps {
  params: { id: string };
}
export default async function WatchListDetailPage({ params }: IProps) {
  const { id } = await params;
  const resDetail = await engagementApi.getWatchlistsDetail(id);
  if (!resDetail || !resDetail.data) {
    FastToaster("error", "Đã xảy ra lỗi!");
  }

  const contents = await movieApi.getContentByIds(
    resDetail.data?.contentIds || [],
    1,
    100
  );
  return (
    <WatchListDetail watchlist={resDetail.data!} movies={contents.data || []} />
  );
}
