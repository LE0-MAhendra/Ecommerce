"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { useLoginMutation } from "@/redux/features/Auth/authApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { setAuth, setUser } from "@/redux/features/Auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { continueWithGoogle } from "@/utils";
import { useUserData } from "@/components/hooks/useUserData";

const loginformSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password is required with 8 characters"),
});

export function LoginForm() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const userData = useUserData();
  const form = useForm<z.infer<typeof loginformSchema>>({
    resolver: zodResolver(loginformSchema),
  });
  const Submit = async (values: z.infer<typeof loginformSchema>) => {
    try {
      const response = await login(values).unwrap();
      const { access, refresh } = response;
      dispatch(setAuth({ access, refresh }));
      toast.success("Login Success");
      await Getdata();
      router.push("/");
    } catch (error) {
      console.error("Failed to login or retrieve user data", error);
      toast.error("Failed to login");
      return;
    }
  };
  const Getdata = async () => {
    try {
      dispatch(setUser(userData));
    } catch (error) {
      console.error("Failed to retrieve user data", error);
      // Handle the error accordingly
    }
  };

  return (
    <div className="w-[400px] mx-auto rounded-lg p-4 bg-zinc-100 max-md:w-[300px]">
      <h1 className="text-center text-2xl font-medium text-zinc-600">
        User Login
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(Submit)} className="space-y-2">
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
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    className="text-[14px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="flex justify-end gap-4">
            <Link href="/password-reset">
              <span className=" font-semibold text-violet-600">
                forgot &nbsp;password
              </span>
            </Link>
          </p>
          <div className="flex flex-col justify-center text-center w-full gap-2">
            <Button type="submit" className="mt-4">
              {isLoading ? <Spinner /> : "Log in"}
            </Button>
            {/* <span className="space-y-4">Or</span>
            <Link href="/google">
              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-700 text-[18px]"
                onClick={continueWithGoogle}
              >
                Sign in with Google
              </Button>
            </Link> */}
          </div>
          <p className="flex justify-end gap-4 p-2">
            new user
            <Link href="/register">
              <span className=" font-semibold text-orange-600">Sign Up</span>
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
