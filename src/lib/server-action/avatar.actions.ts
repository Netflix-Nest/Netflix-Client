"use server";

import { userApi } from "@/utils/api";
import { revalidatePath } from "next/cache";

export async function uploadAvatarAction(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file) {
      return {
        success: false,
        error: "No file provided",
      };
    }

    if (!file.type.startsWith("image/")) {
      return {
        success: false,
        error: "Please select an image file",
      };
    }

    if (file.size > 1 * 1024 * 1024) {
      return {
        success: false,
        error: "Please select an image smaller than 1MB",
      };
    }

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    // upload image
    const uploadRes = await userApi.uploadAvatar(uploadFormData);

    if (!uploadRes.data) {
      return {
        success: false,
        error: "Upload failed",
      };
    }

    // upload user avatar
    const updateRes = await userApi.updateInfo(+userId, {
      avatar: uploadRes.data.fileName,
    });

    if (!updateRes.data) {
      return {
        success: false,
        error: "Failed to update user info",
      };
    }

    revalidatePath("/account");
    revalidatePath("/");

    return {
      success: true,
      data: {
        fileName: uploadRes.data.fileName,
        user: updateRes.data,
      },
    };
  } catch (error) {
    console.error("Avatar upload error:", error);
    return {
      success: false,
      error: "Upload failed. Please try again.",
    };
  }
}
