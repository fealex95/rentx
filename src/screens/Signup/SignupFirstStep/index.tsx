import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import {
    Container,
    Header
} from './styles';

export function SignupFirstStep() {
    const navigation = useNavigation();

    function handleBack() {
        navigation.navigate('SignIn' as never);
    }
    return (
        <Container>
            <Header>
                <BackButton onPress={handleBack} />
            </Header>
        </Container>
    )
}