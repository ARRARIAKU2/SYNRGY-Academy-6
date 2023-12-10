import axios from 'axios';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { ICars } from '../Cars.types';
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
    const [cars, setCars] = useState<ICars[]>([]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setParams({
            ...params,
            search: value,
        });
    };

    const handleRemove = async (
        e: MouseEvent<HTMLButtonElement>,
        record: ICars
    ) => {
        e.stopPropagation();
        const confirmed = confirm('Are you sure want to delete?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8000/api/cars/${record.id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                });
                await fetchCars();
            } catch (error) {
                console.log('error > ', error);
            }
        }
    };

    const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: ICars) => {
        e.stopPropagation();
        navigate(`/update/${record.id}`);
    };

    const fetchCars = async () => {
        try {
            setLoading(true);
            const response = await axios.get<IApiResponse<ICars[]>>(
                'http://localhost:8000/api/cars',
                {
                    params,
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            setCars(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.log('error > ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, [params]);

    return {
        cars,
        params,
        setParams,
        loading,
        meta,
        handleEdit,
        handleRemove,
        handleSearch,
    };
}
