import React from 'react';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';


import {
    Container,
    Header,
    CarImages,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    About,
    Footer
} from './styles';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';




interface Params {
    car: CarDTO;
}

export function CarDetails() {

    const navigation = useNavigation();
    const theme = useTheme();
    const route = useRoute();
    const { car } = route.params as Params;
    const scrolly = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrolly.value = event.contentOffset.y;

    });
    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrolly.value,
                [0, 200],
                [200, 70],
                Extrapolate.CLAMP
            )
        }
    })

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrolly.value,
                [0, 150],
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

    function handleConfirmRental() {
        navigation.navigate("Scheduling", { car });
    }

    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <StatusBar backgroundColor="transparent" barStyle='dark-content' translucent />
            <Animated.View style={[
                headerStyleAnimation,
                style.header,
                { backgroundColor: theme.colors.background_secondary }]}>
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>

                <Animated.View style={[sliderCarsStyleAnimation]}>
                    <CarImages>
                        <ImageSlider imagesUrl={car.photos} />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160,
                    alignItems: 'center'
                }}

                showsVerticalScrollIndicator={false}

                onScroll={scrollHandler}

                scrollEventThrottle={16}
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>
                <Accessories>
                    {
                        car.accessories.map(
                            accessory => (
                                <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
                            )
                        )

                    }


                </Accessories>
                <About>
                    {car.about}

                </About>

            </Animated.ScrollView>

            <Footer>
                <Button title='Escolher período do aluguel' onPress={handleConfirmRental} />
            </Footer>


        </Container >
    )
}

const style = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden',
        zIndex: 1
    },

})