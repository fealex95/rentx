import React from 'react';

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
    About,
    Footer
} from './styles';

export function CarDetails() {
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
                <About>
                    Este é automóvel desportivo. Surgiu do
                    lendário touro de lide indultado na praça Real
                    Maestranza de Sevilla. É um belíssimo carro
                    para quem gosta de acelerar.
                </About>

            </Content>

            <Footer>
                <Button title='Avançar' />
            </Footer>


        </Container>
    )
}