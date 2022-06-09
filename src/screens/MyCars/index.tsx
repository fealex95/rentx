import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns'

import api from '../../services/api';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Car as ModelCar } from '../../database/models/Car';

import { BackButton } from '../../components/BackButton';
import {
    Container,
    Header,
    SubTitle,
    Title,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';

interface DataProps {
    id: string;
    car: ModelCar;
    start_date: string;
    end_date: string;
}

export function MyCars() {
    const [cars, setCars] = useState<DataProps[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const navigation = useNavigation();
    const screenFocused = useIsFocused();

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('rentals');
                const dataFormatted = response.data.map((data: DataProps) => {
                    return {
                        car: data.car,
                        start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                        end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
                        id: data.id
                    }
                })
                setCars(dataFormatted);
            } catch (error) {
                throw new Error(`Erro ${error}`);
            } finally {
                setLoading(false)
            }
        }

        fetchCars();
    }, [screenFocused])

    return (
        <Container>
            <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />
            <Header>
                <BackButton onPress={handleBack} color={theme.colors.shape} />
                <Title>
                    Seus agendamentos, {'\n'}
                    estão aqui.
                </Title>
                <SubTitle>
                    Conforto, Segurança e praticidade
                </SubTitle>
            </Header>

            {loading ? <LoadAnimation /> : (
                <Content>
                    <Appointments>
                        <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Appointments>
                    <FlatList
                        data={cars}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CarWrapper>
                                <Car data={item.car} />
                                <CarFooter>
                                    <CarFooterTitle>Período</CarFooterTitle>
                                    <CarFooterPeriod>
                                        <CarFooterDate>{item.start_date}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.title}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.end_date}</CarFooterDate>
                                    </CarFooterPeriod>
                                </CarFooter>
                            </CarWrapper>

                        )}
                    />
                </Content>
            )}
        </Container>
    )
}