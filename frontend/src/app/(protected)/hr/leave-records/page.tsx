import LeaveRecordsTable from "@/components/hr/LeaveRecordsTable";

export default function HRLeaveRecordsPage() {
  return (
    <div className="p-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Leave Records</h2>
        <p className="text-gray-600 text-sm mt-1 mb-6">View and manage leave records across the organization.</p>
      </div>
      <LeaveRecordsTable />
    </div>
  );
}
