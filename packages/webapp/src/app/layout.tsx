import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BaseLayout } from "./components";
import { Providers } from "./providers";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LOTR RTW Armory",
  description: "LOTR RTW Armory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-side="good">
      <body className={inter.className}>
        <Providers>
          <BaseLayout>{children}</BaseLayout>
        </Providers>
      </body>
    </html>
  );
}