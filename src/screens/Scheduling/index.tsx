import React from 'react';
import { useTheme } from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg';

import { BackButton } from '../../components/BackButton';

import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DataTitle,
    DateValue,
} from './styles';

export function Scheduling() {
    const theme = useTheme();

    return (
        <Container>
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
                        <DateValue />
                    </DateInfo>
                    <ArrowSvg />

                    <DateInfo>
                        <DataTitle>Até</DataTitle>
                        <DateValue />
                    </DateInfo>

                </RentalPeriod>
            </Header>


        </Container>
    )
}