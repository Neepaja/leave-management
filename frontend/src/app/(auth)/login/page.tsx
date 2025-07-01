"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/auth";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await loginUser({ email, password });
    if (res) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      switch (res.user.role) {
        case "employee":
          router.push("/employee/dashboard");
          break;
        case "manager":
          router.push("/manager/review-requests");
          break;
        case "hr":
          router.push("/hr/leave-records");
          break;
        default:
          router.push("/");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow max-w-sm w-full mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border rounded px-3 py-2 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FiEyeOff
              size={18}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <FiEye
              size={18}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
        <div className="text-right">
          <Link href="/forgot-password" className="text-blue-600 text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
