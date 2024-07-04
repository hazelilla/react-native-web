import React, { useEffect, useRef, useState } from 'react';
import {
    ScrollView,
    View,
    FlatList,
    Image,
    StyleSheet,
    Dimensions,
    Platform,
    TouchableOpacity,
    Linking
} from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import ProductItem from '../component/ProductItem';
import { analytics } from '../../firebase';
import carousel1 from '../assets/images/carousel1.png';
import carousel2 from '../assets/images/carousel2.png';
import carousel3 from '../assets/images/carousel3.png';
import appStore from '../assets/images/appleStore.png';
import googlePlay from '../assets/images/playStore.png';

const HomeScreen = () => {
    const flatListRef = useRef<FlatList | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { width: screenWidth } = Dimensions.get('window');
    const recommendedItems = Array.from({ length: 50 }, (_, index) => ({ key: `product-${index}` }));
    const carouselImages = [carousel1, carousel2, carousel3];

    const openAppstore = () => {
        const storeUrl = 'https://apps.apple.com/us/app/roblox/id431946152';
        Linking.openURL(storeUrl);
    };

    const openPlayStore = () => {
        const storeUrl = 'https://play.google.com/store/apps/details?id=com.roblox.client';
        Linking.openURL(storeUrl);
    };

    const renderVerticalRecommendedItem = ({ item }) => (
        <ProductItem buttonRemoval={true} isVertical={true} discount={true} />
    );

    const renderImage = ({ item }) => (
        <Image
            source={item}
            style={{
                height: 300,
                width: screenWidth,
                borderTopRightRadius: Platform.OS !== 'web' ? 0 : 300,
                borderBottomRightRadius: Platform.OS !== 'web' ? 0 : 300,
            }}
            resizeMode="cover"
        />
    );

    const renderIndicator = (index) => {
        const backgroundColor = index === currentIndex ? '#333333' : '#CCCCCC';
        return <View style={[styles.indicator, { backgroundColor }]} key={index} />;
    };

    const scrollToNextItem = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index: (currentIndex + 1) % carouselImages.length,
                animated: true,
            });
            setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }
    };

    useEffect(() => {
        const interval = setInterval(scrollToNextItem, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex]);

    return (
        <Layout style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Layout style={{ alignItems: 'center' }}>
                    <FlatList
                        ref={flatListRef}
                        data={carouselImages}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderImage}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ width: screenWidth }}
                        contentContainerStyle={styles.carouselContentContainer}
                        initialScrollIndex={0}
                        getItemLayout={(data, index) => ({
                            length: screenWidth,
                            offset: screenWidth * index,
                            index,
                        })}
                    />
                    {/* <Button onPress={() => analytics.logEvent('custom_event', {
                        item: 'example_item',
                        description: 'This is a custom event'
                    })}>
                        SKDHSKJDHKSJHDKSJDKSJKDJKS
                    </Button> */}
                    <View style={styles.indicatorContainer}>
                        {carouselImages.map((_, index) => renderIndicator(index))}
                    </View>

                    <View style={{ marginTop: 20, flex: 5, width: '98%' }}>
                        <Text category="h1">Deals</Text>
                        <View style={[styles.boxStyle]}>
                            <FlatList
                                data={recommendedItems}
                                renderItem={renderVerticalRecommendedItem}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{ width: '100%' }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20, flex: 5, width: '98%' }}>
                        <Text category="h1">Deals</Text>
                        <View style={[styles.boxStyle]}>
                            <FlatList
                                data={recommendedItems}
                                renderItem={renderVerticalRecommendedItem}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{ width: '100%' }}
                            />
                        </View>
                    </View>

                    {Platform.OS === 'web' &&
                        <>
                            <TouchableOpacity style={{ marginTop: 20 }} onPress={openAppstore}>
                                <Image source={appStore} style={styles.webImage} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 20 }} onPress={openPlayStore}>
                                <Image source={googlePlay} style={styles.webImage} />
                            </TouchableOpacity>
                        </>
                    }
                </Layout>
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
    },
    carouselContentContainer: {
        flexGrow: 1,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    indicator: {
        width: 20,
        height: 3,
        marginHorizontal: 2,
        borderRadius: 2,
    },
    boxStyle: {
        backgroundColor: "#F7F7F7",
        borderRadius: 10,
        padding: 10,
    },
    webImage: {
        width: 250,
        height: 50,
        marginTop: 20,
        resizeMode: 'contain'
    }
});

export default HomeScreen;
