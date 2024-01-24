"use client";

import { useSocialAuth } from "@/components/hooks";
import Spinner from "@/components/Spinner";
import { useSocialAuthenticateMutation } from "@/redux/features/Auth/authApiSlice";

export default function GooglePage() {
  const [googleAuthenticate] = useSocialAuthenticateMutation();
  useSocialAuth(googleAuthenticate, "google-oauth2");

  return (
    <div className="my-8">
      <Spinner />
    </div>
  );
}
