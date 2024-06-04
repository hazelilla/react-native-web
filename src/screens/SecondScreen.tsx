import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const SecondScreen = () => {
  return (
    <Layout style={styles.container}>
      <Text category='h1' style={styles.title}>Second Screen</Text>
      <Text category='p1' style={styles.text}>
        This is the second screen of your app. You can add more content here.
      </Text>
      <Button style={styles.button}>Go Back</Button>
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
  },
  title: {
    color: '#3366FF', // Blue title color
    marginBottom: 8,
  },
  text: {
    color: '#333333', // Dark text color
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
});

export default SecondScreen;
