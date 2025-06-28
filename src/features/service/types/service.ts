export interface Service {
  name: string;
  baseURL: string;
  description: string;
  id: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  baseURL: string;
  isActive: boolean;
}

export interface UpdateServiceRequest {
  name: string;
  description: string;
  baseURL: string;
  isActive: boolean;
}
