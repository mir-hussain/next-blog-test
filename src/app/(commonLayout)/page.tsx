import { blogService } from "@/services/blog.service";

export default async function Home() {
  const blogPosts = await blogService.getBlogPosts();

  console.log(blogPosts);

  return (
    <div>
      <h1>Mara Khaa</h1>
    </div>
  );
}
