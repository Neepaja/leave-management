"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX, FiHome, FiEdit, FiEye, FiCheckCircle, FiFolder } from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const links = [
    { href: "/employee/dashboard", label: "Dashboard", icon: <FiHome /> },
    { href: "/employee/leave/apply", label: "Apply Leave", icon: <FiEdit /> },
    { href: "/manager/review-requests", label: "Review Requests", icon: <FiCheckCircle /> },
    { href: "/hr/leave-records", label: "Leave Records", icon: <FiFolder /> },
  ];

return (
  <div
    className={`h-screen bg-white text-black p-4 transition-all duration-300 ease-in-out overflow-hidden shadow-lg ${
      isOpen ? "w-64" : "w-16"
    }`}
  >
    <button
      onClick={toggleSidebar}
      className="mb-6 p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors text-gray-700 w-full flex justify-center"
    >
      {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
    </button>

    <nav className="flex flex-col space-y-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center ${isOpen ? "justify-start px-3" : "justify-center"} py-2 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap min-h-[44px] ${
            pathname === link.href ? "bg-blue-100 text-blue-700 font-medium" : ""
          }`}
        >
          <span className="text-xl">{link.icon}</span>
          {isOpen && <span className="ml-3">{link.label}</span>}
        </Link>
      ))}
    </nav>
  </div>
);
};
export default Sidebar;