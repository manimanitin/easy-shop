import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import ProductList from './ProductList';
import SearchProduct from './SearchProduct';
import {
  VStack,
  Input,
  Button,
  IconButton,
  Icon,
  NativeBaseProvider,
  Center,
  Box,
  Divider,
  Heading,
  ScrollView,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import baseURL from '../../assets/common/baseURL';
import axios from 'axios';
var { width } = Dimensions.get('window');
var { height } = Dimensions.get('window');

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [focus, setFocus] = useState();
  const [category, setCategory] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [Loading, setLoading] = useState(true);

  const getProducts = async () => {
    await axios.get(`${baseURL}products`).then((res) => {
      setProducts(res.data);
      setFilterProducts(res.data);
      setProductsCtg(res.data);
      setInitialState(res.data);
      setLoading(false);
    });
  };

  const getCategories = async () => {
    await axios
      .get(`${baseURL}categories`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((error) => {
        console.log('api call error');
      });
  };

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      getProducts();
      getCategories();
      return () => {
        setProducts([]);
        setFilterProducts([]);
        setFocus();
        setCategory([]);
        setActive();
        setInitialState([]);
      };
    }, [])
  );

  const openList = () => {
    setFocus(true);
    // console.log('This is coming from' + focus);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const productSearch = (text) => {
    setFilterProducts(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
      {Loading == false ? (
        <View style={styles.container}>
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
                bg='#fff'
                width='100%'
                onFocus={openList}
                onChangeText={(text) => {
                  productSearch(text);
                  openList();
                }}
                borderRadius='4'
                py='3'
                px='1'
                fontSize='14'
                _web={{
                  _focus: {
                    borderColor: 'muted.300',
                    style: { boxShadow: 'none' },
                  },
                }}
                InputLeftElement={
                  <Icon
                    m='2'
                    ml='3'
                    size='6'
                    color='gray.400'
                    as={<MaterialIcons name='search' />}
                  />
                }
                InputRightElement={
                  focus == true ? (
                    <Icon
                      m='2'
                      mr='3'
                      size='6'
                      color='gray.400'
                      onPress={onBlur}
                      as={<MaterialIcons name='close' />}
                    />
                  ) : null
                }
              />
            </VStack>
          </VStack>
          {focus == true ? (
            <SearchProduct
              navigation={props.navigation}
              filterProducts={filterProducts}
            />
          ) : (
            <ScrollView>
              <View style={styles.container}>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={category}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item._id}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.Center, { height: height / 2 }]}>
                    <Text>no products found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      ) : (
        <View>
          <ActivityIndicator size={'large'} color={'red'} />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'nowrap',
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  Center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProductContainer;
