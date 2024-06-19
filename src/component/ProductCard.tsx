import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import PlusMinusButton from './PlusMinusButton';
import ProductDetailModal from './ProductDetailModal';

interface ProductCardProps {
    index: number;
    numColumns: number;
    category: string;
    image: ImageSourcePropType;
}

const ProductCard: React.FC<ProductCardProps> = ({ index, numColumns, category, image }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const isLastItem = (index + 1) % numColumns === 0;

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleClose = () => {
        setModalVisible(false);
    };

    return (
        <Layout style={[styles.container, !isLastItem && styles.marginRight]}>
            <TouchableOpacity onPress={handlePress}>
                {image && <Image source={image} style={styles.image} resizeMode='cover' />}
            </TouchableOpacity>
            <View style={styles.priceContainer}>
                <Text category='s1'>4,19€</Text>
                <PlusMinusButton />
            </View>
            <TouchableOpacity onPress={handlePress}>
                <Text category='s1' style={styles.title}>Box of organic raspberries (125 g), Portugal</Text>
            </TouchableOpacity>
            <Text category='p2'>125g (33,52€/kg)</Text>

            <ProductDetailModal
                visible={modalVisible}
                onClose={handleClose}
                image={image}
                title="Box of organic raspberries (125 g), Portugal"
                description="Our Box of Organic Raspberries (125 g) from Portugal is a delightful addition to your daily diet. These luscious, vibrant red berries are harvested at the peak of ripeness, ensuring each berry bursts with juicy flavor and natural sweetness. Grown in the sun-kissed fields of Portugal, our raspberries are nurtured with the utmost care and attention, adhering to strict organic farming practices that exclude the use of synthetic pesticides and fertilizers."
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        marginVertical: 10,
    },
    image: {
        width: 150,
        height: 150,
        backgroundColor: '#FAF190',
        borderRadius: 20,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    title: {
        marginBottom: 5,
    },
    marginRight: {
        marginRight: 20,
    },
});

export default ProductCard;
