import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CookieManager from '@react-native-cookies/cookies';

const CookieConsent = ({ onAccept, onReject }) => {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkConsent = async () => {
      const cookies = await CookieManager.getAll();
      if (!cookies.cookieConsent) {
        setIsVisible(true);
      }
    };
    checkConsent();
  }, []);

  const acceptCookies = async () => {
    await CookieManager.set('http://localhost:3000', {
      name: 'cookieConsent',
      value: 'accepted',
      path: '/',
      domain: 'localhost',
      secure: true,
      httpOnly: true,
    });
    setIsVisible(false);
    onAccept();
  };

  const rejectCookies = async () => {
    await CookieManager.clearByName('cookieConsent', 'http://localhost:3000');
    setIsVisible(false);
    onReject();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>We use cookies to improve your experience. Do you accept cookies?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Accept" onPress={acceptCookies} />
        <Button title="Reject" onPress={rejectCookies} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default CookieConsent;