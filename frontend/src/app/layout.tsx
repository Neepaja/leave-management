import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Leave Management System",
  description: "Apply and manage leaves efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex h-full overflow-hidden bg-[#ededed]">
        <Sidebar />

        <div className="flex flex-col flex-1 min-h-screen">
          <Header title="Dashboard" />
          <main className="flex-1 overflow-hidden p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
