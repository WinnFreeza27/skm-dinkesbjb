import { Inter } from "next/font/google";
import "./globals.css";
import AuthListener from "@/components/hoc/authListener";
import Navbar from "@/components/component/navbar";
import Footer from "@/components/component/footer";
import FormLogin from "@/components/component/formLogin";
import FormLogout from "@/components/component/formLogout";

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
      <body className={`${inter.className} h-screen overflow-x-hidden`}>
      <AuthListener />
      <Navbar />
      <Footer>
        {children}
        <FormLogin />
        <FormLogout />
      </Footer>
      </body>
    </html>
  );
}
