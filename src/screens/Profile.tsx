import React, { useEffect } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { Platform, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

const ProfileScreen = () => {
  {Platform.OS === 'web' &&
    useEffect(() => {
    if (typeof window !== 'undefined') {
      window.initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: 41.7979, lng: 20.9082 },
          zoom: 8,
        });
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsiO74x3jCBecgqs585kAyV7E_TDc17ZM&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);}

  return (
    <Layout style={styles.container}>
      <Text category='h1'>Profile Screen</Text>

      {Platform.OS === 'web' ?
        <div id="map" style={styles.mapWeb}></div>
        :
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      }

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
  mapWeb:{
    width: '60%',
    height: '90%'
  }
});

export default ProfileScreen;
