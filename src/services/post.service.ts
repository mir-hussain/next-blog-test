import { env } from "@/env";
import { appendSearchParams } from "@/lib/api";

const API_URL = env.API_URL;

type ServiceOptions = {
  cache?: RequestCache;
  revalidate?: number;
};

export const postService = {
  getPosts: async function (
    params?: Record<string, any>,
    options?: ServiceOptions
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);

      appendSearchParams(url, params);

      const fetchConfig: RequestInit = {};

      // 2. Apply options ONLY if they are provided
      if (options?.cache) {
        fetchConfig.cache = options.cache;
      }

      if (options?.revalidate !== undefined) {
        fetchConfig.next = { revalidate: options.revalidate };
      }

      // const res = await fetch(url.toString(), fetchConfig);

      const res = await fetch(url.toString(), {
        next: { revalidate: 10 },
      });

      const data = await res.json();

      if (data.data) {
        return { data: data.data, error: null };
      } else {
        return { data: null, error: "" };
      }
    } catch (err) {
      return { data: null, error: "Something Went Wrong" };
    }
  },
};
