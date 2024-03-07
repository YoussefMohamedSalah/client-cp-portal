import { IOption } from "types/Forms/option";

export const getOptions = (data: any[], defaultLabel: string | null): IOption[] => {
  let options = data.map((option) => {
    return {
      label: option.name,
      value: option.id,
    };
  });

  if (defaultLabel) {
    options.unshift({
      label: `${defaultLabel}`,
      value: "0",
    });
  }

  return options;
};
