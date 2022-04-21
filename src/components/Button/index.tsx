import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import theme from '../../styles/theme';

import { Container, Title } from './styles';

import { useTheme } from 'styled-components';


interface Props extends RectButtonProps {
    title: string;
    color?: string;
    enabled?: boolean;
    loading?: boolean;
}

export function Button({
    title,
    color,
    enabled = true,
    loading = false,
    ...rest
}: Props) {

    const theme = useTheme();

    return (
        <Container {...rest} color={color} enabled={enabled} style={{ opacity: (enabled === false || loading === true) ? 0.5 : 1 }}>
            {loading ? <ActivityIndicator color={theme.colors.shape} /> :
                <Title>{title}</Title>}
        </Container>
    )
}