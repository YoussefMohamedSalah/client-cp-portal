import { ProjectStatus } from "enums/enums";
import { Project } from "types/Project";

export const calculateRemainingAmount = (thisInvoiceAmount: number, expenses: number, budget: number): number => {
  let availableAmount: number = calculateProjectAvailableAmount(expenses, budget);
  let remainingValue = Number(availableAmount) - Number(thisInvoiceAmount);
  return remainingValue ? remainingValue : 0.0;
};

export const calculateProjectAvailableAmount = (budget: number, expenses: number): number => {
  let availableAmount: number = Number(budget);
  availableAmount = Number(budget) - Number(expenses);
  return availableAmount ? availableAmount : 0.0;
};

export const calculateRemainingInvoiceAmount = (dueTotal: number, toPay: number): number => {
  let remainingValue = Number(dueTotal) - Number(toPay);
  return remainingValue ? remainingValue : 0.0;
};

export const projectStatusBg = (status: string) => {
  if (!status) return "";
  if (status === ProjectStatus.IN_PROGRESS) return "bg-primary text-white";
  if (status === ProjectStatus.PENDING) return "bg-warning text-black";
  if (status === ProjectStatus.SUSPEND) return "bg-danger text-white";
  if (status === ProjectStatus.COMPLETED) return "bg-success text-white";
}

export const projectStatusVariant = (status: string) => {
  if (!status) return "";
  if (status === ProjectStatus.IN_PROGRESS) return "primary";
  if (status === ProjectStatus.PENDING) return "warning";
  if (status === ProjectStatus.SUSPEND) return "danger";
  if (status === ProjectStatus.COMPLETED) return "success";
}

export const totalProjectExpenses = (project: Project) => {
  if (!project) return 0;
  let po_expenses = Number(project.po_expenses) || 0;
  let pc_expenses = Number(project.pc_expenses) || 0;
  let subcontractor_expenses = Number(project.subcontractor_expenses) || 0;
  let staff_expenses = Number(project.staff_expenses) || 0;

  return po_expenses + pc_expenses + subcontractor_expenses + staff_expenses;
}