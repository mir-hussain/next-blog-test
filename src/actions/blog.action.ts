"use server";

import { blogService } from "@/services/blog.service";
import { updateTag } from "next/cache";

export async function getBlogPosts() {
  return await blogService.getBlogPosts();
}

export async function createBlogPost(blogData: any) {
  const result = await blogService.createBlog(blogData);
  updateTag("blogPost");
  return result;
}
