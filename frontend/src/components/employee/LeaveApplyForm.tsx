"use client";

import { useState } from "react";
import TextInput from "@/components/forms/TextInput";
import SelectInput from "@/components/forms/SelectInput";
import TextareaInput from "@/components/forms/TextareaInput";
import { applyLeave } from "@/api/leave";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LeaveApplyForm() {
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    type: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
   const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await applyLeave(form);
      if (res.success) {
        toast.success(res.message || "Leave applied successfully");
        setTimeout(() => {
          router.push("/employee/dashboard");
        }, 2000);
      } else {
        toast.error(res.message || "Failed to apply for leave");
      }
    } catch (err) {
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };


  
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800">Apply for Leave</h2>
      <TextInput
        label="Start Date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        type="date"
        required
      />
      <TextInput
        label="End Date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        type="date"
        required
      />
      <SelectInput
        label="Leave Type"
        name="type"
        value={form.type}
        onChange={handleChange}
        required
        options={[
          { label: "Select type", value: "" },
          { label: "Sick Leave", value: "sick" },
          { label: "Casual Leave", value: "casual" },
          { label: "Earned Leave", value: "earned" },
          { label: "Annual Leave", value: "annual" },
        ]}
      />
      <TextareaInput
        label="Reason"
        name="reason"
        value={form.reason}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
