import React from 'react';
import { KeyboardAvoidingView, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
import { PasswordInput } from '../../../components/PasswordInput';
import theme from '../../../styles/theme';


export function SignupSecondStep() {
    const navigation = useNavigation();

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
                        <FormTitle>2. Senha</FormTitle>
                        <PasswordInput iconName='lock' placeholder='Senha' />
                        <PasswordInput iconName='lock' placeholder='Repetir senha' />
                    </Form>

                    <Button title='Cadastrar' onPress={() => { }} color={theme.colors.success} />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}