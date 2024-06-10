import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ImageSourcePropType } from 'react-native';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { categories, categoryImages } from '../utils/constants';

interface ProductCardProps {
    index: number;
    numColumns: number;
    category: string;
    image: ImageSourcePropType; 
}

const ProductCard: React.FC<ProductCardProps> = ({ index, numColumns, category, image }) => {
    const isLastItem = (index + 1) % numColumns === 0;

    return (
        <Layout style={[styles.container, !isLastItem && styles.marginRight]}>
            {image && <Image source={image} style={styles.image} resizeMode='cover' />}
            <View style={styles.priceContainer}>
                <Text category='s1'>4,19€</Text>
                <TouchableOpacity style={styles.addButton} onPress={undefined}>
                    <Icon name={'plus'} width={15} height={15} fill='black' />
                </TouchableOpacity>
            </View>
            <Text category='s1' style={styles.title}>Box of organic raspberries (125 g), Portugal</Text>
            <Text category='p2'>125g (33,52€/kg)</Text>
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
    addButton: {
        backgroundColor: '#FAF190',
        borderRadius: 40,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 5,
    },
    marginRight: {
        marginRight: 20,
    },
});

export default ProductCard;
