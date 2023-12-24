"use client";
import type { Metadata } from "next";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useResetPasswordConfirmMutation } from "@/redux/features/Auth/authApiSlice";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
interface Props {
  uid: string;
  token: string;
}
export const metadata: Metadata = {
  title: "Store App | Password Reset",
  description: "User Password Reset Page",
};
const PasswordResetConfirmform = z.object({
  new_password: z.string().min(8, "Password is required with 8 characters"),
  re_new_password: z.string().min(8, "Password is required with 8 characters"),
});
export function PasswordResetConfirmPage({ uid, token }: Props) {
  const router = useRouter();
  const [resetPasswordConfirm, { isLoading }] =
    useResetPasswordConfirmMutation();
  const form = useForm<z.infer<typeof PasswordResetConfirmform>>({
    resolver: zodResolver(PasswordResetConfirmform),
  });
  function onSubmit(values: z.infer<typeof PasswordResetConfirmform>) {
    const { new_password, re_new_password } = values;
    resetPasswordConfirm({ uid, token, new_password, re_new_password })
      .unwrap()
      .then(() => {
        toast.success("Password reset successful");
        router.push("/login");
      })
      .catch(() => {
        toast.error("Password reset failed");
      });
  }
  return (
    <div className="w-[400px] mx-auto rounded-lg p-4 bg-zinc-100 max-md:w-[300px]">
      <h1 className="text-center text-2xl font-medium text-zinc-600">
        Reset Password
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="new_password"
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
            name="re_new_password"
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
          <p className="flex justify-end gap-4 p-2">
            <Button type="submit" className="mt-4">
              {isLoading ? <Spinner /> : "Enter"}
            </Button>
          </p>
        </form>
      </Form>
    </div>
  );
}
