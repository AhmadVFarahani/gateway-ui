import ServiceForm from "@/features/service/components/ServiceForm";

export default function NewRolePage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Service</h1>
      <ServiceForm />
    </div>
  );
}
