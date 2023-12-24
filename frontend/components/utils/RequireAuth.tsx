"use client";
import { useAppSelector } from "@/redux/hooks";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
