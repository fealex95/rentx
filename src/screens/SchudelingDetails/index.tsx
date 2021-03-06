import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider'
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';
import api from '../../services/api';

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
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Alert } from 'react-native';




interface Params {
    car: CarDTO;
    dates: [string];
}

export function SchudelingDetails() {
    const [isLoading, setIsLoading] = useState(false);
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

    const navigation = useNavigation();

    const theme = useTheme();

    const route = useRoute();

    const netInfo = useNetInfo();

    const { car, dates } = route.params as Params;

    const rentTotal = Number(dates.length * car.price);

    async function handleConfirmRental() {
        setIsLoading(true);

        await api.post('rentals', {
            user_id: 1,
            car_id: car.id,
            start_date: new Date(dates[0]),
            end_date: new Date(dates[dates.length - 1]),
            total: rentTotal
        }).then(() => navigation.navigate("Confirmation" as never, {
            nextScreenRoute: 'Home',
            title: 'Carro alugado!',
            message: `Agora voc?? precisa ir \n at?? a concession??ria da RENTX\npegar o seu autom??vel.`
        } as never))
            .catch(() => Alert.alert('N??o foi poss??vel agendar, favor tente novamente!'));
    }

    function calcRent(dates: [string]): number {
        return dates.length * car.price;
    }

    useEffect(() => {
        async function fetchCarUpdated() {
            const response = await api.get(`cars/${car.id}`);
            setCarUpdated(response.data);
        }

        if (netInfo.isConnected === true) {
            fetchCarUpdated();
        }
    }, [netInfo.isConnected]);


    return (
        <Container>
            <Header>
                <BackButton onPress={() => { }} />
            </Header>

            <CarImages>
                <ImageSlider imagesUrl={!!carUpdated.photos ? carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]} />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>
                {
                    carUpdated.accessories &&
                    <Accessories>
                        {
                            carUpdated.accessories.map(
                                accessory => (
                                    <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
                                )
                            )

                        }


                    </Accessories>
                }

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
                        <DateTitle>AT??</DateTitle>
                        <DateValue>{format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')}</DateValue>
                    </DateInfo>

                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.price} x${dates.length} di??rias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {calcRent(dates)}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button title='Alugar agora' color={theme.colors.success} onPress={handleConfirmRental} loading={isLoading} />
            </Footer>


        </Container>
    )
}