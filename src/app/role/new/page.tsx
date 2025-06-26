import RoleForm from "@/features/role/components/RoleForm";

export default function NewRolePage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Role</h1>
      <RoleForm />
    </div>
  );
}
