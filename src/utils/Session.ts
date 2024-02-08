import { ENUMS } from "@/enums/enums";

export interface Company {
    id: string;
    name: string;
    address: string;
    logo: string;
    size: string;
    employee_count: number;
    stepper_step: number;
    stepper_state: boolean;
    is_verified: boolean;
    female_count: number;
    male_count: number;
    vat: number;
    shift_start: string;
    shift_end: string;
};

export interface User {
    id: string;
    email: string;
    name: string;
    phone_number: string;
    is_loggedIn: boolean;
    role: string;
    sign: string;
    avatar: string;
    department_info: { id: string, name: string };
    shift_start: string;
    shift_end: string;
};

export interface Session {
    token: string | null;
    user: User | null;
    company: Company | null;
};

export const getLocaleSession = (): Session | null => {
    const session = localStorage.getItem('session');
    const accessToken = localStorage.getItem('access_token');
    const sessionObject = session ? JSON.parse(session) : null;
    let sessionObj: Session = {
        token: accessToken || null,
        user: sessionObject?.user || null,
        company: sessionObject?.company || null,
    }
    return sessionObj ? sessionObj : null;
};

export const removeSession = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("access_token");
    localStorage.removeItem("company");
    localStorage.removeItem("view");
    window.location.replace('/');
};

export const getSessionCompany = () => {
    const companyData = localStorage.getItem('company')
    if (companyData === null) return null
    let company = JSON.parse(companyData ? companyData : '')
    return company ? company : null
};

export const updateSessionCompany = async () => {
    const strCompany = localStorage.getItem('company');
    const session = localStorage.getItem('session');
    const sessionObject = session ? JSON.parse(session) : null;
    const companyObject = strCompany ? JSON.parse(strCompany) : null;

    const newCompany = Object.assign(sessionObject.company, { ...sessionObject.company, ...companyObject });
    let sessionObj: Session = {
        token: sessionObject?.access,
        user: sessionObject?.user,
        company: newCompany,
    }
    localStorage.setItem('session', JSON.stringify(sessionObj));
    return sessionObj ? sessionObj : null;
};

export const isSuperUserRole = (role: string): boolean => {
    if (role) {
        if (role === ENUMS.ROLE.SUPERUSER || role === ENUMS.ROLE.SUB_SUPERUSER) {
            return true
        } else return false;
    } else return false;
};
