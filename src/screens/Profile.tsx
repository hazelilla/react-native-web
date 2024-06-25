import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const ProfileScreen = () => {
  return (
    <Layout style={styles.container}>
      <Text category='h1'>Profile Screen</Text>
      <Text category='p1'>
        This is the second screen of your app. You can add more content here.
      </Text>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF', 
  },
  map: {
    width: '100%',
    height: '40%',
  },
});

export default ProfileScreen;
