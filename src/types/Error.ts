export interface inputsValidationType {
	requiredToValidate?: string[];
	numbersToValidate?: string[];
	stringsToValidate?: string[];
	inputs?: { [key: string]: number | string | undefined } | any;
};

export interface ErrorType {
	type: string;
	index: number;
	msg: string;
};