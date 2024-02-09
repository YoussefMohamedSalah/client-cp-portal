export interface PrintMainInfoSec {
    key: string;
    value: string | number;
};

export interface PrintMaterials {
    item: string;
    description: string;
    count: number;
    price: number;
    total: number;
    payed_amount?: number;
    payed_percentage?: number;
    prev_count?: number;
    current_count?: number;
};

export interface PrintInstallments {
    name: string;
    percentage: number;
    value: number;
    details: string;
    date: string;
};