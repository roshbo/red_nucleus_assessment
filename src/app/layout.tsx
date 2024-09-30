import type { Metadata } from "next";
import "./globals.css";
import { inter, roboto } from "@/lib/fonts";
import { AppWrapper } from "@/context";

export const metadata: Metadata = {
  title: "Understanding Disease States",
  description: "Red Nucleus Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter} ${roboto} font-latin`}>
        <AppWrapper>{children}</AppWrapper>
        <footer className="p-2 text-center text-sm text-foreground absolute bottom-0 flex justify-center w-full">
          &copy; 2004 Eugine Chandrasekara
        </footer>
      </body>
    </html>
  );
}
