import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Platform, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { requestPermission } from '../utils/permissionUtil';
import { PERMISSIONS, request, PermissionStatus } from 'react-native-permissions';

export type PermissionType = keyof typeof PERMISSIONS.IOS;

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

const ProfileScreen = () => {
  const [location, setLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'web') {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('Geolocation permission granted');
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log('Current Position:', latitude, longitude);
              setLocation({ latitude, longitude });
            },
            (error) => {
              console.error('Geolocation permission denied', error);
              setLocation({ latitude: 37.78825, longitude: -122.4324 });
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
          setLocation({ latitude: 37.78825, longitude: -122.4324 });
        }
      } else {
        const status = await request(PERMISSIONS.IOS['LOCATION_ALWAYS']);

        if (status === 'granted') {
          console.log(`Permission LOCATION_ALWAYS granted`);
        } else {
          console.log(`Permission LOCATION_ALWAYS denied or restricted`);
        }
      }
    };

    requestLocationPermission();

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: location.latitude || 37.78825, lng: location.longitude || -122.4324 },
          zoom: 8,
        });
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsiO74x3jCBecgqs585kAyV7E_TDc17ZM&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, [location.latitude, location.longitude]);

  return (
    <Layout style={styles.container}>
      <Text category='h1'>Profile Screen</Text>

      {Platform.OS === 'web' ?
        <div id="map" style={styles.mapWeb}></div>
        :
        <MapView
          style={styles.map}
          initialRegion={{
            latitude:  37.78825,
            longitude:  -122.4324,
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
  mapWeb: {
    width: '60%',
    height: '90%'
  }
});

export default ProfileScreen;
