import React from 'react';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { FlatList, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import ProductItem from '../../component/ProductItem';
import { useMediaQuery } from 'react-responsive';

const WebCart = () => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1397 });
    const isSmallerTablet = useMediaQuery({ minWidth: 1045, maxWidth: 1180 });
    const isMobile = useMediaQuery({ maxWidth: 1045 });

    const recommendedItems = Array.from({ length: 7 }, (_, index) => ({ key: `product-${index}` }));
    const productItems = Array.from({ length: 4 }, (_, index) => ({ key: `product-${index}` }));

    const renderRecommendedItem = ({ item }) => (
        <ProductItem
            buttonRemoval={true}
            customWidth={isMobile ? '10%' : isSmallerTablet ? '40%' : isTablet ? '50%' : '70%'}
            customFontSize={isMobile ? '10%' : isSmallerTablet ? 'h6' : isTablet ? 'h5' : 'h5'}
        />
    );

    const renderProductItem = ({ item }) => (
        <ProductItem
            customWidth={isSmallerTablet ? '40%' : isTablet ? '50%' : '70%'}
            customFontSize={isMobile ? 'h6' : isSmallerTablet ? 'h6' : isTablet ? 'h5' : 'h5'}
        />
    );

    const renderSeparator = () => (
        <View style={styles.separator} />
    );

    const renderVerticalRecommendedItem = ({ item }) => (
        <ProductItem buttonRemoval={true} isVertical={true} />
    );

    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <Layout style={{ margin: 20 }}>
                    <Text category='h1' style={{ fontSize: isMobile ? 24 : isTablet ? 28 : 32 }}>Cart</Text>
                    {isMobile &&
                        <>
                            <Text category='h5' style={{ marginVertical: 20, fontSize: 20 }}>Recommendations</Text>
                            <View style={[styles.boxStyle, { padding: 10 }]}>
                                <FlatList
                                    data={recommendedItems}
                                    renderItem={renderVerticalRecommendedItem}
                                    keyExtractor={item => item.key}
                                    horizontal={true}
                                />
                            </View>
                        </>
                    }
                    <Layout style={{ flexDirection: 'row' }}>
                        {!isMobile &&
                            <View style={[styles.firstBoxWrapper, { width: '25%' }]}>
                                <Text category='h5' style={{ marginBottom: 20, fontSize: 20 }}>Recommendations</Text>

                                <View style={[styles.boxStyle, { padding: 20 }]}>
                                    <FlatList
                                        data={recommendedItems}
                                        renderItem={renderRecommendedItem}
                                        keyExtractor={item => item.key}
                                        scrollEnabled={true}
                                        contentContainerStyle={{ height: 450 }}
                                    />
                                </View>
                            </View>
                        }

                        <View style={{
                            width: isMobile ? '100%' : isSmallerTablet ? '45%' : '40%',
                            marginHorizontal: isMobile ? 0 : 30,
                            marginTop: isMobile ? 20 : 0
                        }}>
                            <Text category='h5' style={{ marginBottom: 20, fontSize: 20 }}>Your items</Text>
                            <View style={{ padding: 20 }}>
                                <FlatList
                                    data={productItems}
                                    renderItem={renderProductItem}
                                    keyExtractor={item => item.key}
                                    ItemSeparatorComponent={renderSeparator}
                                    scrollEnabled={true}
                                />
                            </View>
                        </View>

                        {!isMobile &&
                            <View style={[styles.thirdBoxWrapper, { maxWidth: '25%', maxHeight: '65%' }]}>
                                <View>
                                    <Text category='h6' style={{ marginBottom: 20, fontSize: 18 }}>Location</Text>
                                    <View style={[styles.addressBoxWrapper, styles.boxStyle, { padding: 20 }]}>
                                        <Icon name="navigation-2-outline" width={20} height={20} />
                                        <Text style={[styles.address, { fontSize: 16 }]}>
                                            Suadiye, Bostancı Hatboyu Sk. No:3, 34740 Kadıköy/İstanbul, Turkey
                                        </Text>
                                    </View>
                                </View>

                                <View>
                                    <Text category='h6' style={{ marginBottom: 10, fontSize: 18 }}>TOTAL</Text>
                                    <Text category='h5' style={[styles.price, styles.boxStyle, { fontSize: 20 }]}>
                                        419,5 €
                                    </Text>
                                </View>

                                <Button style={[styles.checkoutButton, { paddingVertical: 15 }]}>CHECKOUT</Button>
                            </View>}
                    </Layout>
                </Layout>
            </ScrollView>
            {isMobile && <View style={styles.absoluteButtonWrapper}>
                <TouchableOpacity style={styles.checkoutMobileButton}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                        <Text category='s1'>CHECKOUT</Text>
                        <Text category='h5'>419,5 €</Text>
                    </View>
                </TouchableOpacity>
            </View>}
        </View>
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
    thirdBoxWrapper: {
        justifyContent: 'space-between',
    },
    secondBoxWrapper: {
        marginHorizontal: 30,
    },
    firstBoxWrapper: {},
    addressBoxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    address: {
        marginLeft: 10,
        color: "#B2B2B2",
    },
    price: {
        marginBottom: 20,
        padding: 15,
        color: "#666666",
    },
    checkoutButton: {
        backgroundColor: "#FAF190",
        borderRadius: 10,
        width: '100%',
        justifyContent: 'space-between',
    },
    checkoutMobileButton: {
        backgroundColor: "#FAF190",
        borderRadius: 10,
        width: '100%',
        height: 70,
        justifyContent: 'center',
    },
    absoluteButtonWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
    },
});

export default WebCart;
