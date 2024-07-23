import React, { useEffect, useState } from 'react';
import { Button, Card, Icon, Layout, Text, Modal, } from '@ui-kitten/components';
import { Platform, StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export type PermissionType = keyof typeof PERMISSIONS.IOS;

declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}

interface MarkerLocation {
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  image: string;
}

interface ProfileScreenProps {
  toggleTheme: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({toggleTheme}) => {
  const [location, setLocation] = useState({ latitude: 41.0082, longitude: 28.9784 });
  const storeMarker = require('../assets/images/store.png');
  const storeMarkerBase64 = "data:image/png;base64,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1MXIWYDujujvBOD1EmEc/RMRER3JqFmAkxYAHP0TERHpx6hZgO7MAHD0T0REpCMjZgFOWABompYBjv6JiIh0pcMswHkn+6aTzQBkgKN/IiIi3XXNAkRJxQ072Tf45CFgjv6JiIhOrGsWQGx1wJPSvQDg6J+IiKh7hGcBTkj3AiBmcD+O/omIiLohKCwUfaeO88mx9J8B0LjUKBERUbfZeryxX+8O45OjEBERkamwACAiIrIgFgBEREQWxAKAiIjIglgAEBERWVCQ3geoK9yLF2at0PswREREAcHjdvnkOLoXAFAK7s5O3Q9DRERE3cdLAERERBbEAoCIiMiCWAAQERFZEAsAIiIiC2IBQEREZEEsAIiIiCyIBQAREZEFsQAgIiKyIBYAREREFsQCgIiIyIJYABAREVkQCwAiIiILYgFARERkQSwAiIiILIgFABERkQUF6X2AkP59MOC+VXofRkTt2g2o+feHXmUsmj0av/vFfKEW6euWP63F6x/u8CojYclsxM+fIdQife279+9oL9rvVcYjdy3G7GmZQi3S15hz/whnp9urjEF/ugmOxDihFumns7oOxb940KuMYIcd29+8WahF+vrw83xcf++rXmWEDumH/nf9SKhF+uK5WR+6FwCaww5HSrzehxFhjwz3OiMyPBgD08x/wgS62uote2S437y+msP7t3tyfKTfvL6apnmd4UiM85vX11uapvnNa5scH+l1huYI8pvXludmffASABERkQWxACAiIrIgFgBEREQWxAKAiIjIglgAEBERWRALACIiIgtiAUBERGRBLACIiIgsiAUAERGRBbEAICIisiAWAERERBbEAoCIiMiCWAAQERFZEAsAIiIiC2IBQEREZEEsAIiIiCyIBQAREZEFsQAgIiKyIBYAREREFnSyAsDt7QGUR3kb4TsCbXV7PAIN8Q2RtvrR7yvRVo8fvZ8l2qr85PWVaKfVXlurfXYtd27uRv99sgKg0esWNDR7G+EzLoG2VtW2CLTENyTa6qpvEmiJb7gavG9rVZ1/vL71jW3odHldv8PtJ6+vRDs7XW40NLcLtEZ/Eu9Dic+Dr0icZ6x2bgZQf7JvOFkBUOdtC1wNzYDyj8raVed1vYOySu8zfEWira6aBoGW+IBScNV6//tWVPvHSfNAlcz7sNNPXl+pdvrL6yvRTldto/+cmwVeX6ud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";
  const [address, setAddress] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MarkerLocation | null>(null);

  const [region, setRegion] = useState<Region>({
    latitude: 41.0082,
    longitude: 28.9784,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const markerLocations = [
    { latitude: 41.9981, longitude: 21.4254, address: "Skopje", description: "Description 1", image: '../assets/images/store.png' },
    { latitude: 42.03, longitude: 21.13, address: "Address 2", description: "Description 2", image: '../assets/images/store.png' },
    { latitude: 42.04, longitude: 21.08, address: "Address 3", description: "Description 3", image: '../assets/images/store.png' },
    { latitude: 41.0308, longitude: 21.3347, address: "Address 4", description: "Description 4", image: '../assets/images/store.png' },
    { latitude: 41.1172, longitude: 20.8016, address: "Address 5", description: "Description 5", image: '../assets/images/store.png' },
    { latitude: 42.1322, longitude: 21.7144, address: "Address 6", description: "Description 6", image: '../assets/images/store.png' },
    { latitude: 41.7970, longitude: 20.9089, address: "Gostivar", description: "Description 7", image: '../assets/images/store.png' }
  ];

  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCA6i3Fx2hwCFDkJ--vtHzihYKzLf80YXA`
      );
      const data = await response.json();
      if (data.results && data.results[0]) {
        setAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const getUserLocation = async () => {
    Geolocation.getCurrentPosition(
      async (info) => {
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
        fetchAddress(newLocation.latitude, newLocation.longitude);
      },
      (error) => {
        console.error('Error getting location', error);
        setLocation({ latitude: 41.0082, longitude: 28.9784 });
      },
      { enableHighAccuracy: Platform.OS === 'ios', timeout: 60000, maximumAge: 1000 }
    );
  };

  const handleZoomIn = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta / 2,
      longitudeDelta: prevRegion.longitudeDelta / 2,
    }));
  };

  const handleZoomOut = () => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: prevRegion.latitudeDelta * 2,
      longitudeDelta: prevRegion.longitudeDelta * 2,
    }));
  };

  const openMapsApp = () => {
    if (selectedMarker) {
      let url = '';
      if (Platform.OS === 'web')
        url = `https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.latitude},${selectedMarker.longitude}`;
      else if (Platform.OS === 'ios')
        url = `http://maps.apple.com/?daddr=${selectedMarker.latitude},${selectedMarker.longitude}`;
      else
        url = `http://maps.google.com/?daddr=${selectedMarker.latitude},${selectedMarker.longitude}`;

      Linking.openURL(url);
    }
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'web') {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              console.log('Geolocation permission granted');
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log('Current Position:', latitude, longitude);
              setLocation({ latitude, longitude });
              fetchAddress(latitude, longitude);
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
          const markerInstance = new window.google.maps.Marker({
            position: { lat: marker.latitude, lng: marker.longitude },
            map,
            icon: {
              url: storeMarkerBase64,
              scaledSize: new window.google.maps.Size(30, 30) 
            }
          });
          markerInstance.addListener('click', () => {
            setSelectedMarker(marker);
            setVisible(true);
          });
        });
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCA6i3Fx2hwCFDkJ--vtHzihYKzLf80YXA&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, [location.latitude, location.longitude]);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setVisible(true);
  };

  return (
    <Layout style={styles.container}>

      <View style={[styles.addressBoxWrapper, styles.boxStyle]}>
        <Icon name="navigation-2-outline" width={20} height={20} />
        <Text numberOfLines={1} style={[styles.address, { maxWidth: '90%' }]}>
          {address || 'Suadiye, Bostancı Hatboyu Sk. No:3, 34740 Kadıköy/İstanbul, Turkey'}
        </Text>
      </View>

      <Button style={{marginVertical: 5}} onPress={toggleTheme}>Switch Theme</Button>

      <Text category='h5' style={{ marginBottom: 10 }}>Regions We Serve</Text>

      {Platform.OS === 'web' ?
        <div id="map" style={styles.mapWeb}></div>
        :
        <>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            showsUserLocation
            showsMyLocationButton
            showsCompass
            zoomEnabled={true}
            zoomControlEnabled
          >
            <Marker coordinate={location} />
            {markerLocations.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                onPress={() => handleMarkerPress(marker)}
              >
                <Image
                  source={storeMarker}
                  style={{ width: 50, height: 50 }}
                />
              </Marker>
            ))}
          </MapView>
          <View style={styles.zoomButtons}>
            <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
              <Text style={styles.zoomButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
              <Text style={styles.zoomButtonText}>-</Text>
            </TouchableOpacity>
          </View>
        </>
      }
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          {selectedMarker && (
            <>
              <TouchableOpacity onPress={() => setVisible(false)} style={{alignSelf: 'flex-end'}}>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>x</Text>
              </TouchableOpacity>
              <Image
                source={storeMarker}
                style={styles.modalImage}
              />
              <View style={{ marginVertical: 10 }}>
                <Text category='h6'>{selectedMarker.address}</Text>
                <Text>{selectedMarker.description}</Text>
              </View>
              <Button onPress={openMapsApp}>
                Start Navigation
              </Button>
            </>
          )}
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingTop: 30
  },
  map: {
    width: '100%',
    height: '80%',
  },
  mapWeb: {
    width: '90%',
    height: '80%'
  },
  boxStyle: {
    borderRadius: 10,
  },
  addressBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  address: {
    marginLeft: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 10
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  webModal: {
    backgroundColor: '#fff',
    padding: 20,

    borderRadius: 10,
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: 5,
    cursor: 'pointer',
  },
  zoomButtons: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  zoomButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  zoomButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default ProfileScreen;
