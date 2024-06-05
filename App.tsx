import React from 'react';
import Home from './src/screens/Home';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from './theme.json';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Home />
    </ApplicationProvider>
  );
};

export default App;