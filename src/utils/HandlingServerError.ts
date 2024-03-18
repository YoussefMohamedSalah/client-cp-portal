import { ErrorType, inputsValidationType } from "types/Error";

// PUBLIC
export const validateInputs = (validationData: inputsValidationType): ErrorType[] => {
  const { requiredToValidate, numbersToValidate, stringsToValidate, inputs } = validationData;
  const errorsArray: ErrorType[] = [];

  const error: ErrorType = {
    index: Math.random(),
    type: "Missing Required Data!",
    msg: "Kindly Add All Required Inputs with (*) flag.",
  };

  // STEP 1 - Check if inputs object is valid.
  if (!inputs || isObjEmpty(inputs)) return [error];

  // STEP 2 - Check if all required Inputs exists.
  if (requiredToValidate && requiredToValidate.length > 0) {
    if (isMissing({ requiredToValidate, inputs })) {
      return [error];
    }
  }

  // STEP 3 - Check if all Numbers Is In Numbers Format.
  if (numbersToValidate && numbersToValidate.length > 0) {
    let validationErrors = validateNumberInputs({ numbersToValidate, inputs });
    if (validationErrors && validationErrors.length > 0) errorsArray.push(...validationErrors);
  }

  // STEP 4 - Check if all Strings Is In string Format.
  if (stringsToValidate && stringsToValidate.length > 0) {
    let validationErrors = validateStringInputs({ stringsToValidate, inputs });
    if (validationErrors && validationErrors.length > 0) errorsArray.push(...validationErrors);
  }

  return errorsArray;
};

export const handleServerError = (serverError: any): ErrorType[] => {
  if (serverError && serverError.data && serverError.data.msg) {
    const error: ErrorType = {
      index: Math.random(),
      type: "Internal Server Error!",
      msg: `${serverError.data?.msg!}`,
    };

    if (serverError.status === 401) error.type = "Invalid Inputs";
    return [error];
  } else return [];
};

export const handleError = (errorTxt: string): ErrorType[] => {
  if (errorTxt) {
    const error: ErrorType = {
      index: Math.random(),
      type: "Critical Error!",
      msg: `${errorTxt}`,
    };
    return [error];
  } else return [];
};

// PRIVATE.
// Return True If Item Is Missing
const isMissing = (validationData: inputsValidationType): boolean => {
  const { requiredToValidate, inputs } = validationData;
  let missingInputs: string[] | undefined = [];

  missingInputs = requiredToValidate?.filter(
    (key) => inputs[key] === undefined || inputs[key] === "" || inputs[key] === null,
  );

  return missingInputs?.length! > 0 || false;
};

const validateNumberInputs = (validationData: inputsValidationType): ErrorType[] => {
  const { numbersToValidate, inputs } = validationData;
  const errorsArray: ErrorType[] = [];
  const error: ErrorType = {
    index: Math.random(),
    type: "Invalid Number!",
    msg: "Check Input Types Please.",
  };

  for (const key in inputs) {
    if (numbersToValidate?.includes(key)) {
      let selectedNumber = Number(inputs[key]);
      if (isNaN(selectedNumber) || selectedNumber === null) {
        const errorToReturn = { ...error };
        errorToReturn.index = Math.random();
        errorToReturn.type = "Invalid Input Type!";
        errorToReturn.msg = `${key} Must Be A Number`;
        errorsArray.push(errorToReturn);
      }
    }
  }
  return errorsArray;
};

const validateStringInputs = (validationData: inputsValidationType): ErrorType[] => {
  const { stringsToValidate, inputs } = validationData;
  const errorsArray: ErrorType[] = [];
  const error: ErrorType = {
    index: Math.random(),
    type: "Invalid Text Type!",
    msg: "Check Input Types Please.",
  };

  for (const key in inputs) {
    if (stringsToValidate?.includes(key)) {
      if (isNumber(inputs[key]) || inputs[key] === null) {
        const errorToReturn = { ...error };
        errorToReturn.index = Math.random();
        errorToReturn.type = "Invalid Input Type!";
        errorToReturn.msg = `${key} Must Be A Text Type`;
        errorsArray.push(errorToReturn);
      }
    }
  }

  return errorsArray;
};

const isObjEmpty = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};
const isNumber = (val: any) => {
  return !isNaN(parseFloat(val)) && !isNaN(val - 0);
};
