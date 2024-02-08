import { ErrorType } from "@/types/Error";

export const handleServerError = (serverError: any): ErrorType[] => {
	if (serverError && serverError.data && serverError.data.msg) {

		const error: ErrorType = {
			index: Math.random(),
			type: 'Internal Server Error!',
			msg: `${serverError.data?.msg!}`
		};

		if (serverError.status === 401) error.type = 'Invalid Inputs';
		return [error];
	} else return [];
};