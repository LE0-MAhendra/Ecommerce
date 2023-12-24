import { PasswordResetConfirmPage } from "@/components/shared/Forms/PasswordResetConfirm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store | Password Reset",
  description: "password reset page",
};
interface Props {
  params: {
    uid: string;
    token: string;
  };
}
const page = ({ params: { uid, token } }: Props) => {
  return (
    <div className="flex justify-center items-center overflow-y-hidden h-screen bg-[url('/background.jpg')] bg-cover">
      <PasswordResetConfirmPage uid={uid} token={token} />
    </div>
  );
};

export default page;
