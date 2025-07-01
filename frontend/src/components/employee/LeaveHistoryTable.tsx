"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchUserLeaves, LeaveItem } from "@/api/leave";

export default function LeaveHistoryTable() {
  const [leaves, setLeaves] = useState<LeaveItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaves = async () => {
      setLoading(true);
      const res = await fetchUserLeaves();

      if (res.success) {
        setLeaves(res.leaves ?? []);
      } else {
        setLeaves([]);
      }
      setLoading(false);
    };
    loadLeaves();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Leave History</h3>
        <Link
          href="/employee/leave/apply"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
        >
          Apply Leave
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600 text-sm">Loading...</p>
      ) : leaves.length === 0 ? (
        <p className="text-gray-600 text-sm">No leave records found.</p>
      ) : (
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Leave Type",
                "From",
                "To",
                "Days",
                "Reason",
                "Reviewed By",
                "Remarks",
                "Status",
              ].map((header) => (
                <th
                  key={header}
                  className="text-left p-2 border-b text-sm font-medium text-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => {
              const start = new Date(leave.startDate);
              const end = new Date(leave.endDate);
              const diffDays =
                Math.ceil(
                  (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
                ) + 1;

              return (
                <tr key={leave.leave_id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{leave.type}</td>
                  <td className="p-2 border-b">{leave.startDate.slice(0, 10)}</td>
                  <td className="p-2 border-b">{leave.endDate.slice(0, 10)}</td>
                  <td className="p-2 border-b">{diffDays}</td>
                  <td className="p-2 border-b">{leave.reason}</td>
                  <td className="p-2 border-b">{leave.approver ? leave.approver.name : "—"}</td>
                  <td className="p-2 border-b">{leave.note ?? "—"}</td>
                  <td className="p-2 border-b">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        leave.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
