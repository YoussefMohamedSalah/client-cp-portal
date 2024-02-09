
export interface SessionCompany {
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

export interface SessionUser {
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
    user: SessionUser | null;
    company: SessionCompany | null;
};