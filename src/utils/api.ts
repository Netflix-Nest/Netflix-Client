import {
  Comment,
  CommentClient,
  Content,
  CreateCommentDto,
  UserMention,
  UserProfile,
} from "@netflix-clone/types";
import axios from "./axios.customize";
import {
  COMMON_ERROR,
  CREATE_COMMENT_SUCCESS,
} from "@/constants/response.message";

export const authApi = {
  refresh: async (): Promise<IBackendRes<any>> => {
    // add refresh token
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`
    );
    return res.data;
  },

  login: async (email: string, password: string): Promise<IBackendRes<any>> => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      { email, password }
    );
    return res.data;
  },
};

export const movieApi = {
  getHero: async (): Promise<IBackendRes<Content>> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/1`
    ); //hard content
    return res.data;
  },

  getContents: async (
    current: number,
    pageSize: number,
    excludeContent: number[],
    sortField?: string,
    sortOrder?: "ASC" | "DESC",
    additionalFilters?: any
  ): Promise<IModelPaginate<Content>> => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/exclude?current=${
        current || 1
      }&pageSize=${pageSize || 6}`,
      { ids: excludeContent, sortField, sortOrder, additionalFilters }
    );
    return res.data.data;
  },

  recommendation: async (
    current: number,
    pageSize: number,
    excludeIds: number[]
  ): Promise<IModelPaginate<Content>> => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/content/recommendation?current=${current}&pageSize=${pageSize}`,
      { ids: excludeIds }
    );
    return res.data.data;
  },

  getComments: async (
    current: number,
    pageSize: number,
    contentId: number
  ): Promise<IModelPaginate<CommentClient>> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment?current=${current}&pageSize=${pageSize}&content=${contentId}`
    );
    console.log("comment: ", res.data);
    return res.data;
  },

  submitComment: async (data: CreateCommentDto) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/comment`,
      data
    );
    console.log(res);
    if (res.data) {
      return CREATE_COMMENT_SUCCESS;
    } else {
      return COMMON_ERROR;
    }
  },
};

export const userApi = {
  getUsernames: async (q: string): Promise<IModelPaginate<UserMention>> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/search?u=${q}`
    );
    return res.data;
  },

  getAccount: async (): Promise<IBackendRes<UserProfile>> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/account`
    );
    return res.data;
  },
  updateInfo: async (
    id: number,
    updateUserDto: Partial<UserProfile>
  ): Promise<IBackendRes<UserProfile>> => {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${id}`,
      updateUserDto
    );
    return res.data;
  },
  changePass: async (id: number, oldPass: string, newPass: string) => {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/change-pass/${id}`,
      { oldPass, newPass }
    );
    return res.data || res;
  },
};
