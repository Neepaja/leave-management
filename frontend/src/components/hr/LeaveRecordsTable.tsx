"use client";

import { getTeamLeaves, LeaveItem } from "@/api/leave";
import { useEffect, useState } from "react";

export default function LeaveRecordsTable() {
  const [records, setRecords] = useState<LeaveItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaves = async () => {
      const data = await getTeamLeaves();
      if (data && data.leaves) {
        setRecords(data.leaves);
      }
      setLoading(false);
    };
    loadLeaves();
  }, []);

const handleDownloadCSV = () => {
const csvContent = [
  ["Employee", "Type", "From", "To", "Days", "Reason", "Status", "Approved By", "Note"],
  ...records.map((rec) => [
    rec.User.name,
    rec.type,
    rec.startDate.split("T")[0],
    rec.endDate.split("T")[0],
    String(
      (new Date(rec.endDate).getTime() - new Date(rec.startDate).getTime()) /
        (1000 * 60 * 60 * 24) +
        1
    ),
    rec.reason,
    rec.status,
    rec.approver?.name || "",
    rec.note || "",
  ]),
]
  .map((row) => row.join(","))
  .join("\n");


    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leave_records.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">All Leave Records</h3>
        <button
          onClick={handleDownloadCSV}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
        >
          Download CSV
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading leave records...</p>
      ) : records.length === 0 ? (
        <p className="text-gray-500 text-sm">No leave records found.</p>
      ) : (
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
               {["Employee", "Type", "From", "To", "Days", "Reason", "Reviewed By", "Remarks", "Status"].map((header) => (
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
            {records.map((rec) => {
              const days =
                (new Date(rec.endDate).getTime() - new Date(rec.startDate).getTime()) /
                  (1000 * 60 * 60 * 24) +
                1;
              return (
                <tr key={rec.leave_id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{rec.User.name}</td>
                  <td className="p-2 border-b">{rec.type}</td>
                  <td className="p-2 border-b">{rec.startDate.split("T")[0]}</td>
                  <td className="p-2 border-b">{rec.endDate.split("T")[0]}</td>
                  <td className="p-2 border-b">{days}</td>
                  <td className="p-2 border-b">{rec.reason}</td>
                  <td className="p-2 border-b">{rec.approver?.name || "—"}</td>
                  <td className="p-2 border-b">{rec.note || "—"}</td>
                  <td className="p-2 border-b capitalize">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        rec.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : rec.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {rec.status}
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