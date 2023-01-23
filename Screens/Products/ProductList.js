import { TouchableOpacity, View, Dimensions } from 'react-native';

var { width } = Dimensions.get('window');
import ProductCard from './ProductCard';
const ProductList = (props) => {
  const { item } = props;
  return (
    <TouchableOpacity style={{ width: '50%' }}>
      <View style={{ width: width / 2, backgroundColor: 'gainsboro' }}>
        <ProductCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
