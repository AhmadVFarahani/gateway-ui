"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCompanies } from "@/features/company/lib/companyApi";
import { getRoles } from "@/features/role/lib/roleApi";
import { Company } from "@/features/company/types/company";
import { Role } from "@/features/role/types/role";
import { createUser, updateUser } from "../lib/userApi";

interface UserFormProps {
  id?: number; // <-- new
  onSuccess?: () => void;
  initialData?: {
    userName: string;
    password: string;
    companyId: number;
    roleId: number;
    userType: number;
  };
}

export default function UserForm({
  id,
  onSuccess,
  initialData,
}: UserFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState(
    initialData || {
      userName: "",
      password: "",
      companyId: 0,
      roleId: 0,
      userType: 0,
    }
  );

  const [companies, setCompanies] = useState<Company[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    getCompanies().then(setCompanies);
    getRoles().then(setRoles);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "companyId" || name === "roleId" || name === "userType"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateUser(id, formData);
        toast.success("User updated successfully!");
      } else {
        await createUser(formData);
        toast.success("User created successfully");
        router.push("/user");
      }
      onSuccess?.();
    } catch {
      toast.error("Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-lg mx-auto">
      <div>
        <Label htmlFor="userName">Username</Label>
        <Input
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="companyId">Company</Label>
        <select
          name="companyId"
          value={formData.companyId}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select Company</option>
          {companies.map((c: Company) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="roleId">Role</Label>
        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select Role</option>
          {roles.map((r: Role) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="userType">User Type</Label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          required
          className="w-full border rounded px-2 py-1"
        >
          <option value={0}>Individual</option>
          <option value={1}>Application</option>
        </select>
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
