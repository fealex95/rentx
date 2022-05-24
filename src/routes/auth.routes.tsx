import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Confirmation } from '../screens/Confirmation';
import { Splash } from '../screens/Splash';
import { SingIn } from '../screens/SignIn';
import { SignupFirstStep } from '../screens/Signup/SignupFirstStep';
import { SignupSecondStep } from '../screens/Signup/SignupSecondStep';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Screen name='Splash' component={Splash} />
            <Screen name='SignIn' component={SingIn} />
            <Screen name='SignupFirstStep' component={SignupFirstStep} />
            <Screen name='SignupSecondStep' component={SignupSecondStep} />
            <Screen name='Confirmation' component={Confirmation} />
        </Navigator>
    )
}