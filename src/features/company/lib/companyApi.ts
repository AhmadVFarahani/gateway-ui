import { Company, CreateCompanyRequest } from "../types/company";

const baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Company`;

export async function getCompanies(): Promise<Company[]> {
  const res = await fetch(`${baseUrl}`, { cache: "no-store" });
  return res.json();
}

export async function getCompany(id: number): Promise<Company> {
  const res = await fetch(`${baseUrl}/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createCompany(data: CreateCompanyRequest) {
  const res = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCompany(id: number, data: CreateCompanyRequest) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok;
}

export async function deleteCompany(id: number) {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  return res.ok;
}
