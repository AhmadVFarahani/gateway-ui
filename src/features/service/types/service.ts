export interface Service {
  name: string;
  baseUrl: string;
  description: string;
  id: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  baseUrl: string;
  isActive: boolean;
}

export interface UpdateServiceRequest {
  name: string;
  description: string;
  baseUrl: string;
  isActive: boolean;
}
