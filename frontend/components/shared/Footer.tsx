import Link from "next/link";
import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "../ui/button";
import MobFil from "../navbar/MobFil";
const Footer = () => {
  return (
    <>
      <footer className="fixed bottom-0 left-0 w-full flex items-center justify-between  text-center p-2 bg-white h-[50px] z-0">
        <div className="md:w-[80vw] mx-auto flex justify-between p-2 w-full max-md:text-center ">
          {/* <div className="md:hidden fixed right-3 bottom-14 bg-blue-200 rounded-lg">
          <MobFil />
        </div> */}
          <div className="w-full flex p-2 text-center text-neutral-700 max-sm:hidden ">
            <p>© 2023 Developed by:</p>
            <h2 className="ml-2 font-semibold">Leo_Mahendra</h2>
          </div>
          <div className="flex justify-center text-black gap-4 items-center max-sm:flex-1">
            <Button
              variant="outline"
              size="icon"
              className="bg-neutral rounded-lg transform transition-transform hover:scale-125"
            >
              <Link href="https://github.com/LE0-MAhendra" target="_blank">
                <Github />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-neutral rounded-lg transform transition-transform hover:scale-125"
            >
              <Link
                href="https://www.linkedin.com/in/leo-mahendra/"
                target="_blank"
              >
                <Linkedin />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-neutral rounded-lg transform transition-transform hover:scale-125"
            >
              <Link href="/">
                <Instagram />
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
