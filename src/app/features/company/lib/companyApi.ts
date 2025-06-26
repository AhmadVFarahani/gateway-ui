import { Company, CreateCompanyRequest } from "../types/company";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCompanies(): Promise<Company[]> {
  const res = await fetch(`${API_BASE}/api/Company`, { cache: "no-store" });
  return res.json();
}

export async function getCompany(id: number): Promise<Company> {
  const res = await fetch(`${API_BASE}/api/Company/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createCompany(data: CreateCompanyRequest) {
  const res = await fetch(`${API_BASE}/api/Company`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCompany(id: number, data: CreateCompanyRequest) {
  const res = await fetch(`${API_BASE}/api/Company/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok;
}

export async function deleteCompany(id: number) {
  const res = await fetch(`${API_BASE}/api/Company/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}
