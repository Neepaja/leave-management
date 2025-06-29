"use client";

import { useState } from "react";

interface LeaveRecord {
  id: number;
  employee: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: string;
}

const mockData: LeaveRecord[] = [
  {
    id: 1,
    employee: "John Doe",
    type: "Sick Leave",
    from: "2025-06-20",
    to: "2025-06-22",
    days: 3,
    reason: "Fever",
    status: "Approved",
  },
  {
    id: 2,
    employee: "Jane Smith",
    type: "Casual Leave",
    from: "2025-06-25",
    to: "2025-06-25",
    days: 1,
    reason: "Personal",
    status: "Rejected",
  },
];

export default function LeaveRecordsTable() {
  const [records] = useState(mockData);

  const handleDownloadCSV = () => {
    const csvContent = [
      ["Employee", "Type", "From", "To", "Days", "Reason", "Status"],
      ...records.map((rec) => [
        rec.employee,
        rec.type,
        rec.from,
        rec.to,
        rec.days.toString(),
        rec.reason,
        rec.status,
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
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            {["Employee", "Type", "From", "To", "Days", "Reason", "Status"].map((header) => (
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
          {records.map((rec) => (
            <tr key={rec.id} className="hover:bg-gray-50">
              <td className="p-2 border-b">{rec.employee}</td>
              <td className="p-2 border-b">{rec.type}</td>
              <td className="p-2 border-b">{rec.from}</td>
              <td className="p-2 border-b">{rec.to}</td>
              <td className="p-2 border-b">{rec.days}</td>
              <td className="p-2 border-b">{rec.reason}</td>
              <td className="p-2 border-b">{rec.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
