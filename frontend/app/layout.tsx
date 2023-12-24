import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomProvider from "@/redux/provider";
import { Setup } from "@/components/utils";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store App",
  description: "Search your favourite products from near by stores",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`scrollbar-hide ${inter.className}`}>
        <CustomProvider>
          <main>
            <Setup />
            {children}
          </main>
        </CustomProvider>
      </body>
    </html>
  );
}
