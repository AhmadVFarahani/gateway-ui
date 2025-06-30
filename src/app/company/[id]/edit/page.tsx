import CompanyForm from "@/features/company/components/CompanyForm";
import { getCompany } from "@/features/company/lib/companyApi";
import { notFound } from "next/navigation";

interface EditCompanyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCompanyPage({
  params,
}: EditCompanyPageProps) {
  const { id } = await params;
  const companyId = parseInt(id);
  if (isNaN(companyId)) {
    return notFound();
  }

  try {
    const company = await getCompany(companyId);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Company</h1>
        <CompanyForm id={companyId} initialData={company} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div className="text-red-600 p-6">Error loading company</div>;
  }
}
