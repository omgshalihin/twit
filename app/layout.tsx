import SideBar from "@/components/sidebar";
import NavBar from "@/components/navbar";
import "./globals.css";
import { TbBrandTwitter } from "react-icons/tb";

export const metadata = {
  title: "Twit",
  icons: {
    icon: "/twitter.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
