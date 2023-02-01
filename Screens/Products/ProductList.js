import { TouchableOpacity, View, Dimensions } from 'react-native';

var { width } = Dimensions.get('window');
import ProductCard from './ProductCard';
const ProductList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity
      style={{ width: '50%' }}
      onPress={() =>
        props.navigation.navigate('Product details', { item: item })
      }
    >
      <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
