import RoleForm from "@/features/role/components/RoleForm";
import { getRole } from "@/features/role/lib/roleApi";
import { notFound } from "next/navigation";

interface EditRolePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRolePage({ params }: EditRolePageProps) {
  const { id } = await params;
  const roleId = parseInt(id);
  if (isNaN(roleId)) {
    return notFound();
  }
  try {
    const role = await getRole(roleId);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Role</h1>
        <RoleForm id={roleId} initialData={role} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div className="text-red-600 p-6">Error loading role</div>;
  }
}
