import LeaveRequestsTable from "@/components/manager/LeaveRequestsTable";

export default function ManagerDashboardPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>
      <p className="text-gray-600 text-sm mt-1">View and manage leave requests from your team.</p>
      <LeaveRequestsTable />
    </div>
  );
}
