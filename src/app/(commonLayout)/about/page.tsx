"use client";

import { getBlogPosts } from "@/actions/blog.action";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [blogPosts, setBlogPosts] = useState();
  const [error, setError] = useState<{ message: string } | null>();

  //* For simulating load time
  // await new Promise((resolve) => setTimeout(resolve, 4000));

  //* For simulating error
  // throw new Error("Something went wrong");

  useEffect(() => {
    (async () => {
      const blogPosts = await getBlogPosts();

      setBlogPosts(blogPosts.data);
      setError(blogPosts?.error);
    })();
  }, []);

  console.log(blogPosts);

  return (
    <div>
      <h1> This is about page component </h1>
      {error && <p>{error.message}</p>}
    </div>
  );
}
