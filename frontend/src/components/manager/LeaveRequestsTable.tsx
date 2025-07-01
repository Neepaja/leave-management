"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";
import { getTeamLeaves, LeaveItem, updateLeaveStatus } from "@/api/leave";

export default function LeaveRequestsTable() {
  const [requests, setRequests] = useState<LeaveItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"approved" | "rejected" | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getTeamLeaves();
      setRequests(data.leaves || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const openModal = (id: string, action: "approved" | "rejected") => {
    setSelectedId(id);
    setActionType(action);
  };

  const closeModal = () => {
    setSelectedId(null);
    setActionType(null);
    setNote("");
  };

  const confirmAction = async () => {
    if (selectedId && actionType) {
      const res = await updateLeaveStatus(selectedId, actionType, note);

      if (res.success) {
        toast.success(res.message);
        // Update local state
        setRequests((prev) =>
          prev.map((req) =>
            req.leave_id === selectedId ? { ...req, status: actionType } : req
          )
        );
      } else {
        toast.error(res.message);
      }
      closeModal();
    }
  };

  if (loading) {
    return <p className="text-gray-600 text-center">Loading leave requests...</p>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Team Leave Requests</h3>
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              {["Employee", "Type", "From", "To", "Days", "Reason", "Status", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="text-left p-2 border-b text-sm font-medium text-gray-600"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => {
              const days = Math.ceil(
                (new Date(req.endDate).getTime() - new Date(req.startDate).getTime()) /
                  (1000 * 60 * 60 * 24) +
                  1
              );

              return (
                <tr key={req.leave_id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{req.User?.name || "N/A"}</td>
                  <td className="p-2 border-b capitalize">{req.type}</td>
                  <td className="p-2 border-b">{req.startDate.slice(0, 10)}</td>
                  <td className="p-2 border-b">{req.endDate.slice(0, 10)}</td>
                  <td className="p-2 border-b">{days}</td>
                  <td className="p-2 border-b">{req.reason}</td>
                  <td className="p-2 border-b">
                    <span
                      className={`px-2 py-1 rounded text-xs capitalize ${
                        req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-2 border-b space-x-2">
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() => openModal(req.leave_id, "approved")}
                          className="text-green-600 hover:underline text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => openModal(req.leave_id, "rejected")}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={selectedId !== null && actionType !== null}
        onClose={closeModal}
        title={`Confirm ${actionType}`}
      >
        <p className="text-sm text-gray-700 mb-2">
          Are you sure you want to {actionType} this leave request?
        </p>
        <textarea
          placeholder="Add a note (optional)"
          className="w-full border rounded p-2 text-sm"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={confirmAction}
            className={`px-4 py-2 rounded text-sm text-white ${
              actionType === "approved"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {actionType === "approved" ? "Approve" : "Reject"}
          </button>
        </div>
      </Modal>
    </>
  );
}
