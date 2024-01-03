import { useRouter } from "next/router";

const GoTo = (destination: string) => {
  const router = useRouter();
  if (destination) {
    router.push(destination);
  } else {
    router.push("/");
  }
};

export default GoTo;
