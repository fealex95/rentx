import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../../services/api';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
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

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}


export function SignupSecondStep() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    const { user } = route.params as Params;

    function handleBack() {
        navigation.navigate('SignIn' as never);
    }

    async function handleRegister() {
        if (!password || !passwordConfirm) {
            return Alert.alert('Informe a senha e a confirmação.');
        }

        if (password !== passwordConfirm) {
            return Alert.alert('As senhas não são iguais')
        }

        await api.post("users", {
            name: user.name,
            email: user.email,
            password,
            driver_license: user.driverLicense,
        }).then(() => {
            navigation.navigate('Confirmation' as never, {
                nextScreenRoute: 'SignIn',
                title: 'Conta Criada',
                message: `Agora é só fazer login\ne aproveitar`
            } as never);
        })
            .catch(() => {
                Alert.alert('Opa', 'Não foi possivel cadastrar');
            });
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <BackButton onPress={handleBack} />
                        <Steps>
                            <Bullet />
                            <Bullet active />
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
                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password} />
                        <PasswordInput
                            iconName='lock'
                            placeholder='Repetir senha'
                            onChangeText={setPasswordConfirm}
                            value={passwordConfirm} />
                    </Form>

                    <Button title='Cadastrar' onPress={handleRegister} color={theme.colors.success} />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}