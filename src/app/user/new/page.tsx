import { UserForm } from "@/features/user/components/UserForm";

export default function NewCompanyPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">New User</h1>
      <UserForm />
    </div>
  );
}
