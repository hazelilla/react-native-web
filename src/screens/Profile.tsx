import React, { useEffect, useRef, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { Platform, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export type PermissionType = keyof typeof PERMISSIONS.IOS;

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

const ProfileScreen = () => {
  const [location, setLocation] = useState({ latitude: 41.0082, longitude: 28.9784 });
  const [region, setRegion] = useState<Region>({
    latitude: 41.0082,
    longitude: 28.9784,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const markerLocations = [
    { latitude: 41.9981, longitude: 21.4254 }, 
    { latitude: 42.03, longitude: 21.13 }, 
    { latitude: 42.04, longitude: 21.08 }
  ];

  const getUserLocation = async () => {
    Geolocation.getCurrentPosition(
      (info) => {
        const newLocation = {
          longitude: info.coords.longitude,
          latitude: info.coords.latitude,
        };
        setLocation(newLocation);
        setRegion({
          ...region,
          latitude: newLocation.latitude,
          longitude: newLocation.longitude,
        });
      },
      (error) => {
        console.error('Error getting location', error);
        setLocation({ latitude: 41.0082, longitude: 28.9784 });
      },
      { enableHighAccuracy: Platform.OS === 'ios', timeout: 60000, maximumAge: 1000 }
    );
  };


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
              setLocation({ latitude: 41.0082, longitude: 28.9784 });
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
          setLocation({ latitude: 41.0082, longitude: 28.9784 });
        }
      } else {
        const status = await request(PERMISSIONS.IOS['LOCATION_ALWAYS']);

        if (status === 'granted') {
          console.log(`Permission LOCATION_ALWAYS granted`);
          getUserLocation();
        } else {
          console.log(`Permission LOCATION_ALWAYS denied or restricted`);
        }
      }
    };

    requestLocationPermission();

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
          center: { lat: location.latitude || 41.0082, lng: location.longitude || 28.9784 },
          zoom: 8,
        });

        new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map
        });

        markerLocations.forEach((marker) => {
          new window.google.maps.Marker({
            position: { lat: marker.latitude, lng: marker.longitude },
            map,
          });
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
          region={region}
        >
          <Marker coordinate={location} />
          {markerLocations.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            />
          ))}
        </MapView>
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
