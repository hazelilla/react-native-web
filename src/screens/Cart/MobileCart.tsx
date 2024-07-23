import React from 'react';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import ProductItem from '../../component/ProductItem';

const MobileCart = () => {
    const recommendedItems = Array.from({ length: 7 }, (_, index) => ({ key: `product-${index}` }));
    const productItems = Array.from({ length: 4 }, (_, index) => ({ key: `product-${index}` }));

    const renderVerticalRecommendedItem = ({ item }) => (
        <ProductItem buttonRemoval={true} isVertical={true} discount={true}/>
    );

    const renderProductItem = ({ item }) => (
        <ProductItem />
    );

    const renderSeparator = () => (
        <View style={styles.separator} />
    );

    return (
        <Layout style={{ flex: 1, paddingBottom: 50 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text category='h2' style={{ marginTop: 30 }}>Cart</Text>
                <View>
                    <Text category='h5' style={{ marginBottom: 10 }}>Recommendations</Text>
                    <View style={[styles.addressBoxWrapper, styles.boxStyle]}>
                        <Icon name="navigation-2-outline" width={20} height={20} />
                        <Text numberOfLines={1} style={[styles.address, { maxWidth: '80%' }]}>
                            Suadiye, Bostancı Hatboyu Sk. No:3, 34740 Kadıköy/İstanbul, Turkey
                        </Text>
                    </View>
                    <View style={[styles.boxStyle, { padding: 10 }]}>
                        <FlatList
                            data={recommendedItems}
                            renderItem={renderVerticalRecommendedItem}
                            keyExtractor={item => item.key}
                            horizontal={true}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text category='h5' style={{ marginBottom: 20 }}>Your items</Text>
                    <View style={{ padding: 5 }}>
                        <FlatList
                            data={productItems}
                            renderItem={renderProductItem}
                            keyExtractor={item => item.key}
                            ItemSeparatorComponent={renderSeparator}
                            scrollEnabled={false}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.absoluteButtonWrapper}>
                <TouchableOpacity style={styles.checkoutButton} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                        <Text category='s1'>CHECKOUT</Text>
                        <Text category='h5'>419,5 €</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    boxStyle: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    separator: {
        height: 1,
        backgroundColor: "#E0E0E0",
        marginVertical: 10,
    },
    absoluteButtonWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    checkoutButton: {
        backgroundColor: "#FAF190",
        borderRadius: 10,
        paddingVertical: 15,
        width: '100%',
        justifyContent: 'space-between'
    },
    addressBoxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10, maxWidth: '80%', marginBottom: 10
    },
    address: {
        marginLeft: 10,
        color: "#B2B2B2",
    },
});

export default MobileCart;
