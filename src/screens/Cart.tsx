import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const CartScreen = () => {
  return (
    <Layout style={styles.container}>
      <Text category='h1'>Cart Screen</Text>
      <Text category='p1'>
        This is the second screen of your app. You can add more content here.
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF', // White background color
  }
});

export default CartScreen;
