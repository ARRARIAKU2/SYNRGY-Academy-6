import { IFileItem } from '../../../Services/types';
export interface IBooks {
    id?: string;
    title?: string;
    author?: string;
    published_year?: string;
    total_copies?: number;
    copies_available?: number;
    genre?: string;
    isbn?: string;
    updated_by?: string;
    updated_at?: string;
    created_by?: string;
    created_at?: string;
    cover?: IFileItem;
    published?: boolean;
}

