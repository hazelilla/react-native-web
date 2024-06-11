import React from 'react';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { Dimensions, FlatList, Platform, StyleSheet, View } from 'react-native';
import ProductItem from '../component/ProductItem';

const CartScreen = () => {
  const recommendedItems = Array.from({ length: 7 }, (_, index) => ({ key: `product-${index}` }));
  const productItems = Array.from({ length: 3 }, (_, index) => ({ key: `product-${index}` }));

  const renderRecommendedItem = ({ item }) => (
    <ProductItem buttonRemoval={true} />
  );
  const renderProductItem = ({ item }) => (
    <ProductItem />
  );
  
  return (
    <Layout style={styles.container}>
      <Text category='h1'>Cart</Text>
      {Platform.OS === 'web' &&
        <Layout style={{ flexDirection: 'row' }}>

          <View style={styles.firstBoxWrapper}>
            <Text category='h5' style={{ marginBottom: 20 }}>Recommendations</Text>
            <View style={[styles.boxStyle, { padding: 20 }]}>
              <FlatList
                data={recommendedItems}
                renderItem={renderRecommendedItem}
                keyExtractor={item => item.key}
                scrollEnabled={true}
                contentContainerStyle={{height: 450}}
              />
            </View>
          </View>

          <View style={styles.secondBoxWrapper}>
            <Text category='h3' style={{ marginBottom: 20 }}>Your items</Text>

            <View style={[styles.boxStyle, { padding: 20 }]}>
            <FlatList
                data={productItems}
                renderItem={renderProductItem}
                keyExtractor={item => item.key}
                scrollEnabled={true}
              />
            </View>
          </View>

          <View style={styles.thirdBoxWrapper}>
            <View>
              <Text category='h6' style={{ marginBottom: 10 }}>Location</Text>
              <View style={[styles.addressBoxWrapper, styles.boxStyle]}>
                <Icon name="navigation-2-outline" width={20} height={20} />
                <Text style={styles.address}>Suadiye, Bostancı Hatboyu Sk. No:3, 34740 Kadıköy/İstanbul, Turkey</Text>
              </View>
            </View>

            <View style={{}}>
              <Text category='h6' style={{ marginBottom: 10, }}>TOTAL</Text>
              <Text category='h5' style={[styles.price, styles.boxStyle]}>419,5 €</Text>
            </View>

            <Button style={{ borderRadius: 10, paddingVertical: 15 }}>CHECKOUT</Button>
          </View>
        </Layout>
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginLeft: 20
  },
  boxStyle: {
    backgroundColor: "#F7F7F7",
    borderRadius: 10
  },
  thirdBoxWrapper: {
    maxWidth: '25%',
    justifyContent: 'space-between',
    maxHeight: '65%'
  },
  secondBoxWrapper: {
    width: '40%',
    marginHorizontal: 30
  },
  firstBoxWrapper: {
    width: '25%',
  },
  addressBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20
  },
  address: {
    marginLeft: 10,
    color: "#B2B2B2"
  },
  price: {
    marginBottom: 20,
    padding: 15,
    color: "#666666"
  }
});

export default CartScreen;
