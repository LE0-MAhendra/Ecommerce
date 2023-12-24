import { SignupForm } from "@/components/shared/Forms/SignupForm";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center overflow-y-hidden h-screen bg-[url('/background.jpg')] bg-cover">
      <SignupForm />
    </div>
  );
};

export default page;
