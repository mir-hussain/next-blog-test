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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { toast } from "sonner";

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const handleGoogleLogin = async () => {
    authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating....");
      try {
        const { data, error } = await authClient.signUp.email({
          ...value,
        });

        if (data?.user) {
          toast.success("User created successfully", { id: toastId });
        } else {
          toast.error(error?.message, { id: toastId });
        }
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
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Email"
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Email"
                    />
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Password"
                    />
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button form="login-form" type="submit" className="w-full">
          Login
        </Button>
        <div className="flex items-center w-full my-4 gap-4">
          <Separator orientation="horizontal" className="flex-1" />
          <small className="text-accent-foreground">Or</small>
          <Separator orientation="horizontal" className="flex-1" />
        </div>
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full"
        >
          Continue with Google
        </Button>
        <CardDescription className="mt-4">
          Already Have an Account?{" "}
          <Link href="/login" className="underline">
            Register
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
