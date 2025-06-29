"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";

interface LeaveRequest {
  id: number;
  employee: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const mockData: LeaveRequest[] = [
  {
    id: 1,
    employee: "John Doe",
    type: "Sick Leave",
    from: "2025-06-20",
    to: "2025-06-22",
    days: 3,
    reason: "Fever",
    status: "Pending",
  },
  {
    id: 2,
    employee: "Jane Smith",
    type: "Casual Leave",
    from: "2025-06-25",
    to: "2025-06-25",
    days: 1,
    reason: "Personal",
    status: "Approved",
  },
];

export default function LeaveRequestsTable() {
  const [requests, setRequests] = useState(mockData);

  // Modal control
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<"Approved" | "Rejected" | null>(null);
  const [note, setNote] = useState("");

  const openModal = (id: number, action: "Approved" | "Rejected") => {
    setSelectedId(id);
    setActionType(action);
  };

  const closeModal = () => {
    setSelectedId(null);
    setActionType(null);
    setNote("");
  };

  const confirmAction = () => {
    if (selectedId !== null && actionType) {
      setRequests((prev) =>
        prev.map((req) =>
          req.id === selectedId ? { ...req, status: actionType } : req
        )
      );
      console.log(`Request ${selectedId} marked as ${actionType}. Note: ${note}`);
    }
    closeModal();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Leave Requests</h3>
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              {["Employee", "Type", "From", "To", "Days", "Reason", "Status", "Actions"].map((header) => (
                <th key={header} className="text-left p-2 border-b text-sm font-medium text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="p-2 border-b">{req.employee}</td>
                <td className="p-2 border-b">{req.type}</td>
                <td className="p-2 border-b">{req.from}</td>
                <td className="p-2 border-b">{req.to}</td>
                <td className="p-2 border-b">{req.days}</td>
                <td className="p-2 border-b">{req.reason}</td>
                <td className="p-2 border-b">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      req.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : req.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="p-2 border-b space-x-2">
                  {req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => openModal(req.id, "Approved")}
                        className="text-green-600 hover:underline text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => openModal(req.id, "Rejected")}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for confirmation */}
      <Modal
        isOpen={selectedId !== null && actionType !== null}
        onClose={closeModal}
        title={`Confirm ${actionType}`}
      >
        <p className="text-sm text-gray-700 mb-2">
          Are you sure you want to {actionType?.toLowerCase()} this leave request?
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
              actionType === "Approved"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {actionType}
          </button>
        </div>
      </Modal>
    </>
  );
}
