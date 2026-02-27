export interface Product {
    id: number;
    name: string;
    price: string; // Keep as string if coming from a database Decimal field
    description: string;
    created_at: string;
    updated_at: string;
}