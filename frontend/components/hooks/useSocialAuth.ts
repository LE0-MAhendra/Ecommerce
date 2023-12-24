import { Glogin } from "@/redux/features/Auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { toast } from "react-toastify";

export default function useSocialAuth(authenticate: any, provider: string) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const effectRan = useRef(false);

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (state && code && !effectRan.current) {
      authenticate({ provider, state, code })
        .unwrap()
        .then((response: any) => {
          const { accessToken, refreshToken } = response.data;
          dispatch(Glogin({ gstate: state, accessToken, refreshToken }));
          toast.success("Logged in");
          router.push("/");
        })
        .catch(() => {
          toast.error("Google oAuth issue please login with your credentials");
          router.push("/login");
        });
    }

    return () => {
      effectRan.current = true;
    };
  }, [authenticate, provider, dispatch]);
}
