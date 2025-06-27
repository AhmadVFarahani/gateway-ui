import { User, CreateUserRequest } from "../types/user";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Users`;

export async function getUsers(): Promise<User[]> {
  const res = await fetch(baseUrl, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getUsersByCompanyId(companyId: number): Promise<User[]> {
  debugger;
  const res = await fetch(`${baseUrl}/byCompany?companyId=${companyId}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getUser(id: number): Promise<User> {
  const res = await fetch(`${baseUrl}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function createUser(data: CreateUserRequest): Promise<void> {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create user");
}

export async function updateUser(
  id: number,
  data: CreateUserRequest
): Promise<void> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update user");
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
}
