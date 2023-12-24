"use client";
import React from "react";
import { useResetPasswordMutation } from "@/redux/features/Auth/authApiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Spinner from "../../Spinner";
import { Button } from "../../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../../ui/form";
import { Input } from "../../ui/input";
const ResetformSchema = z.object({
  email: z.string().email("Invalid email"),
});

export function PasswordResetForm() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const form = useForm<z.infer<typeof ResetformSchema>>({
    resolver: zodResolver(ResetformSchema),
  });
  function onSubmit(value: z.infer<typeof ResetformSchema>) {
    const { email } = value;
    resetPassword(email)
      .unwrap()
      .then(() => {
        toast.success("Request Sent! Check your email for reset link ");
      })
      .catch(() => {
        toast.error("email does not exist");
      });
  }
  return (
    <div className="w-[400px] mx-auto rounded-lg p-4 bg-zinc-100 max-md:w-[300px]">
      <h1 className="text-center text-2xl font-medium text-zinc-600">
        Password Reset
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
