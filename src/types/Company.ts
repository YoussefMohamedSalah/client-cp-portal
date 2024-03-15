import { CompanyWorkFlow } from "./Workflow";

export interface Company {
  id: string;
  name: string;
  address: string;
  email: string;
  phone_number: string;
  shift_start: string;
  shift_end: string;
  vat: string;
  size: string;
  logo?: string;
  currency: string;
  is_verified: boolean;
  stepper_state: boolean;
  stepper_step: number;
  workFlow: CompanyWorkFlow;
}

export interface selectedCompany {
  name?: string;
  address?: string;
  email?: string;
  phone_number?: string;
  shift_start?: string;
  shift_end?: string;
  vat?: string;
  size?: string;
  logo?: File | null;
  currency?: string;
  is_verified?: boolean;
  stepper_state?: boolean;
  stepper_step?: number;
}
