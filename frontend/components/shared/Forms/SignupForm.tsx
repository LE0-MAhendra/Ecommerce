"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRegisterMutation } from "@/redux/features/Auth/authApiSlice";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { continueWithGoogle } from "@/utils";

const SignupFormSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password is required with 8 characters"),
  re_password: z.string().min(8, "Password is required with 8 characters"),
});

export function SignupForm() {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
  });
  function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    register(values)
      .unwrap()
      .then(() => {
        toast.success("Please check email to verify your account");
        router.push("/login");
      })
      .catch(() => {
        toast.error("Failed to register");
      });
  }
  return (
    <div className="w-[500px] mx-auto rounded-lg p-4 bg-zinc-100 max-md:w-[300px]">
      <h1 className="text-center text-2xl font-medium text-zinc-600">
        Register User
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex gap-4 max-md:flex-col">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firstname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your firstname"
                      {...field}
                      className="text-[14px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lastname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your lastname"
                      {...field}
                      className="text-[14px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="text-[14px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    type="password"
                    className="text-[14px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="re_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    {...field}
                    className="text-[14px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center text-center w-full gap-2">
            <Button type="submit">{isLoading ? <Spinner /> : "Sign up"}</Button>
          </div>
          <p className="flex justify-end gap-2 p-2">
            Already have an account
            <Link href="/login">
              <span className=" font-semibold text-orange-600">Sign in</span>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
