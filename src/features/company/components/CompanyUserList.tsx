"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@/features/user/types/user";
import { toast } from "sonner";
import { deleteUser, getUsersByCompanyId } from "@/features/user/lib/userApi";
import UserForm from "@/features/user/components/UserForm";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";

interface Props {
  companyId: number;
}

export function CompanyUserList({ companyId }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  const fetchUsers = useCallback(() => {
    getUsersByCompanyId(companyId)
      .then(setUsers)
      .catch(() => toast.error("Failed to fetch users"));
  }, [companyId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Users in this company</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <UserForm
              initialData={{
                companyId: companyId,
                roleId: 0,
                userType: 0,
                userName: "",
                password: "",
              }}
              onSuccess={() => {
                setOpen(false);
                fetchUsers();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {users.length === 0 ? (
        <p className="text-sm text-gray-500">No users found.</p>
      ) : (
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg p-4 shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{user.userName}</p>
                <p className="text-sm text-gray-500">
                  Role: {user.roleName} | Type: {user.userType}
                </p>
              </div>
              <div className="flex gap-2">
                {/* Optional: Add edit modal here later */}
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(user.id)}
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
