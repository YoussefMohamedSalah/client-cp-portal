export const formatCsvTitle = (shortCut: string) => {
  const optionsDate: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const datePart = new Date().toLocaleDateString('en-GB', optionsDate).replace(/\//g, '-');
  const timePart = new Date().toLocaleTimeString('en-GB', optionsTime).replace(/:/g, '-');

  return `${shortCut}-${datePart}-${timePart}`;
};
