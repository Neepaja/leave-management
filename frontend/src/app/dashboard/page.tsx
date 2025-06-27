"use client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome back, Neepaja</h2>
        <p className="text-gray-600 text-sm mt-1">Here’s an overview of your leave activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Total Leaves</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Pending Requests</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">3</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">Approved Leaves</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">8</p>
        </div>
      </div>
    </div>
  );
}
