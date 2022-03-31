import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

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



export function SchudelingDetails() {

    const theme = useTheme();

    return (
        <Container>
            <Header>
                <BackButton onPress={() => { }} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={['https://img3.gratispng.com/dy/8e3102871c4936914a291ffa7367727d/L0KzQYm3UsA1N5htfZH0aYP2gLBuTfF2bJoyiAJ4coTlcbTyTfNwdpRqiOY2Y3H1PbXsgfxmeqRtgeI2YYXneX7oV71ifZVuRadqN0e6Q4m5VsY0OpI5RqI7NUazQ4O5UcUyP2g8T6kENES0SIe1kP5o/kisspng-audi-sportback-concept-car-dealership-audi-a7-audi-5a7773826632a4.0256032215177777944186.png']} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
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
                        <DateValue>28/03/2022</DateValue>
                    </DateInfo>

                    <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text_details} />

                    <DateInfo>
                        <DateTitle>ATÉ</DateTitle>
                        <DateValue>28/03/2022</DateValue>
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
                <Button title='Alugar agora' color={theme.colors.success} />
            </Footer>


        </Container>
    )
}