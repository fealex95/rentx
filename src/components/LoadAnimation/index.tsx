import React from 'react';
import LottieView from 'lottie-react-native';

import { Container } from './styles';
import LoadCar from '../../assets/loadCar.json';

export function LoadAnimation() {
    return (
        <Container>
            <LottieView source={LoadCar} style={{ height: 180 }} resizeMode="contain" autoPlay loop />
        </Container>
    )
}