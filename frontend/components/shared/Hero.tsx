import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { Sparkle } from "lucide-react";
const Hero = () => {
  return (
    <main className="flex h-[85vh] w-full justify-center items-center max-sm:flex-col">
      <div className="w-[50vw] max-sm:w-[90vw]">
        <div className="justify-center items-center flex text-center flex-col gap-4">
          <h1 className="text-6xl font-semibold max-lg:text-4xl">
            Buy Your&nbsp;
            <span className="font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300%">
              Products
            </span>
            &nbsp; Online
          </h1>
          <p className="text-zinc-400">
            A place where you can <b>Search</b> and <b>buy</b> products from
            your locality
          </p>
          <div>
            <Link href="/products">
              <Button className="btn-third">
                Explore Now &nbsp;
                <span className="animate-bounce">
                  <Sparkle />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/herobg.jpg"
          alt="hero bg"
          width={500}
          height={500}
          className="rounded-s-full outline-white shadow-none max-sm:rounded-none w-auto h-auto max-sm:hidden"
        />
      </div>
    </main>
  );
};

export default Hero;
