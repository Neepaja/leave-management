import Link from "next/link";

const mockData = [
  {
    type: "Sick Leave",
    from: "2025-06-01",
    to: "2025-06-03",
    days: 3,
    reason: "Fever and rest",
    approvedBy: "Manager A",
    status: "Approved",
  },
  {
    type: "Casual Leave",
    from: "2025-06-10",
    to: "2025-06-10",
    days: 1,
    reason: "Personal work",
    approvedBy: "Manager B",
    status: "Pending",
  },
];

export default function LeaveHistoryTable() {
  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Leave History</h3>
            <div className="flex justify-end">
        <Link
          href="/employee/leave/apply"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
        >
          Apply Leave
        </Link>
      </div>
      </div>
      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            {["Leave Type", "From", "To", "Days", "Reason", "Approved By", "Status", "Action"].map((header) => (
              <th key={header} className="text-left p-2 border-b text-sm font-medium text-gray-600">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockData.map((leave, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-2 border-b">{leave.type}</td>
              <td className="p-2 border-b">{leave.from}</td>
              <td className="p-2 border-b">{leave.to}</td>
              <td className="p-2 border-b">{leave.days}</td>
              <td className="p-2 border-b">{leave.reason}</td>
              <td className="p-2 border-b">{leave.approvedBy}</td>
              <td className="p-2 border-b">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    leave.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {leave.status}
                </span>
              </td>
              <td className="p-2 border-b">
                <button className="text-blue-600 hover:underline text-sm">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
