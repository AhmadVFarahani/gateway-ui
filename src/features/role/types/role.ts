export interface Role {
  name: string;
  description: string;
  id: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
}

export interface UpdateRoleRequest {
  name: string;
  description: string;
}
