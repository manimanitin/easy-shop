import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Select } from 'native-base';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Input';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Error from '../../Shared/Error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';


const ProductForm = (props) => {

    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState();
    const [isFeatured, setIsFeatured] = useState(false);
    const [richDescription, setRichDescription] = useState();
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);

    return (
        <FormContainer title='Add product'>
            <View>
                <Image source={{ uri: mainImage }} />
                <TouchableOpacity>
                    <Text>
                        Image
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ textDecorationLine: 'underline' }}>
                    Brand
                </Text>
            </View>
            <Input
                placeholder="Brand"
                name='brand'
                id='brand'
                value={brand}
                onChangeText={(text) => setBrand(text)}
            />
            <View>
                <Text style={{ textDecorationLine: 'underline' }}>
                    Name
                </Text>
            </View>
            <Input
                placeholder="Name"
                name='name'
                id='name'
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <View>
                <Text style={{ textDecorationLine: 'underline' }}>
                    Price
                </Text>
            </View>
            <Input
                placeholder="Price"
                name='price'
                id='price'
                value={price}
                keyboardType={'numeric'}
                onChangeText={(text) => setPrice(text)}
            />
            <View>
                <Text style={{ textDecorationLine: 'underline' }}>
                    Count in stock
                </Text>
            </View>
            <Input
                placeholder="Stock"
                name='stock'
                id='stock'
                value={countInStock}
                keyboardType={'numeric'}
                onChangeText={(text) => setCountInStock(text)}
            />
            <View>
                <Text style={{ textDecorationLine: 'underline' }}>
                    Description
                </Text>
            </View>
            <Input
                placeholder="Description"
                name='description'
                id='description'
                value={description}
                onChangeText={(text) => setDescription(text)}
            />
        </FormContainer>
    );
};

const styles = StyleSheet.create({
    label: {
        width: "80%",
        marginTop: 10
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white"
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "grey",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    }
});


export default ProductForm;