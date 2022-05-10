import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

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
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [driverLicense, setDriverLicense] = useState('');
    const navigation = useNavigation();

    async function handleNextStep() {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome é obrigátório'),
                email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
                driverLicense: Yup.string().required('CNH é obrigatória')
            });

            const data = {
                name,
                email,
                driverLicense
            }

            await schema.validate(data);

            navigation.navigate('SignupSecondStep' as never, { user: data } as never);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Opa', error.message);
            }
        }

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
                        <Input
                            iconName='user'
                            placeholder='Nome'
                            onChangeText={setName}
                            value={name}
                        />
                        <Input
                            iconName='mail'
                            placeholder='Email'
                            keyboardType='email-address'
                            onChangeText={setEmail}
                            value={email} />
                        <Input
                            iconName='credit-card'
                            placeholder='CNH'
                            keyboardType='numeric'
                            onChangeText={setDriverLicense}
                            value={driverLicense}
                        />
                    </Form>

                    <Button title='Próximo' onPress={handleNextStep} enabled />
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}