import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, TextInput, StyleSheet } from 'react-native';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import { ScrollView } from 'native-base';

var { width, height } = Dimensions.get('window');

const Categories = (props) => {


    const Item = (props) => {
        return (
            <View style={styles.item}>
                <Text>
                    {props.item.name}
                </Text>
                <EasyButton
                    danger
                    medium
                    onPress={() => props.delete(props.item._id)}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Delete
                    </Text>
                </EasyButton>
            </View>
        );

    };


    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState();
    const [token, setToken] = useState();

    const getCategory = async () => {
        await axios.get(`${baseURL}categories`)
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => alert('error to load categories'));
    };
    const postCategory = async (category, config) => {
        await axios.post(`${baseURL}categories`, category, config)
            .then((res) => {
                setCategories([...categories, res.data]);

            })
            .catch(err => alert('error loading categories'));;
    };

    const delCategory = async (id, config) => {
        await axios.delete(`${baseURL}categories/${id}`, config).
            then((res) => {
                const newCategories = categories.filter((item) => item._id !== id);
                setCategories(newCategories);
            }).catch(err => alert('error loading categories'));
    };

    useEffect(() => {
        AsyncStorage.getItem('jwt').then((res) => {
            setToken(res);
        }).catch((error) => console.log(error));
        getCategory();
        return () => {
            setCategories();
            setToken();
        };
    }, []);

    const deleteCategory = async (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        delCategory(id, config);
    };

    const addCategory = async () => {
        const category = {
            name: categoryName
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        postCategory(category, config);
        setCategoryName('');
    };

    return (
        <View style={{ position: 'relative', height: '100%' }}>
            <View style={{ marginBottom: 60 }} >
                <ScrollView nestedScrollEnabled={true}>
                    <FlatList
                        nestedScrollEnabled={true}
                        data={categories}
                        renderItem={({ item, index }) => (
                            <Item item={item} index={index} delete={deleteCategory} />)}
                        keyExtractor={(item) => item.id}
                    />

                </ScrollView>

            </View>
            <View style={styles.bottomBar}>
                <View>
                    <Text>Add category</Text>
                </View>
                <View style={{ width: width / 2.5 }}>
                    <TextInput
                        style={styles.input}
                        value={categoryName}
                        onChangeText={(text) => setCategoryName(text)} />
                </View>
                <View>
                    <EasyButton
                        medium
                        primary
                        onPress={() => addCategory()}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            Submit
                        </Text>
                    </EasyButton>
                </View>
            </View>

        </View>
    );
};



const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: 'white',
        width: width,
        height: 60,
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1
    },
    item: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5
    }
});

export default Categories;