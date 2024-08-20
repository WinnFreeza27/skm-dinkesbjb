import { Inter } from "next/font/google";
import "./globals.css";
import AuthListener from "@/components/hoc/authListener";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SKM-DINKES",
  description: "Survey Kepuasan Masyarakat Dinkes Banjarbaru",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <link rel="icon" href="./icon.png" sizes="any" />
    </head>
      <body className={inter.className}>
      <AuthListener />
      {children}
      </body>
    </html>
  );
}
