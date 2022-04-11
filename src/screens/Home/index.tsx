import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
    MyCarsButton
} from './styles';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';


export function Home() {
    const navigation = useNavigation();
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    useEffect(() => {
        async function getData() {
            try {
                const response = await api.get('cars');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    function handleCarDetails(car: CarDTO) {
        navigation.navigate("CarDetails", { car });
    }

    function handleMyCars(car: CarDTO) {
        navigation.navigate("MyCars" as never);
    }

    return (
        <Container>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)} />
                    <TotalCars>
                        {`Total de ${cars.length} carros`}
                    </TotalCars>
                </HeaderContent>
            </Header>
            {
                loading ? <Load /> :
                    <CarList
                        data={cars}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}

                    />
            }

            <MyCarsButton onPress={handleMyCars}>
                <Ionicons name='ios-car-sport' size={32} color={theme.colors.shape} />
            </MyCarsButton>
        </Container>
    )
}