import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer

} from './styles';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

export function SingIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const theme = useTheme();
    const navigation = useNavigation();

    async function handleSignIn() {
        try {
            const schema = Yup.object().shape({
                email: Yup.string().
                    required('E-mail obrigátório').
                    email('Digite um e-mail válido'),
                password: Yup.string().required('Senha é obrigátória')
            })

            await schema.validate({ email, password });
            Alert.alert("Tudo certo!");

            //fazer login
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message)
            } else {
                Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer o login, verifique as credenciais')
            }
        }

    }

    function handleNewAccount() {
        navigation.navigate('SignupFirstStep' as never);
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                    <Header>
                        <Title>Estamos {'\n'}Quase lá</Title>
                        <SubTitle>Faça seu login para começar {'\n'}uma experiência incrível.</SubTitle>
                    </Header>

                    <Form>
                        <Input
                            iconName='mail'
                            placeholder='E-mail'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                        />
                        <PasswordInput
                            iconName='lock'
                            placeholder='Senha'
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>

                    <Footer>
                        <Button title="Login" onPress={handleSignIn} enabled={true} loading={false} />
                        <Button title="Criar conta gratuita" color={theme.colors.background_secondary} onPress={handleNewAccount} enabled={true} loading={false} light />

                    </Footer>

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}