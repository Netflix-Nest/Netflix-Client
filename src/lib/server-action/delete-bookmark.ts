"use server";
import { revalidatePath } from "next/cache";
import { engagementApi } from "@/utils/api";

export async function deleteBookmarkAction(bookmarkId: number) {
  try {
    const result = await engagementApi.deleteBookmark(bookmarkId);

    if (result.data) {
      revalidatePath("/bookmark");
      return { success: true, message: "Đã xóa đánh dấu!" };
    } else {
      return { success: false, message: "Không thể xóa đánh dấu!" };
    }
  } catch (error) {
    return { success: false, message: "Có lỗi xảy ra. Vui lòng thử lại!" };
  }
}
