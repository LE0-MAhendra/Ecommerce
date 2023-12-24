import React from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/navbar/Navbar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-center min-h-screen container ">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
