import React, { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

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
                        <Button title="Login" onPress={() => { }} enabled={true} loading={false} />
                        <Button title="Criar conta gratuita" color={theme.colors.background_secondary} onPress={() => { }} enabled={true} loading={false} light />

                    </Footer>

                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}