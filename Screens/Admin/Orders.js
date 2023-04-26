import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, FlatList, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OrderCard from '../../Shared/OrderCard';


var height = Dimensions.get('window');

const Orders = (props) => {

    const orderList = useRef();
    const token = useRef();
    const [loading, setLoading] = useState(true);


    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem('jwt').then((res) => {
                token.current = res;
                getOrders();
            }).catch((err) => { console.log(err); });

            return () => {
                setLoading(true);
            };
        }, [])
    );

    const getOrders = async () => {
        await axios.get(`${baseURL}orders`, { headers: { Authorization: `Bearer ${token.current}` } })
            .then((x) => {
                console.log(x);
                orderList.current = x.data;
                setLoading(false);
                console.log(orderList);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <View style={{ flex: 1 }}>
                {loading ? (
                    <View style={styles.spinner}>
                        <ActivityIndicator size={'large'} color={'red'} />
                    </View>
                ) : (

                    <FlatList
                        data={orderList.current}
                        renderItem={({ item }) => (
                            <OrderCard navigation={props.navigation}{...item} editMode={true} />
                        )}
                        keyExtractor={(item) => item._id}
                    />
                )}
            </View>
        </>);
};

const styles = StyleSheet.create({

    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Orders;