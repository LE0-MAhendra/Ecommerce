import MobFil from "@/components/navbar/MobFil";
import LeftSec from "@/components/shared/main/LeftSec";
import RightSec from "@/components/shared/main/RightSec";
import React from "react";
const Products = () => {
  return (
    <div className="flex mt-3 container gap-2 mb-8 h-full">
      <div className="w-[300px] bg-zinc-100 p-2 rounded-lg h-[70vh] max-xl:w-[320px] max-lg:w-[330px] hidden md:inline shadow-2xl">
        <LeftSec />
      </div>
      <div className="md:hidden fixed right-3 bottom-14 bg-blue-200 rounded-lg z-10">
        <MobFil />
      </div>
      <div className="w-full h-screen mb-12">
        <RightSec />
        <div className="m-8 md:hidden">
          <br />
        </div>
      </div>
    </div>
  );
};

export default Products;
