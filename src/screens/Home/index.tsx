import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native'

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList
} from './styles';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';


export function Home() {
    const navigation = useNavigation();

    const carData = {
        brand: 'Audi',
        name: 'RS 6 Coupé',
        rent: {
            period: 'Ao dia',
            price: 120
        },
        thumbnail: 'https://img3.gratispng.com/dy/8e3102871c4936914a291ffa7367727d/L0KzQYm3UsA1N5htfZH0aYP2gLBuTfF2bJoyiAJ4coTlcbTyTfNwdpRqiOY2Y3H1PbXsgfxmeqRtgeI2YYXneX7oV71ifZVuRadqN0e6Q4m5VsY0OpI5RqI7NUazQ4O5UcUyP2g8T6kENES0SIe1kP5o/kisspng-audi-sportback-concept-car-dealership-audi-a7-audi-5a7773826632a4.0256032215177777944186.pngr'
    };

    function handleCarDetails() {
        navigation.navigate("CarDetails" as never);
    }

    return (
        <Container>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)} />
                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            <CarList
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <Car data={carData} onPress={handleCarDetails} />}

            />

        </Container>
    )
}