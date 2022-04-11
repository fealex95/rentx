import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchudelingDetails } from '../screens/SchudelingDetails';
import { SchudelingComplete } from '../screens/SchudelingComplete';
import { MyCars } from '../screens/MyCars';

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='Home' component={Home} />
            <Screen name='CarDetails' component={CarDetails} />
            <Screen name='Scheduling' component={Scheduling} />
            <Screen name='SchudelingDetails' component={SchudelingDetails} />
            <Screen name='SchudelingComplete' component={SchudelingComplete} />
            <Screen name='MyCars' component={MyCars} />
        </Navigator>
    )
}