import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layouts/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Home() {
  // const {data} = useSession()
  return (
    <main className={cn(` min-h-screen   bg-background font-sans antialiased`, fontSans.variable)}>
      
      <Navbar />
    </main>
  );
}
