"use client";

export default function LoginPage() {
  return (
    <div className="bg-white p-8 rounded shadow max-w-sm w-full">
      <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
