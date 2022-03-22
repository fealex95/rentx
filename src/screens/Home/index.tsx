import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

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

    const carData = {
        brand: 'Audi',
        name: 'RS 6 Coupé',
        rent: {
            period: 'Ao dia',
            price: 120
        },
        thumbnail: 'https://img3.gratispng.com/dy/1d4da894bba7bada801706c76d73dba2/L0KzQYm3U8MyN6J7j5H0aYP2gLBuTfF2bJoyiuU2Nj3khbXwTgJ0Pl5mjdZyLXG5PbTokr1ifZVuRadqYna2c7XqhMJkbZM2RqkBNES1RYG9UcUzOmU9SqUENki5Q4a1kP5o/kisspng-audi-rs-6-audi-rs6-audi-a6-car-audi-5abf3cdcd2ceb1.7644250615224823968635.png'
    };

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
                renderItem={({ item }) => <Car data={carData} />} />

        </Container>
    )
}