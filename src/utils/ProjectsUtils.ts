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
