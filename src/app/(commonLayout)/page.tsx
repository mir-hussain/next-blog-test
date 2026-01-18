import BlogCard from "@/components/modules/homepage/BlogCard";
import { postService } from "@/services/post.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const featuredPostsPromise = postService.getPosts({ isFeatured: true });
  const postsPromise = postService.getPosts();

  const [featuredPosts, posts] = await Promise.all([
    featuredPostsPromise,
    postsPromise,
  ]);

  console.log(featuredPosts);
  console.log(posts);

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
      {posts?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
