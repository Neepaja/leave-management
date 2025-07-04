"use client";
import LeaveSummaryCard from "@/components/ui/LeaveSummaryCard";
import LeaveHistoryTable from "@/components/employee/LeaveHistoryTable";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Leave Overview</h2>
        <p className="text-gray-600 text-sm mt-1">Check your leave activity and balances.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <LeaveSummaryCard title="Available Leaves" value="12" color="bg-blue-100 text-blue-800" />
        <LeaveSummaryCard title="Sick Leaves" value="5" color="bg-green-100 text-green-800" />
        <LeaveSummaryCard title="Casual Leaves" value="4" color="bg-yellow-100 text-yellow-800" />
        <LeaveSummaryCard title="Paid/Earned Leaves" value="3" color="bg-purple-100 text-purple-800" />
      </div>

      <LeaveHistoryTable />
    </div>
  );
}
