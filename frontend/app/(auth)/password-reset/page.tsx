import { PasswordResetForm } from "@/components/shared/Forms/PasswordResetPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store | Request Reset",
  description: "password reset page",
};
const page = () => {
  return (
    <div className="flex justify-center items-center overflow-y-hidden h-screen bg-[url('/background.jpg')] bg-cover">
      <PasswordResetForm />;
    </div>
  );
};

export default page;
