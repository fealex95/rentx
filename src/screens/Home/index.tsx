import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';
import api from '../../services/api';
import { Car as ModelCar } from '../../database/models/Car';

import {
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,

} from './styles';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

export function Home() {
    const navigation = useNavigation();
    const [cars, setCars] = useState<ModelCar[]>([]);
    const [loading, setLoading] = useState(true);

    const netInfo = useNetInfo();

    useEffect(() => {
        let isMounted = true;

        async function getData() {
            try {
                const carCollection = database.get<ModelCar>('cars');
                const cars = await carCollection.query().fetch();

                if (isMounted) {
                    setCars(cars)
                }
            } catch (error) {
                console.log(error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        getData();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (netInfo.isConnected === true) {
            offlineSynchronize();
        }
    }, [netInfo.isConnected]);

    function handleCarDetails(car: ModelCar) {
        navigation.navigate("CarDetails" as never, { car } as never);
    }

    async function offlineSynchronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {
                const response = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
                const { changes, latestVersion } = response.data;
                console.log("### Sincronização ###");
                console.log(changes);
                return { changes, timestamp: latestVersion }
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users;

                await api.post('users/sync/', user).catch(console.log);
            }
        });
    }

    return (
        <Container>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <Header>
                <HeaderContent>
                    <Logo width={RFValue(108)} height={RFValue(12)} />
                    {!loading &&
                        <TotalCars>
                            {`Total de ${cars.length} carros`}
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>

            {
                loading ? <LoadAnimation /> :
                    <CarList
                        data={cars}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)} />}

                    />
            }

        </Container>
    )
}

const style = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})