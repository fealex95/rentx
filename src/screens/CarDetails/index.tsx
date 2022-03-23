import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider/Index';
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
    About
} from './styles';

export function CarDetails() {
    return (
        <Container>
            <Header>
                <BackButton onPress={() => { }} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={['https://img3.gratispng.com/dy/1d4da894bba7bada801706c76d73dba2/L0KzQYm3U8MyN6J7j5H0aYP2gLBuTfF2bJoyiuU2Nj3khbXwTgJ0Pl5mjdZyLXG5PbTokr1ifZVuRadqYna2c7XqhMJkbZM2RqkBNES1RYG9UcUzOmU9SqUENki5Q4a1kP5o/kisspng-audi-rs-6-audi-rs6-audi-a6-car-audi-5abf3cdcd2ceb1.7644250615224823968635.png']} />
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
                <About>
                    Este é automóvel desportivo. Surgiu do
                    lendário touro de lide indultado na praça Real
                    Maestranza de Sevilla. É um belíssimo carro
                    para quem gosta de acelerar.
                </About>
            </Content>


        </Container>
    )
}