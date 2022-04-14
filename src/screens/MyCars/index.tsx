import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'


import api from '../../services/api'
import { CarDTO } from '../../dtos/CarDTO';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';


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

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
}


export function MyCars() {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('schedules_byuser?user_id=2');
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

            {loading ? <Load /> : (
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
                                        <CarFooterDate>{item.startDate}</CarFooterDate>
                                        <AntDesign
                                            name="arrowright"
                                            size={20}
                                            color={theme.colors.title}
                                            style={{ marginHorizontal: 10 }}
                                        />
                                        <CarFooterDate>{item.endDate}</CarFooterDate>
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