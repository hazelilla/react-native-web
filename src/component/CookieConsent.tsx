import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CookieConsent = ({ onAccept, onReject }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = cookies.get('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    cookies.set('cookieConsent', 'accepted', { path: '/' });
    setIsVisible(false);
    onAccept();
  };

  const rejectCookies = () => {
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
