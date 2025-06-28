import {
  CreateServiceRequest,
  Service,
  UpdateServiceRequest,
} from "../types/service";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Services`;

export async function getServices(): Promise<Service[]> {
  const res = await fetch(baseUrl, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch Services");
  return res.json();
}

export async function getService(id: number): Promise<Service> {
  const res = await fetch(`${baseUrl}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch service");
  return res.json();
}

export async function createService(data: CreateServiceRequest) {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create service");
  return res.json();
}

export async function updateService(
  id: number,
  data: UpdateServiceRequest
): Promise<void> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update service");
}

export async function deleteService(id: number): Promise<void> {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete service");
}
