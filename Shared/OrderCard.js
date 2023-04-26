import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Select } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrafficLight from './StyledComponents/TrafficLight';
import EasyButton from './StyledComponents/EasyButton';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';



const codes = [
    { name: "pending", code: "3" },
    { name: "shipped", code: "2" },
    { name: "delivered", code: "1" },
];


const OrderCard = (props) => {

    const [orderStatus, setOrderStatus] = useState();
    const [statusText, setStatusText] = useState();
    const [statusChange, setStatusChange] = useState();
    const [token, setToken] = useState();
    const [cardColor, setCardColor] = useState();


    useEffect(() => {
        if (props.editMode) {
            AsyncStorage.getItem('jwt').then((res) => {
                setToken(res);
            }).catch((err) => {
                console.log(err);
            });
        }

        if (props.status == '3') {
            setOrderStatus(<TrafficLight unavailable></TrafficLight>);
            setStatusText('Pending');
            setCardColor('#E74C3C');
        } else if (props.status == '2') {
            setOrderStatus(<TrafficLight limited></TrafficLight>);
            setStatusText('Shipped');
            setCardColor('#F1C40F');
        } else {
            setOrderStatus(<TrafficLight available></TrafficLight>);
            setStatusText('Delivered');
            setCardColor('#2ECC71');
        }
        return () => {
            setOrderStatus();
            setStatusText();
            setCardColor();
        };
    }, []);

    const updatedOrder = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const order = {
            city: props.city,
            country: props.country,
            dateOrdered: props.dateOrdered,
            id: props.id,
            orderItems: props.orderItems,
            phone: props.phone,
            shippingAddress1: props.shippingAddress1,
            shippingAddress2: props.shippingAddress2,
            status: statusChange,
            totalPrice: props.totalPrice,
            user: props.user,
            zip: props.zip

        };
        postOrder(config, order);
    };

    const postOrder = async (config, order) => {
        await axios.put(`${baseURL}orders/${props.id}`, order, config)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: 'success',
                        text1: 'Order edited successfully',
                        text2: ""
                    });
                }
                setTimeout(() => {
                    props.navigation.navigate('Products');
                }, 500);
            })
            .catch((err) => {
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: 'something went wrong',
                    text2: "Try again later"
                });
            });
    };

    return (
        <View style={[{ backgroundColor: cardColor }, styles.container]}>
            <View>
                <Text>
                    Order Number: #{props._id}
                </Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text>
                    Status: {statusText} {orderStatus}
                </Text>
                <Text>
                    Address: {props.shippingAddress1} {props.shippingAddress2}
                </Text>
                <Text>
                    City: {props.city}
                </Text>
                <Text>
                    Country: {props.country}
                </Text>
                <Text>
                    Date ordered: {props.dateOrdered.split('T')[0]}
                </Text>
                <View style={styles.priceContainer}>
                    <Text>Price: </Text>
                    <Text style={styles.price}>$ {props.totalPrice}</Text>
                </View>
                {props.editMode ? (
                    <View>
                        <Select
                            style={{ width: undefined }}
                            selectedValue={statusChange}
                            placeholder='Change status'
                            onValueChange={(e) => setStatusChange(e)}
                        >
                            {codes.map((c) => {
                                return (
                                    <Select.Item key={c.code} label={c.name} value={c.code} />
                                );
                            })}
                        </Select>
                        <EasyButton
                            secondary
                            large
                            onPress={() => updatedOrder()}
                        >
                            <Text style={{ color: 'white' }}>
                                Update
                            </Text>
                        </EasyButton>
                    </View>
                ) : null}


            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    title: {
        backgroundColor: "#62B1F6",
        padding: 5,
    },
    priceContainer: {
        marginTop: 10,
        alignSelf: "flex-end",
        flexDirection: "row",
    },
    price: {
        color: "white",
        fontWeight: "bold",
    },
});
export default OrderCard;