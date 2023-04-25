import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Select } from 'native-base';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Error from '../../Shared/Error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import { set } from 'react-native-reanimated';

const ProductForm = (props) => {




    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [rating, setRating] = useState(0);
    const [isFeatured, setIsFeatured] = useState(false);
    const [richDescription, setRichDescription] = useState('');
    const [numReviews, setNumReviews] = useState(0);
    const [item, setItem] = useState(null);
    const [webi, setWebi] = useState({ uri: '', type: '', name: '' });


    const getCategories = async () => {
        await axios.get(`${baseURL}categories`).then((res) => {
            setCategories(res.data);
        });
    };

    const putProducts = async (formData, config) => {
        await axios.post(`${baseURL}products/${item.id}`, formData, config).
            then((response) => {
                if (response.status == 200 || response.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: 'Product updated successfully',
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate('Products');
                    }, 500);
                }
            }).catch((e) => {
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: 'something went wrong',
                    text2: e.message,
                });
            });
    };

    const postProducts = async (formData, config) => {
        await axios.post(`${baseURL}products`, formData, config).
            then((response) => {
                if (response.status == 200 || response.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: 'New Product added successfully',
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.navigate('Products');
                    }, 500);
                }
            }).catch((e) => {
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: 'something went wrong',
                    text2: e.message,
                });
            });
    };

    const web = async () => {
        await fetch(image)
            .then((res) => res.blob())
            .then((myBlob) => {
                const myFile = new File([myBlob], 'image.jpeg', {
                    type: myBlob.type,
                });
                console.log(myFile);
                setWebi({
                    uri: URL.createObjectURL(myFile),
                    type: myFile.type,
                    name: myFile.name
                });
                // logs: Blob { size: 1024, type: "image/jpeg" }
            });
    };

    const addProduct = () => {
        if (
            name == "" ||
            brand == "" ||
            price == "" ||
            description == "" ||
            category == "" ||
            countInStock == 0
        ) {
            setError("Fill all options correctly");
        }
        let formData = new FormData();

        if (Platform.OS == "web") {
            console.log(webi);
            formData.append('images', webi);
        } else {
            const newImageUri = "file:///" + image.split("file:/").join("");
            console.log(newImageUri);
            console.log(mime.getType(newImageUri));
            console.log(newImageUri.split('/').pop());
            formData.append("image", {
                uri: newImageUri,
                type: mime.getType(newImageUri),
                name: newImageUri.split('/').pop()
            });
        }


        formData.append("name", name);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        formData.append("richDescription", richDescription);
        formData.append("rating", rating);
        formData.append("numReviews", numReviews);
        formData.append("isFeatured", isFeatured);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        };

        if (item !== null) {
            putProducts(formData, config);
        } else {
            postProducts(formData, config);
        }


    };

    useEffect(() => {
        if (!props.route.params) {
            setItem(null);
        } else {
            setItem(prop.route.params.item);
            setBrand(prop.route.params.item.brand);
            setName(prop.route.params.item.name);
            setPrice(prop.route.params.item.price.toString());
            setDescription(prop.route.params.item.description);
            setMainImage(prop.route.params.item.mainImage);
            setImage(prop.route.params.item.image);
            setCategory(prop.route.params.item.categories._id);
            setCountInStock(prop.route.params.item.countInStock.toString());


        }
        getCategories();

        AsyncStorage.getItem('jwt').then((res) => {
            setToken(res);
        }).catch((err) => { console.log(err); });
        (async () => {
            if (Platform.OS !== 'web') {
                const {
                    status,
                } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted ') {
                    alert('Need camera permissions');
                }
            }
        });
        return () => {
            setCategory([]);
        };
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            setMainImage(result.assets[0].uri);
            setImage(result.assets[0].uri);
            web();
        }
    };

    return (
        <FormContainer title='Add product'>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: mainImage }} />
                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                    <Icon style={{ color: 'white' }} name='camera' />
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
            <Select
                style={{ width: undefined }}
                placeholder='Select your category'
                selectedValue={pickerValue}
                placeholderTextColor={'#007aff'}
                onValueChange={(e) => setCategory(e)}
            >
                {categories.map((c) => {
                    return (
                        <Select.Item key={c._id} label={c.name} value={c._id} />
                    );
                })}
            </Select>
            {error ? <Error message={err} /> : null}
            <View>
                <EasyButton
                    style={styles.buttonContainer}
                    large
                    primary
                    onPress={() => { addProduct(); }}>
                    <Text style={styles.buttonText}>
                        Confirm
                    </Text>
                </EasyButton>
            </View>
        </FormContainer >
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