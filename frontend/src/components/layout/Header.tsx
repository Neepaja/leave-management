"use client";

import { FiUser } from "react-icons/fi";

interface HeaderProps {
  title?: string;
}

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-semibold text-gray-800">Leave Management System</div>
      <div className="flex items-center gap-2">
        <FiUser className="text-gray-600 text-xl" />
        <span className="text-gray-700 text-sm">Neepaja</span>
      </div>
    </header>
  );
}
