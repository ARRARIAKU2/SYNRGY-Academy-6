import axios from 'axios';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { IBooks } from '../Books.types';
import { IApiResponse, IMeta, IParams } from '../../../../Services/types';
import { useNavigate } from 'react-router-dom';

export default function useList() {
    const navigate = useNavigate();
    const [params, setParams] = useState<IParams>({
        page: 1,
        size: 10,
    });
    const [meta, setMeta] = useState<IMeta>();
    const [loading, setLoading] = useState<boolean>(false);
    const [books, setBooks] = useState<IBooks[]>([]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setParams({
            ...params,
            search: value,
        });
    };

    const handleRemove = async (
        e: MouseEvent<HTMLButtonElement>,
        record: IBooks
    ) => {
        e.stopPropagation();
        const confirmed = confirm('Are you sure want to delete?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8000/api/books/${record.id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                await fetchBooks();
            } catch (error) {
                console.log('error > ', error);
            }
        }
    };

    const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: IBooks) => {
        e.stopPropagation();
        navigate(`/update/${record.id}`);
    };

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await axios.get<IApiResponse<IBooks[]>>(
                'http://localhost:8000/api/books',
                {
                    params,
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            setBooks(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.log('error > ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [params]);

    return {
        books,
        params,
        setParams,
        loading,
        meta,
        handleEdit,
        handleRemove,
        handleSearch,
    };
}
