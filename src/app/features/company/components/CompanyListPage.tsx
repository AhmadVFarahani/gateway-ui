"use client";

import { useEffect, useState } from "react";
import { getCompanies, deleteCompany } from "../lib/companyApi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Company } from "../types/company";
import { toast } from "sonner";

export function CompanyListPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCompanies()
      .then(setCompanies)
      .catch(() => setError("Failed to fetch companies"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCompany(id);
      setCompanies((prev) => prev.filter((company) => company.id !== id));
      toast.success("The company has been removed.");
    } catch (e) {
      toast.success("Something went wrong while deleting" + e);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Link href="/company/new">
          <Button>Create New Company</Button>
        </Link>
      </div>

      {companies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <div className="space-y-4">
          {companies.map((company) => (
            <div
              key={company.id}
              className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{company.name}</h2>
                <p className="text-sm text-gray-500">
                  Description: {company.description}
                </p>
                <p className="text-sm text-gray-500">
                  Active: {company.isActive ? "Yes" : "No"}
                </p>
              </div>

              <div className="flex gap-2">
                <Link href={`/company/${company.id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(company.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
