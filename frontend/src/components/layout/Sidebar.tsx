"use client";

import { logoutUser } from "@/api/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiEdit,
  FiCheckCircle,
  FiFolder,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userString = localStorage.getItem("user");
      if (userString) {
        try {
          const user = JSON.parse(userString);
          setRole(user.role || null);
        } catch {
          setRole(null);
        }
      }
    }
  }, []);

  const allLinks = [
    {
      href: "/employee/dashboard",
      label: "Dashboard",
      icon: <FiHome />,
      roles: ["employee"],
    },
    {
      href: "/employee/leave/apply",
      label: "Apply Leave",
      icon: <FiEdit />,
      roles: ["employee"],
    },
    {
      href: "/manager/review-requests",
      label: "Review Requests",
      icon: <FiCheckCircle />,
      roles: ["manager"],
    },
    {
      href: "/hr/leave-records",
      label: "Leave Records",
      icon: <FiFolder />,
      roles: ["hr"],
    },
    {
      href: "/logout",
      label: "Logout",
      icon: <FiLogOut />,
      roles: ["employee", "manager", "hr"], 
    },
  ];

  const filteredLinks = role
    ? allLinks.filter((link) => link.roles.includes(role))
    : [];

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

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
        {filteredLinks.map((link) =>
          link.href === "/logout" ? (
            <button
              key={link.label}
              onClick={handleLogout}
              className={`flex items-center w-full ${
                isOpen ? "justify-start px-3" : "justify-center"
              } py-2 rounded-lg hover:bg-red-100 text-red-600 transition-colors whitespace-nowrap min-h-[44px]`}
            >
              <span className="text-xl">{link.icon}</span>
              {isOpen && <span className="ml-3">{link.label}</span>}
            </button>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center ${
                isOpen ? "justify-start px-3" : "justify-center"
              } py-2 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap min-h-[44px] ${
                pathname === link.href
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : ""
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              {isOpen && <span className="ml-3">{link.label}</span>}
            </Link>
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
