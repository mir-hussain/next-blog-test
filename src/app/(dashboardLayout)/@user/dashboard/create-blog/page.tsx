import { CreateBlogForm } from "@/components/modules/user/createBlog/CreateBlogForm";
import { Card } from "@/components/ui/card";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function CreateBlogPage() {
  const blogPosts = await blogService.getBlogPosts();

  console.log(blogPosts);

  return (
    <>
      <CreateBlogForm />
      {blogPosts?.data?.data?.map((blog: BlogPost) => (
        <p key={blog.id}>{blog.title}</p>
      ))}
    </>
  );
}
