"use server";

import { blogService } from "@/services/blog.service";

export async function getBlogPosts() {
  return await blogService.getBlogPosts();
}
