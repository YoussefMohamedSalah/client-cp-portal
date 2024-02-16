import { ENUMS, STATUS } from "enums/enums";
import { Session } from "types/Session";

export const getImageUrl = (url: string) => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  if (baseUrl && url) return baseUrl + url;
  else return 'https://via.placeholder.com/150'
};

export const allowDocumentsActionsBtns = (document: any) => {
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
  let makerId = document.user.id;

  for (let i = 0; i < document.work_flow.length; i++) {
    if (document.work_flow[i]?.userId === session.user?.id) {
      isUserInWorkflow = true;

      // Check if the current user is rejected or has a state of true
      if (document.work_flow[i]?.isRejected === true || document.work_flow[i]?.state === true) {
        isAllowed = false;
        break;
      }

      // Check the previous person's state in the workflow
      if (i > 0 && document.work_flow[i - 1]?.state === false) {
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
  if (document.status === STATUS.ARCHIVED ||
    document.status === STATUS.APPROVED ||
    document.status === STATUS.REJECTED ||
    makerId === session.user?.id!) {
    return false;
  };

  // Check the viewType
  if (!viewType) return false;
  if (viewType && viewType !== 'admin') {
    return false;
  }

  return isAllowed;
};

export const isAdminView = () => {
  let viewType = localStorage.getItem("view") || null
  let isAdmin: boolean = false;
  if (viewType && viewType === 'admin') isAdmin = true
  return isAdmin
};

export const checkPermission = (selectPermission: string) => {
  let session = JSON.parse(localStorage.getItem("session") || "");
  if (!session) return false;
  if (session.user.role === ENUMS.ROLE.SUPERUSER) return true;
  return true;
  // !CHECK THIS
  // let hasPermission: boolean = false;
  // session.user.user_permissions.forEach((permission: Permission) => {
  //   if (permission.codename === selectPermission) hasPermission = true;
  // });
  // return hasPermission;
};

export const checkRole = (roles: string[], departments: string[], session: Session) => {
  if (session?.user?.role === ENUMS.ROLE.SUPERUSER || session?.user?.role === ENUMS.ROLE.SUB_SUPERUSER) return true;
  if (!session || !roles || roles.length === 0 || !departments || departments.length === 0) return false;

  let hasRole: boolean = false;
  let isDepartmentMember: boolean = false;

  roles.forEach((role) => {
    if (session.user?.role! === role) hasRole = true;
  });

  departments.forEach((department) => {
    if (session.user?.department_info?.name! === department) isDepartmentMember = true;
  });

  if (!hasRole || !isDepartmentMember) return false;
  else return true;
};

export const getPriorityBadge = (status: string) => {
  switch (status) {
    case ENUMS.PRIORITY.LOW:
      return "badge rounded-pill bg-yalow text-wite";
    case ENUMS.PRIORITY.MEDIUM:
      return "badge rounded-pill bg-blue text-wite";
    case ENUMS.PRIORITY.HIGH:
      return "badge rounded-pill bg-danger text-white";
    default:
      return "badge rounded-pill bg-info text-white";
  }
};

export const getShortString = (str: string, length: number) => {
  if (!str) return "";
  if (str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};

