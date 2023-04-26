import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Spacer, Box, HStack, VStack, Divider, Input, ScrollView, Modal } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import ListItem from './ListItem';

import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
var { height, width } = Dimensions.get('window');


const ListHeader = () => {
    return (
        <View style={styles.listHeader}>
            <View style={styles.headerItem}></View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Brand</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Name</Text>
            </View >
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Category</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600' }}>Price</Text>
            </View>
        </View>
    );
};

const Products = (props) => {
    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    const getProducts = async () => {
        await axios.get(`${baseURL}products`).then((res) => {
            setProductList(res.data);
            setProductFilter(res.data);
            setLoading(false);
        });
    };

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem('jwt').then((res) => {
                setToken(res);
            }).catch((err) => { console.log(err); });
            getProducts();
            return () => {
                setProductList();
                setProductFilter();
                setLoading(true);
            };
        }, [])
    );

    const searchProduct = (text) => {
        if (text == "") {
            setProductFilter(productList);
        }
        setProductFilter(
            productList.filter((i) =>
                i.name.toLowerCase().includes(text.toLowerCase())
            )
        );
    };


    const deleteProduct = (id) => {

        axios.delete(`${baseURL}products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            const products = productFilter.filter((item) => item.id !== id);
            setProductFilter(products);
        }).catch((err) => console.error(err));
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <EasyButton
                        secondary
                        medium
                        onPress={() => props.navigation.navigate('Orders')}>
                        <Icon name={'shopping-bag'} size={18} color={'white'} />
                        <Text style={styles.buttonText}>Orders</Text>
                    </EasyButton>
                    <EasyButton
                        secondary
                        medium
                        onPress={() => props.navigation.navigate('ProductForm')}>
                        <Icon name={'plus'} size={18} color={'white'} />
                        <Text style={styles.buttonText}>Products</Text>
                    </EasyButton>
                    <EasyButton
                        secondary
                        medium
                        onPress={() => props.navigation.navigate('Categories')}>
                        <Icon name={'plus'} size={18} color={'white'} />
                        <Text style={styles.buttonText}>Categories</Text>
                    </EasyButton>
                </View>
            </View>
            <View style={styles.container}>
                <View>
                    <VStack
                        space={5}
                        width='100%'
                        divider={
                            <Box px='2'>
                                <Divider />
                            </Box>
                        }
                    >
                        <VStack width='100%' space={5} alignItems='center'>
                            <Input
                                placeholder='Search People & Places'
                                onChangeText={(text) =>
                                    searchProduct(text)
                                }
                                InputLeftElement={
                                    <Icon
                                        m='2'
                                        ml='3'
                                        size='6'
                                        color='gray.400'
                                        as={<MaterialIcons name='search' />}
                                    />
                                }

                            />
                        </VStack>
                    </VStack>
                </View>
                {loading ? (
                    <View style={styles.spinner}>
                        <ActivityIndicator size={'large'} color={'red'} />
                    </View>
                ) : (
                    <FlatList
                        ListHeaderComponent={ListHeader}
                        data={productFilter}
                        renderItem={({ item, index }) => (
                            <ListItem {...item}
                                navigation={props.navigation}
                                index={index}
                                delete={deleteProduct}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        </>);
};

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6
        ,
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
});

export default Products;