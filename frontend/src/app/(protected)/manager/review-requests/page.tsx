import LeaveRequestsTable from "@/components/manager/LeaveRequestsTable";

export default function ManagerDashboardPage() {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Manager Leave Requests</h2>
        <p className="text-gray-600 text-sm mt-1 mb-6">View and manage leave requests from your team.</p>
      </div>
      <LeaveRequestsTable />
    </div>
  );
}