import { LoginForm } from "@/components/shared/Forms/LoginForm";
import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center items-center overflow-y-hidden h-screen bg-[url('/background.jpg')] bg-cover">
      <LoginForm />
    </div>
  );
};

export default Page;
