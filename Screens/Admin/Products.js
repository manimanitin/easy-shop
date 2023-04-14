import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
//import { Icon } from 'react-native-vector-icons/icon';
import { useFocusEffect } from '@react-navigation/native';

import axios from 'axios';
import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
var { height, width } = Dimensions.get('window');

const Products = (props) => {
    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();1

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem('jwt').then((res) => {
                setToken(res);
            }).catch((err) => { console.log(err); });

            axios.get(`${baseURL}products}`).then((res) => {
                setProductList(res.data);
                setProductFilter(res.data);
                setLoading(false);
            }).catch((err) => { console.log(err); });
            return () => {
                setProductList();
                setProductFilter();
                setLoading(true);
            };
        }, [])
    );

    return (
<View>
    <View>
        
    </View>
</View>
        );
};

export default Products;