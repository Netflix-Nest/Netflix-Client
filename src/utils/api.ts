import { Content } from "@netflix-clone/types";
import axios from "./axios.customize";

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
    console.log(res.data);
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
};
