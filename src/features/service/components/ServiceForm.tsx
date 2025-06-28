"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { createService, updateService } from "../lib/service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ServiceFormProps {
  id?: number; // <-- new
  onSuccess?: () => void;
  initialData?: {
    name: string;
    description: string;
    baseURL: string;
    isActive: boolean;
  };
}

export default function ServiceForm({
  id,
  onSuccess,
  initialData,
}: ServiceFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      baseURL: "",
      isActive: true,
    }
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
        await updateService(id, formData);
        toast.success("Role updated successfully");
      } else {
        const res = await createService(formData);
        toast.success("Role created successfully");
        router.push(`/service/${res.id}/edit`);
      }
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <div>
        <Label htmlFor="name">Service Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="baseURL">Base URL</Label>
        <Input
          id="baseURL"
          name="baseURL"
          value={formData.baseURL}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
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
