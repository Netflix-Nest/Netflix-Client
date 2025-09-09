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
};
