"use client";

import { useState } from "react";
import TextInput from "@/components/forms/TextInput";
import SelectInput from "@/components/forms/SelectInput";
import TextareaInput from "@/components/forms/TextareaInput";

export default function LeaveApplyForm() {
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    type: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-lg mx-auto">
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
