import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import ParentProvider from "./ParentProvider";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--poppins-font",
});

export const metadata: Metadata = {
  title: "SIMPfy",
  description: "The artists that you SIMP the most!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <ParentProvider>{children}</ParentProvider>
      </body>
    </html>
  );
}
