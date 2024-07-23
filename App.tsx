import React, { useEffect, useState } from 'react';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json';
import WebNavigation from './src/navigation/webNavigation';
import MobileNavigation from './src/navigation/mobileNavigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Button, Platform, View } from 'react-native';
import { BrowserRouter as Router } from 'react-router-dom';
import { default as mapping } from './mapping.json';
import Cookies from 'universal-cookie';
import CookieConsent from './src/component/CookieConsent';

const cookies = new Cookies();

const App = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const isMobile = useState(Platform.OS !== 'web' ? true : false);

  useEffect(() => {
    const consent = cookies.get('cookieConsent');
    if (consent === 'accepted') {
      setCookiesAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    setCookiesAccepted(true);
  };
  
  const handleReject = () => {
    setCookiesAccepted(false);
  };
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        {Platform.OS === 'web' ? (
          <Router>
            <Layout style={{ flex: 1 }}>
              <WebNavigation />
              {!cookiesAccepted && (
                <CookieConsent onAccept={handleAccept} onReject={handleReject} isMobile={isMobile}/>
              )}
            </Layout>
          </Router>
        ) : (
          <MobileNavigation />
        )}
      </ApplicationProvider>
    </>
  );
};

export default App;
