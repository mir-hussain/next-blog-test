import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";

import { BlogPost } from "@/types";

export default async function Home() {
  const featuredPostsPromise = blogService.getBlogPosts({ isFeatured: true });
  const postsPromise = blogService.getBlogPosts({}, { revalidate: 10 });

  const [featuredPosts, posts] = await Promise.all([
    featuredPostsPromise,
    postsPromise,
  ]);

  // console.time("sequential");

  // await new Promise((resolve) => setTimeout(resolve, 2000));
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // console.timeEnd("sequential");

  // console.time("parallel");

  // const promise1 = new Promise((resolve) => setTimeout(resolve, 2000));
  // const promise2 = new Promise((resolve) => setTimeout(resolve, 2000));

  // await Promise.all([promise1, promise2]);

  // console.timeEnd("parallel");

  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto px-4 gap-5">
      {posts?.error?.message ? (
        <p className="text-red-500">{posts?.error?.message}</p>
      ) : null}
      {posts?.data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
