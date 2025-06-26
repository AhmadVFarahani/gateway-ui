"use client";

import { useRouter } from "next/navigation";
import { createRole, updateRole } from "../lib/roleApi";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

interface RoleFormProps {
  id?: number; // <-- new
  onSuccess?: () => void;
  initialData?: {
    name: string;
    description: string;
  };
}

export default function RoleForm({
  id,
  onSuccess,
  initialData,
}: RoleFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateRole(id, formData);
        toast.success("Role updated successfully");
      } else {
        await createRole(formData);
        toast.success("Role created successfully");
      }
      onSuccess?.();
      router.push("/role");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <div>
        <Label htmlFor="name">Role Name</Label>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
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

      <Button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {" "}
        {id ? "Update" : "Create"}
      </Button>
    </form>
  );
}
