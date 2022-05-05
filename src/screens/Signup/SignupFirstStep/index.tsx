import React from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle
} from './styles';


export function SignupFirstStep() {
    const navigation = useNavigation();

    function handleNextStep() {
        navigation.navigate('SignupSecondStep');
    }

    function handleBack() {
        navigation.navigate('SignIn' as never);
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack} />
                        <Steps>
                            <Bullet active />
                            <Bullet />
                        </Steps>
                    </Header>
                    <Title>
                        Cria sua {'\n'}
                        conta
                    </Title>
                    <SubTitle>
                        Faça seu cadastro de {'\n'}
                        forma rápida e fácil.
                    </SubTitle>

                    <Form>
                        <FormTitle>1. Dados</FormTitle>
                        <Input iconName='user' placeholder='Nome' />
                        <Input iconName='mail' placeholder='Email' keyboardType='email-address' />
                        <Input iconName='credit-card' placeholder='CNH' keyboardType='numeric' />
                    </Form>

                    <Button title='Próximo' onPress={handleNextStep} enabled />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}