import ServiceForm from "@/features/service/components/ServiceForm";
import { getService } from "@/features/service/lib/service";
import { notFound } from "next/navigation";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const { id } = await params;
  const serviceId = parseInt(id);
  if (isNaN(serviceId)) {
    return notFound();
  }

  try {
    const service = await getService(serviceId);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Service</h1>
        <ServiceForm id={serviceId} initialData={service} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div className="text-red-600 p-6">Error loading service</div>;
  }
}
