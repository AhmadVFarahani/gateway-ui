export interface User {
  userName: string;
  password: string;
  roleId: number;
  roleName: string;
  companyId: number;
  companyName: string;
  isActive: boolean;
  userType: number;
  id: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateUserRequest {
  userName: string;
  password: string;
  companyId: number;
  roleId: number;
  userType: number;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  isActive: boolean;
}
