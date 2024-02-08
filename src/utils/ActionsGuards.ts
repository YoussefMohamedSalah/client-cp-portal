import { ENUMS } from "@/enums/enums";


export const checkPermission = (selectPermission: string) => {
	let session = JSON.parse(localStorage.getItem("session") || "");
	if (!session) return false;
	if (session.userInfo.role === ENUMS.ROLE.SUPERUSER) return true;
	return true;
	// !CHECK THIS
	// let hasPermission: boolean = false;
	// session.userInfo.user_permissions.forEach((permission: Permission) => {
	//   if (permission.codename === selectPermission) hasPermission = true;
	// });
	// return hasPermission;
};


export const allowDeleteActionBtn = (userId: string, request: any) => {
	let session = JSON.parse(localStorage.getItem("session") || "{}");
	if (!session) return false;
	let viewType = localStorage.getItem("view") || null;
	if (!viewType) return false;
	// Check the viewType
	if (viewType && viewType !== 'user') {
		return false;
	}

	let isAllowed: boolean = true;

	if (!session.userInfo || session.userInfo.id !== userId) return false;
	if (request.status === ENUMS.STATUS.APPROVED) return false;

	if (request.work_flow && request.work_flow.length > 0) {
		for (let i = 0; i < request.work_flow.length; i++) {
			if (request.work_flow[i].userId === session.userInfo.id) {
				isAllowed = true;
				break;
			}
		}

		for (let i = 0; i < request.work_flow.length; i++) {
			if (request.work_flow[i]?.isRejected === true) {
				return true;
			}
			if (request.work_flow[i]?.state === true) {
				isAllowed = false;
				break;
			}
		}
	}

	return isAllowed;
};

export const allowEditActionBtn = (userId: string, request: any) => {
	let session = JSON.parse(localStorage.getItem("session") || "{}");
	if (!session) return false;
	let viewType = localStorage.getItem("view") || null;
	if (!viewType) return false;
	// Check the viewType
	if (viewType && viewType !== 'user') {
		return false;
	}

	let isAllowed: boolean = true;

	if (!session.userInfo || session.userInfo.id !== userId) return false;
	if (request.status === ENUMS.STATUS.APPROVED) return false;

	if (request.work_flow && request.work_flow.length > 0) {
		for (let i = 0; i < request.work_flow.length; i++) {
			if (request.work_flow[i]?.isRejected === true) {
				return true;
			}
			if (request.work_flow[i]?.state === true) {
				return false;
			}
		}
	}

	return isAllowed;
};

export const allowRejectOrApproveActionBtn = (request: any) => {
	let session = JSON.parse(localStorage.getItem("session") || "{}");
	if (!session) return false;
	let viewType = localStorage.getItem("view") || null;
	if (!viewType) return false;
	// Check the viewType
	if (viewType && viewType !== 'admin') {
		return false;
	}

	let isAllowed: boolean = true;

	let isUserInWorkflow = false;
	let makerId = request.user.id;

	for (let i = 0; i < request.work_flow.length; i++) {
		if (request.work_flow[i]?.userId === session.userInfo?.id) {
			isUserInWorkflow = true;

			// Check if the current user is rejected or has a state of true
			if (request.work_flow[i]?.isRejected === true || request.work_flow[i]?.state === true) {
				isAllowed = false;
				break;
			}

			// Check the previous person's state in the workflow
			if (i > 0 && request.work_flow[i - 1]?.state === false) {
				isAllowed = false;
				break;
			}
		}
	}

	// If the user is not in the workflow, return false
	if (!isUserInWorkflow) {
		return false;
	}

	// Check other conditions
	if (request.status === ENUMS.STATUS.ARCHIVED ||
		request.status === ENUMS.STATUS.APPROVED ||
		request.status === ENUMS.STATUS.REJECTED ||
		makerId === session.userInfo?.id!) {

		return false;
	}

	// Check the viewType
	if (!viewType) return false;
	if (viewType && viewType !== 'admin') {
		return false;
	}

	return isAllowed;
};

export const allowForwardMaterial = (request: any) => {
	let session = JSON.parse(localStorage.getItem("session") || "{}");
	if (!session) return false;
	let isAllowed: boolean = true;

	if (request.status === ENUMS.STATUS.APPROVED) return true;
	if (!request.work_flow! || request.work_flow?.length === 0) return true;

	if (request.status === ENUMS.STATUS.ARCHIVED) return false;
	if (request.status === ENUMS.STATUS.REJECTED) return false;
	if (request.status === ENUMS.STATUS.PENDING) return false;

	if (request.work_flow! && request.work_flow?.length > 0) {
		for (let i = 0; i < request.work_flow.length; i++) {
			if (request.work_flow[i]?.userId === session.userInfo?.id) {
				if (request.work_flow[i]?.isRejected === true || request.work_flow[i]?.state === true) {
					isAllowed = false;
					break;
				}
			}
		}
	}
	return isAllowed;
};
