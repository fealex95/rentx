import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../hooks/auth';
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section
} from './styles';

export function Profile() {
    const { user, signOut, updateUser } = useAuth();
    const [option, SetOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
    const [avatar, setAvatar] = useState(user.avatar);
    const [name, setName] = useState(user.name);
    const [driver_license, setDriver_license] = useState(user.driver_license);
    const netInfo = useNetInfo();

    const theme = useTheme();
    const navigation = useNavigation();



    function handleBack() {
        navigation.goBack();
    }

    async function handleSignOut() {
        Alert.alert(
            'Tem certeza?',
            'Lembre-se, se você sair vai precisar de internet para se conectar novamente',
            [
                {
                    text: 'Cancelar',
                    onPress: () => { },
                    style: 'cancel'
                },
                {
                    text: 'Sair mesmo assim',
                    onPress: () => signOut(),

                }
            ]
        );

    }

    async function handleSelectAvatar() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result.cancelled) {
            return;
        }

        if (result.uri) {
            setAvatar(result.uri);
        }
    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        if (netInfo.isConnected === false && optionSelected === 'passwordEdit') {
            Alert.alert('Para alterar senha você deve estar conectado!')
        }
        SetOption(optionSelected);
    }

    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape({
                driver_license: Yup.string().required('CNH é obrigátório'),
                name: Yup.string().required('Nome é obrigátório')
            });

            const data = { name, driver_license };

            await schema.validate(data);



            await updateUser({
                id: user.id,
                user_id: user.user_id,
                name: name,
                avatar: avatar,
                driver_license: driver_license,
                email: user.email,
                token: user.token
            });

            Alert.alert('Perfil atualizado!');

        } catch (e) {
            if (e instanceof Yup.ValidationError) {
                Alert.alert(e.message);
            } else {
                Alert.alert('Não foi possivel atualizar os dados');
            }

        }
    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container style={{ marginBottom: useBottomTabBarHeight() }}>
                    <Header>
                        <HeaderTop>
                            <BackButton
                                color={theme.colors.shape} onPress={handleBack}
                            />
                            <HeaderTitle>Editar perfil</HeaderTitle>
                            <LogoutButton onPress={handleSignOut}>
                                <Feather
                                    name='power'
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </LogoutButton>
                        </HeaderTop>
                        <PhotoContainer>
                            {!!avatar && <Photo source={{ uri: avatar }} />}
                            <PhotoButton onPress={handleSelectAvatar}>
                                <Feather
                                    name='camera'
                                    size={24}
                                    color={theme.colors.shape}
                                />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>
                    <Content>
                        <Options>
                            <Option active={option === 'dataEdit'} onPress={() => handleOptionChange('dataEdit')}>
                                <OptionTitle active={option === 'dataEdit'}>
                                    Dados
                                </OptionTitle>
                            </Option>
                            <Option active={option === 'passwordEdit'}>
                                <OptionTitle active={option === 'passwordEdit'} onPress={() => handleOptionChange('passwordEdit')}>
                                    Trocar Senha
                                </OptionTitle>
                            </Option>
                        </Options>
                        {option === 'dataEdit' ?
                            <Section >
                                <Input
                                    iconName='user'
                                    placeholder='Nome'
                                    autoCorrect={false}
                                    defaultValue={user.name}
                                    onChangeText={setName}
                                />

                                <Input
                                    iconName='mail'
                                    editable={false}
                                    defaultValue={user.email}
                                />

                                <Input
                                    iconName='credit-card'
                                    placeholder='CNH'
                                    keyboardType='numeric'
                                    defaultValue={user.driver_license}
                                    onChangeText={setDriver_license}
                                />
                            </Section>
                            :
                            <Section >
                                <PasswordInput
                                    iconName='lock'
                                    placeholder='Senha atual'

                                />

                                <PasswordInput
                                    iconName='lock'
                                    placeholder='Nova senha'

                                />

                                <PasswordInput
                                    iconName='lock'
                                    placeholder='Repitir senha'

                                />
                            </Section>
                        }
                        <Button title='Salvar alterções' onPress={handleProfileUpdate} />
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}