export type Company = {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
};

export type CreateCompanyRequest = {
  name: string;
  description: string;
};

export type UpdateCompanyRequest = {
  name: string;
  description: string;
  isactive: boolean;
};
