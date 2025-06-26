"use client";

import { useState } from "react";
import { createCompany, updateCompany } from "../lib/companyApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CompanyFormProps {
  id?: number; // <-- new
  onSuccess?: () => void;
  initialData?: {
    name: string;
    description: string;
    isActive: boolean;
  };
}

export default function CompanyForm({
  id,
  onSuccess,
  initialData,
}: CompanyFormProps) {
  const [formData, setFormData] = useState(
    initialData || { name: "", description: "", isActive: true }
  );

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCompany(id, formData);
        toast.success("Company updated successfully!");
      } else {
        const res = await createCompany(formData);
        debugger;
        toast.success("Company created successfully!");
        router.push(`/company/${res.id}/edit`);
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error("Operation failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <div>
        <label className="block">Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          Is Active
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {id ? "Update" : "Create"}
      </button>
    </form>
  );
}
