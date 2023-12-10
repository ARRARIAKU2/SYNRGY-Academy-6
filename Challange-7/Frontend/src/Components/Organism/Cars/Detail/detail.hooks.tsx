import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function useDetail() {
    const [data, setData] = useState([]) as any;

    const { id } = useParams();

    useEffect(() => {
        getDataById(id);
    }, [])

    const getDataById = async (id: any) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/api/cars/${id}`,
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            ) as any
            setData(response.data.data);
        } catch (error) {
            console.log('error > ', error);
        }
    }

    return {
        data
    }
}

export default useDetail;