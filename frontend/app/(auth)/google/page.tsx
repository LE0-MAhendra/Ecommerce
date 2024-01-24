import GooglePage from "@/components/Googlepage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <GooglePage />
    </Suspense>
  );
};

export default page;
