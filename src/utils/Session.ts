import { ENUMS } from "enums/enums";
import { Session } from "types/Session";

export const getLocaleSession = (): Session | null => {
  const session = localStorage.getItem("session");
  const accessToken = localStorage.getItem("access_token");
  const sessionObject = session ? JSON.parse(session) : null;
  let sessionObj: Session = {
    token: accessToken || null,
    user: sessionObject?.user || null,
    company: sessionObject?.company || null,
  };
  return sessionObj ? sessionObj : null;
};

export const removeClientSession = () => {
  localStorage.removeItem("session");
  localStorage.removeItem("access_token");
  localStorage.removeItem("company");
  localStorage.removeItem("view");
  window.location.replace("/");
};

export const getSessionCompany = () => {
  const companyData = localStorage.getItem("company");
  if (companyData === null) return null;
  let company = JSON.parse(companyData ? companyData : "");
  return company ? company : null;
};

export const updateSessionCompany = async () => {
  const strCompany = localStorage.getItem("company");
  const session = localStorage.getItem("session");
  const sessionObject = session ? JSON.parse(session) : null;
  const companyObject = strCompany ? JSON.parse(strCompany) : null;

  const newCompany = Object.assign(sessionObject.company, { ...sessionObject.company, ...companyObject });
  let sessionObj: Session = {
    token: sessionObject?.access,
    user: sessionObject?.user,
    company: newCompany,
  };
  localStorage.setItem("session", JSON.stringify(sessionObj));
  return sessionObj ? sessionObj : null;
};

export const isSuperUserRole = (role: string): boolean => {
  if (role) {
    if (role === ENUMS.ROLE.SUPERUSER || role === ENUMS.ROLE.SUB_SUPERUSER) {
      return true;
    } else return false;
  } else return false;
};
