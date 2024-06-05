import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json';
import MobileNavigation, { WebNavigation } from './src/navigation/navigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Platform } from 'react-native';

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        {
          Platform.OS === 'web' ?
          <WebNavigation/>
          :
          <MobileNavigation />
        }
      </ApplicationProvider>
    </>
  );
};

export default App;