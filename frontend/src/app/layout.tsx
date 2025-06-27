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
      <body className="flex h-full overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}

