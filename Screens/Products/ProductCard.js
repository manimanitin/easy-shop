import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartAction';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

var { width } = Dimensions.get('window');

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode='contain'
        source={{
          uri: image
            ? image
            : 'https://img.uline.com/is/image/uline/S-4163?$Mobile_Zoom$',
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <Button
            title='Add'
            color={'green'}
            onPress={() => {
              props.addItemToCart(props);
              Toast.show({
                topOffset: 60,
                type: 'success',
                text1: `${name} added successfully`,
                text2: 'go to your cart and complete your order'
              });
            }}
          />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>No queda nada w</Text>
      )}
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 8,
    backgroundColor: 'white',
  },
  image: {
    width: width / 2 - 20,
    height: width / 2 - 50,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 110,
    backgroundColor: 'transparent',
    width: width / 2 - 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'orange',
    marginTop: 10,
  },
});
export default connect(null, mapDispatchToProps)(ProductCard);
