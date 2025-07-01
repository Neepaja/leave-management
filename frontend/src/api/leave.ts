import { API_URL } from "@/config/config";
import axios from "axios";

export interface LeaveItem {
  approver: any;
  note: string;
  leave_id: string;
  userId: string;
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  User: {
    name: string;
    email: string;
  };
  approvedBy?: {
    name: string;
    email: string;
  } | null;
}

export interface LeaveResponse {
  success: boolean;
  message: string;
  leaves: LeaveItem[];
}

export const fetchUserLeaves = async (): Promise<{
  success: boolean;
  message: string;
  leaves: LeaveItem[] | null;
}> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<LeaveResponse>(`${API_URL}leave/my-leaves`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      message: response.data.message || "Leave history fetched successfully",
      leaves: response.data.leaves,
    };
  } catch (error: any) {
    console.error("Error fetching leave history:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message || "Something went wrong while fetching leave history",
      leaves: null,
    };
  }
};

export const applyLeave = async (leaveData: {
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}leave/apply`, leaveData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: true,
      message: response.data.message || "Leave applied successfully",
    };
  } catch (error: any) {
    console.error("Error applying leave:", error);
    return {
      success: false,
      message:
        error?.response?.data?.message || "Something went wrong while applying for leave",
    };
  }
};


export const getTeamLeaves = async (): Promise<{
  success: boolean;
  message: string;
  leaves: LeaveItem[] | null;
}> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<LeaveResponse>(`${API_URL}leave/team-leaves`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      success: true,
      message: response.data.message || "Team leaves fetched successfully",
      leaves: response.data.leaves,
    };
  } catch (error: any) {
    console.error("Error fetching team leaves:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Something went wrong while fetching team leaves",
      leaves: null,
    };
  }
};

export const updateLeaveStatus = async (
  leaveId: string,
  status: "approved" | "rejected",
  note?: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `${API_URL}leave/${leaveId}/status`,
      { status, note },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return {
      success: true,
      message: response.data.message || `Leave ${status} successfully`,
    };
  } catch (error: any) {
    console.error(`Error updating leave status:`, error);
    return {
      success: false,
      message:
        error?.response?.data?.message || "Something went wrong while updating leave status",
    };
  }
};
