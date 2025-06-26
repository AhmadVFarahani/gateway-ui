import UserForm from "@/features/user/components/UserForm";
import { getUser } from "@/features/user/lib/userApi";
import { notFound } from "next/navigation";

interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params;
  const userId = parseInt(id);
  if (isNaN(userId)) {
    return notFound();
  }

  try {
    const user = await getUser(userId);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
        <UserForm id={userId} initialData={user} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div className="text-red-600 p-6">Error loading company</div>;
  }
}
