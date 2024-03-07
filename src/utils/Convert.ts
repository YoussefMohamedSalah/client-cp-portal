export const sumDaysLeftFromToDay = (endDate: string) => {
  if (!endDate) return 0;

  let date1: any = new Date();
  let date2: any = new Date(endDate);
  const diffTime = Math.abs(date1 - date2);
  if (date1 >= date2) return 0;

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const sumDateRange = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return 0;
  let date1: any = new Date(startDate);
  let date2: any = new Date(endDate);
  const diffTime = Math.abs(date1 - date2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const calculateDurationDate = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return 0;
  let date1: any = new Date(startDate);
  let date2: any = new Date(endDate);
  const diffTime = Math.abs(date1 - date2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const calculateProjectPercentage = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return 0;
  let date1: any = new Date(startDate);
  let date2: any = new Date(endDate);
  if (date1 >= date2) return 100;

  const total = sumDateRange(startDate, endDate);
  const completed = sumDaysLeftFromToDay(endDate);
  let daysDiff = total - completed;

  if (completed > total) return 100;

  return Math.round((daysDiff / total) * 100);
};

export const calculateWorkingPercentage = (
  shift_start: string,
  shift_end: string,
  total_Shift_Hours: string,
): number => {
  if (!shift_start || !shift_end || !total_Shift_Hours) return 0;

  let shiftStartHours = shift_start.split(":")[0];
  let shiftStartMinutes = shift_start.split(":")[1];
  let totalShiftHours = total_Shift_Hours.split(":")[0];
  let totalShiftMinutes = total_Shift_Hours.split(":")[1];
  let shiftStartInMinutes = parseInt(shiftStartHours) * 60 + parseInt(shiftStartMinutes);
  let totalShiftInMinutes = parseInt(totalShiftHours) * 60 + parseInt(totalShiftMinutes);

  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let currentMinute = currentTime.getMinutes();
  let currentInMinutes = currentHour * 60 + currentMinute;

  let workingPercentage = ((currentInMinutes - shiftStartInMinutes) / totalShiftInMinutes) * 100;
  let workingPercentageNumber = parseInt(workingPercentage.toFixed(2));

  if (workingPercentageNumber >= 100) return 100;
  return parseInt(workingPercentage.toFixed(2));
};
