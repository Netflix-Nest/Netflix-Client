"use server";

import { engagementApi } from "@/utils/api";
import { FastToaster } from "../toaster.noti";
import { revalidatePath } from "next/cache";
import { Watchlist } from "@netflix-clone/types";

export async function changeExistenceAction(
  existInList: Watchlist[],
  selectedWatchlists: number[],
  contentId: number,
  watchlist: Watchlist[]
) {
  const existInListIds = new Set(existInList.map((w) => w.id));
  const selectedIds = new Set(selectedWatchlists.map((s) => s));

  const filteredAdd = selectedWatchlists.filter(
    (selected) => !existInListIds.has(selected)
  );

  const filteredRemove = existInList
    .filter((watch) => !selectedIds.has(watch.id))
    .map((lst) => lst.id);

  let success = filteredAdd.length
    ? filteredRemove.length
      ? 2
      : 1
    : filteredRemove.length
    ? 1
    : 0;
  if (filteredAdd.length) {
    const res = await engagementApi.changeExistenceVideoInWatchlists(
      filteredAdd,
      contentId,
      true
    );
    if (res.data && res.data.success) {
      success--;
    }
  }
  if (filteredRemove.length) {
    const res = await engagementApi.changeExistenceVideoInWatchlists(
      filteredRemove,
      contentId,
      false
    );
    if (res.data && res.data.success) {
      success--;
    }
  }
  if (!success) {
    return {
      success: true,
      newSelectedList: existInList
        .filter((lst) => !filteredRemove.includes(lst.id))
        .concat(watchlist.filter((lst) => filteredAdd.includes(lst.id))),
    };
  }
}
