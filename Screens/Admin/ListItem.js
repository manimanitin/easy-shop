import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
    Button,
    Modal
} from 'react-native';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

import Icon from 'react-native-vector-icons/FontAwesome';

var { width } = Dimensions.get('window');

const ListItem = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View >
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableHighlight
                            underlayColor={'#E8E8E8'}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                            style={{
                                alignSelf: 'flex-end',
                                position: 'absolute',
                                top: 5,
                                right: 10,
                            }}
                        >
                            <Icon name='close' size={20} />
                        </TouchableHighlight>
                        <EasyButton
                            medium
                            secondary
                            onPress={() => {
                                props.navigation.navigate('ProductForm', { item: props });
                                setModalVisible(false);
                            }} >
                            <Text style={styles.textStyle}>Edit</Text>
                        </EasyButton>
                        <EasyButton
                            medium
                            danger
                            onPress={() => [
                                props.delete(props._id),
                                setModalVisible(false)
                            ]}>
                            <Text style={styles.textStyle}>Delete</Text>
                        </EasyButton>
                    </View>
                </View>
            </Modal >
            <TouchableOpacity
                style={[styles.container, { backgroundColor: props.index % 2 == 0 ? 'white' : 'gainsboro' }]}
                onPress={() => { props.navigation.navigate('Product details', { item: props }); }}
                onLongPress={() => { setModalVisible(true); }}
            >
                <Image
                    source={{
                        uri: props.image ? props.image
                            : 'https://img.uline.com/is/image/uline/S-4163?$Mobile_Zoom$'
                    }}
                    resizeMode='contain'
                    style={styles.image} />
                <Text style={styles.item}>{props.brand}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.name}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.category ? props.category.name : ''}</Text>
                <Text style={styles.item}>$ {props.price}</Text>

            </TouchableOpacity>
        </View >
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width
    },
    image: {
        borderRadius: 50,
        width: width / 6,
        height: 20,
        margin: 2
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 6
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: "white",
        fontWeight: "bold"
    }
});


export default ListItem;