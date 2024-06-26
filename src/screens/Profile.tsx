import React, { useEffect, useState } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { requestPermission } from '../utils/permissionUtil';

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

const ProfileScreen = () => {
  const [location, setLocation] = useState({ latitude: 37.78825, longitude: -122.4324 });

  const requestLocationPermission = async () => {
    if (Platform.OS === 'web') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Geolocation permission granted');
            const  latitude  = position.coords.latitude;
            const longitude = position.coords.longitude; 
            console.log('Current Position:', position.coords.latitude, position.coords.longitude);
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Geolocation permission denied', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } else {
      const permissionStatus = await requestPermission('LOCATION_ALWAYS');
      if (permissionStatus === 'granted') {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Geolocation permission granted');
            console.log('Current Position:', position.coords);
          },
          (error) => {
            console.error('Geolocation permission denied', error);
          }
        );
      }
    }
  };

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: location.latitude, lng: location.longitude },
          zoom: 8,
        });
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsiO74x3jCBecgqs585kAyV7E_TDc17ZM&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <Layout style={styles.container}>
      <Text category='h1'>Profile Screen</Text>
      <TouchableOpacity onPress={requestLocationPermission}>
        <Text>Request Location Permission</Text>
      </TouchableOpacity>
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
  mapWeb: {
    width: '60%',
    height: '90%'
  }
});

export default ProfileScreen;
