import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ImageSourcePropType, Animated, Easing } from 'react-native';
import { Layout, Text, Icon } from '@ui-kitten/components';

interface ProductCardProps {
    index: number;
    numColumns: number;
    category: string;
    image: ImageSourcePropType;
}

const ProductCard: React.FC<ProductCardProps> = ({ index, numColumns, category, image }) => {
    const isLastItem = (index + 1) % numColumns === 0;
    const [counter, setCounter] = useState(0);
    const widthAnim = useRef(new Animated.Value(25)).current;

    useEffect(() => {
        Animated.timing(widthAnim, {
            toValue: counter > 0 ? 80 : 25,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [counter]);

    const handlePlusButton = () => {
        setCounter(counter + 1);
    };

    const handleMinusButton = () => {
        if (counter !== 0) {
            setCounter(counter - 1);
        }
    };

    return (
        <Layout style={[styles.container, !isLastItem && styles.marginRight]}>
            {image && <Image source={image} style={styles.image} resizeMode='cover' />}
            <View style={styles.priceContainer}>
                <Text category='s1'>4,19€</Text>
                <Animated.View style={[styles.buttonContainer, { width: widthAnim }]}>
                    {counter > 0 && (
                        <>
                            <TouchableOpacity
                                style={[styles.addButton, { backgroundColor: counter === 1 ? '#FF743F' : "#FAF190" }]}
                                onPress={handleMinusButton}
                            >
                                <Icon
                                    name={counter === 1 ? 'trash-2-outline' : 'minus'}
                                    width={15}
                                    height={15}
                                    fill={counter === 1 ? 'white' : 'black'}
                                />
                            </TouchableOpacity>
                            <Text style={{ marginHorizontal: 10 }}>{counter}</Text>
                        </>
                    )}
                    <TouchableOpacity style={styles.addButton} onPress={handlePlusButton}>
                        <Icon name={'plus'} width={15} height={15} fill='black' />
                    </TouchableOpacity>
                </Animated.View>
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
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FDFCD0',
        borderRadius: 40,
        overflow: 'hidden',
    },
    addButton: {
        backgroundColor: '#FAF190',
        borderRadius: 40,
        width: 25,
        height: 25,
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
