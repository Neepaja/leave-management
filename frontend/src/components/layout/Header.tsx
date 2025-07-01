"use client";

import { FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Header() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "User");
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setUserName("User");
      }
    } else {
      setUserName("User");
    }
  }, []);

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-semibold text-gray-800">Leave Management System</div>
      <div className="flex items-center gap-2">
        <FiUser className="text-gray-600 text-xl" />
        <span className="text-gray-700 text-sm">{userName}</span>
      </div>
    </header>
  );
}
