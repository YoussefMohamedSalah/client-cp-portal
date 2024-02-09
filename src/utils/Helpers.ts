import { STATUS } from "enums/enums";

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
    if (document.work_flow[i]?.userId === session.userInfo?.id) {
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