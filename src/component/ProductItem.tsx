import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import PlusMinusButton from './PlusMinusButton';
import { categoryImages } from '../utils/constants';
import ProductDetailModal from './ProductDetailModal';

interface ProductItemProps {
    buttonRemoval?: boolean
    isVertical?: boolean
    customWidth?: any
    customFontSize?: any
    discount?: boolean
}

const getRandomImage = () => {
    const categories = Object.keys(categoryImages);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const images = categoryImages[randomCategory];
    return images[Math.floor(Math.random() * images.length)];
};

const ProductItem: React.FC<ProductItemProps> = ({ buttonRemoval, isVertical, customWidth, customFontSize, discount }) => {
    const randomImage = getRandomImage();
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleClose = () => {
        setModalVisible(false);
    };
    
    return (
        <>
            {!isVertical ?
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <TouchableOpacity onPress={handlePress}>
                            <Image source={randomImage} style={styles.imageView} resizeMode='cover' />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    category={customFontSize ? customFontSize : 'h5'}
                                    style={{ textDecorationLine: discount ? 'line-through' : 'none' }}
                                >
                                    4,19 €
                                </Text>
                                {discount &&
                                    <Text
                                        category={customFontSize ? customFontSize : 'h5'}
                                        style={{ color: 'red', marginLeft: 7 }}
                                    >
                                        2,95 €
                                    </Text>}
                            </View>

                            <Text numberOfLines={2} style={{ maxWidth: customWidth ? customWidth : '70%' }}>Box of organic raspberries (125 g), Portugal</Text>
                        </View>
                    </View>
                    {buttonRemoval ?
                        null
                        :
                        <PlusMinusButton />
                    }
                </View>
                :
                <View style={{ marginRight: 20 }}>
                    <TouchableOpacity onPress={handlePress}>
                        <Image source={randomImage} style={[styles.imageView, { width: 110, height: 105 }]} resizeMode='cover' />
                    </TouchableOpacity>

                    <View style={{ paddingVertical: 10 }}>
                        <PlusMinusButton />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text category='s1' style={{ textDecorationLine: discount ? 'line-through' : 'none' }}>4,19 €</Text>
                        {discount &&
                            <Text category='s1' style={{ color: 'red', marginLeft: 7 }}>2,95 €</Text>}
                    </View>
                    <Text numberOfLines={2} style={{ maxWidth: 110 }}>Box of organic raspberries (125 g), Portugal</Text>

                </View>}

            <ProductDetailModal
                visible={modalVisible}
                onClose={handleClose}
                image={randomImage}
                title="Box of organic raspberries (125 g), Portugal"
                description="Our Box of Organic Raspberries (125 g) from Portugal is a delightful addition to your daily diet. These luscious, vibrant red berries are harvested at the peak of ripeness, ensuring each berry bursts with juicy flavor and natural sweetness. Grown in the sun-kissed fields of Portugal, our raspberries are nurtured with the utmost care and attention, adhering to strict organic farming practices that exclude the use of synthetic pesticides and fertilizers."
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageView: {
        width: 70,
        height: 70,
        backgroundColor: 'orange',
        borderRadius: 15
    },
});

export default ProductItem;
