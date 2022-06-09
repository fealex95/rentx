import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import {
    Container,
    IconContainer,
    InputText,

} from './styles';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const theme = useTheme();

    function handlePasswordVisibleChange() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function handleInputFocused() {
        setIsFocused(true)
    }

    function handleInputBlur() {
        setIsFocused(false)

        setIsFilled(!!value)
    }

    return (
        <Container >
            <IconContainer isFocused={isFocused}>
                <Feather name={iconName} size={24} color={isFocused || isFilled ? theme.colors.main : theme.colors.text_details} />
            </IconContainer>
            <InputText
                {...rest}
                secureTextEntry={isPasswordVisible}
                selectionColor={theme.colors.main_light}
                onFocus={handleInputFocused}
                onBlur={handleInputBlur}
                isFocused={isFocused}
                autoCorrect={false}
            />
            <BorderlessButton onPress={handlePasswordVisibleChange}>
                <IconContainer isFocused={isFocused}>
                    <Feather
                        name={isPasswordVisible ? "eye" : "eye-off"}
                        size={24}
                        color={theme.colors.text_details} />
                </IconContainer>
            </BorderlessButton>
        </Container>
    )
}