"use server";

import { blogService } from "@/services/blog.service";

export async function getBlogPosts() {
  return await blogService.getBlogPosts();
}

export async function createBlogPost(blogData: any) {
  return await blogService.createBlog(blogData);
}
