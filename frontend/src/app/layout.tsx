import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Leave Management System",
  description: "Apply and manage leaves efficiently",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-[#ededed]">{children}</body>
    </html>
  );
}
