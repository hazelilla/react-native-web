import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import ProductItem from '../../component/ProductItem';

const MobileCart = () => {
    const recommendedItems = Array.from({ length: 7 }, (_, index) => ({ key: `product-${index}` }));
    const productItems = Array.from({ length: 4 }, (_, index) => ({ key: `product-${index}` }));

    const renderVerticalRecommendedItem = ({ item }) => (
        <ProductItem buttonRemoval={true} isVertical={true} />
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
                    <Text category='h5' style={{ marginBottom: 20 }}>Recommendations</Text>
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
        backgroundColor: "#F7F7F7",
        borderRadius: 10,
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
    }
});

export default MobileCart;
