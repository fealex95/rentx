import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import {
    Container,
    Header,
    CarImages,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
    Footer
} from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';


interface Params {
    car: CarDTO;
    dates: [string];
}

export function SchudelingDetails() {

    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate("SchudelingComplete" as never);
    }

    const theme = useTheme();

    const route = useRoute();
    const { car, dates } = route.params as Params;


    return (
        <Container>
            <Header>
                <BackButton onPress={() => { }} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={car.photos} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>
                <Accessories>
                    <Accessory name='380KM/h' icon={speedSvg} />
                    <Accessory name='3.2s' icon={accelerationSvg} />
                    <Accessory name='800 HP' icon={forceSvg} />
                    <Accessory name='Gasolina' icon={gasolineSvg} />
                    <Accessory name='Auto' icon={exchangeSvg} />
                    <Accessory name='2 pessoas' icon={peopleSvg} />
                </Accessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather name="calendar" size={RFValue(24)} color={theme.colors.background_secondary} />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>{format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy')}</DateValue>
                    </DateInfo>

                    <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text_details} />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>{format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')}</DateValue>
                    </DateInfo>

                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button title='Alugar agora' color={theme.colors.success} onPress={handleConfirmRental} />
            </Footer>


        </Container>
    )
}