import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json';
import WebNavigation from './src/navigation/webNavigation';
import MobileNavigation from './src/navigation/mobileNavigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Platform } from 'react-native';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        {Platform.OS === 'web' ? (
          <Router>
            <WebNavigation />
          </Router>
        ) : (
          <MobileNavigation />
        )}
      </ApplicationProvider>
    </>
  );
};

export default App;
