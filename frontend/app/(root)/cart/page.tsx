import RequireAuth from "@/components/utils/RequireAuth";
import React from "react";

import Cartpage from "@/components/cartSec/Cartpage";

const page = () => {
  return (
    <RequireAuth>
      <Cartpage />
    </RequireAuth>
  );
};

export default page;
