import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DataTitle,
    DateValue,
    Content,
    Footer,
} from './styles';

export function Scheduling() {
    const theme = useTheme();

    const navigation = useNavigation();

    function handleConfirmRental() {
        navigation.navigate("SchudelingDetails" as never);
    }

    return (
        <Container>
            <StatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />
            <Header>
                <BackButton onPress={() => { }} color={theme.colors.shape} />
                <Title>
                    Escolha uma {'\n'}
                    data de inicio e {'\n'}
                    fim do aluguel
                </Title>

                <RentalPeriod>
                    <DateInfo>
                        <DataTitle>De</DataTitle>
                        <DateValue selected={true}>18/06/2021</DateValue>
                    </DateInfo>
                    <ArrowSvg />

                    <DateInfo>
                        <DataTitle>Até</DataTitle>
                        <DateValue selected={false}></DateValue>
                    </DateInfo>

                </RentalPeriod>
            </Header>

            <Content>
                <Calendar markedDates={ } onDayPress={/>
            </Content>

            <Footer>
                <Button title="Confirmar" onPress={handleConfirmRental} />
            </Footer>

        </Container>
    )
}