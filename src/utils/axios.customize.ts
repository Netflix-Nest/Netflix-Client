import axios from "axios";
// import NProgress from "nprogress";

// NProgress.configure({
//   showSpinner: false,
//   trickleSpeed: 100,
// });

// Cookie helper functions
const cookieHelpers = {
  // Get cookie value by name
  getCookie: (name: string): string | null => {
    if (typeof window === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(";").shift();
      return cookieValue || null;
    }

    return null;
  },

  // Set cookie
  setCookie: (name: string, value: string, days: number = 7): void => {
    if (typeof window === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  },

  // Remove cookie
  removeCookie: (name: string): void => {
    if (typeof window === "undefined") return;

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // headers: {
  // 	"Content-Type": "application/json",
  // 	Authorization: `Bearer ${process.env.VITE_ACCESS_TOKEN}`,
  // },
});

// instance.defaults.headers.common["Authorization"] = AUTH_TOKEN;

instance.interceptors.request.use(
  function (config) {
    // NProgress.start();

    const accessToken = cookieHelpers.getCookie("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    // NProgress.done();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // NProgress.done();
    // if (response.data && response.data.data) {
    //   return response.data;
    // }
    return response;
  },
  function (error) {
    // NProgress.done();

    if (error.response?.status === 401) {
      // Token expire or invalid
      cookieHelpers.removeCookie("access_token");

      // Redirect to login page (optional)
      if (typeof window !== "undefined") {
      }
    }

    if (error.response && error.response.data) return error.response.data;
    return Promise.reject(error);
  }
);

export { cookieHelpers };

export default instance;
