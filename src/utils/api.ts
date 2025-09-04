import axios from "./axios.customize";

export const authApi = {
  refresh: async (): Promise<IBackendRes<any>> => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`
    );
    return res.data;
  },

  login: async (email: string, password: string): Promise<IBackendRes<any>> => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
      { email, password }
    );
    return res.data;
  },
};
