// ProductDetailModal.tsx
import React from 'react';
import { Modal, StyleSheet, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';

interface ProductDetailModalProps {
    visible: boolean;
    onClose: () => void;
    image: ImageSourcePropType;
    title: string;
    description: string;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ visible, onClose, image, title, description }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <Layout style={styles.modalContainer}>
                    <Image source={image} style={styles.image} resizeMode='cover' />
                    <Text category='h5' style={styles.title}>{title}</Text>
                    <Text category='p1'>{description}</Text>
                    <Button onPress={onClose} style={styles.button}>Close</Button>
                </Layout>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
   
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        marginTop: 20
    }
});

export default ProductDetailModal;
