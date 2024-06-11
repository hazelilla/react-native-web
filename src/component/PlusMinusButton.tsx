import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ImageSourcePropType, Animated, Easing } from 'react-native';
import { Layout, Text, Icon } from '@ui-kitten/components';


const PlusMinusButton: React.FC = () => {
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
    );
};

const styles = StyleSheet.create({
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
    marginRight: {
        marginRight: 20,
    },
});

export default PlusMinusButton;
