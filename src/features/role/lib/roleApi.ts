import { CreateRoleRequest, Role, UpdateRoleRequest } from "../types/role";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Role`;

export async function getRoles(): Promise<Role[]> {
  const res = await fetch(baseUrl, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch Roles");
  return res.json();
}

export async function getRole(id: number): Promise<Role> {
  const res = await fetch(`${baseUrl}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch role");
  return res.json();
}

export async function createRole(data: CreateRoleRequest): Promise<void> {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create role");
}

export async function updateRole(
  id: number,
  data: UpdateRoleRequest
): Promise<void> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update role");
}

export async function deleteRole(id: number): Promise<void> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete role");
}
