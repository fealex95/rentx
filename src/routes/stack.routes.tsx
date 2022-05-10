import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchudelingDetails } from '../screens/SchudelingDetails';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SingIn } from '../screens/SignIn';
import { SignupFirstStep } from '../screens/Signup/SignupFirstStep';
import { SignupSecondStep } from '../screens/Signup/SignupSecondStep';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">

            <Screen name='Splash' component={Splash} />
            <Screen name='SignIn' component={SingIn} />
            <Screen name='SignupFirstStep' component={SignupFirstStep} />
            <Screen name='SignupSecondStep' component={SignupSecondStep} />
            <Screen name='Home' component={Home} options={{ gestureEnabled: false }} />
            <Screen name='CarDetails' component={CarDetails} />
            <Screen name='Scheduling' component={Scheduling} />
            <Screen name='SchudelingDetails' component={SchudelingDetails} />
            <Screen name='Confirmation' component={Confirmation} />
            <Screen name='MyCars' component={MyCars} />
        </Navigator>
    )
}