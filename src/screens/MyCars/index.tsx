import React, { useState, useEffect } from 'react';

import api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO';

import { Container } from './styles';

export function MyCars() {
    const [cars, setCars] = useState<CarDTO>({} as CarDTO);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('schedules_byuser?user_id=1');
                setCars(response.data);
            } catch (error) {
                throw new Error(`Erro ${error}`);
            } finally {
                setLoading(false)
            }
        }

        fetchCars();
    }, [])

    return (
        <Container>

        </Container>
    )
}