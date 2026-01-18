"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { toast } from "sonner";

export function CreateBlogForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const handleGoogleLogin = async () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating....");
      try {
        //Something here
        console.log(value);
        toast.success("Post Created");
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="blog-post"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="title"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Blog Title"
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="content"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Write your blog"
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="tags"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>
                      Tags (comma separated)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="nextjs, web"
                    />
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button form="blog-post" type="submit" className="w-full">
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}
