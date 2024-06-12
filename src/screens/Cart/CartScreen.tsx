import React from 'react';
import { Layout } from '@ui-kitten/components';
import { Platform, StyleSheet} from 'react-native';
import MobileCart from './MobileCart';
import WebCart from './WebCart';

const CartScreen = () => {
  return (
    <Layout style={styles.container}>
      {Platform.OS === 'web' &&
        <WebCart/>
      }

      {Platform.OS !== 'web' &&
        <MobileCart/>
      }
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  }
});

export default CartScreen;
