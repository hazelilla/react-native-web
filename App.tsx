import React, { useState } from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { myTheme } from './theme';
import WebNavigation from './src/navigation/webNavigation';
import MobileNavigation from './src/navigation/mobileNavigation';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Platform, useColorScheme } from 'react-native';
import { BrowserRouter as Router } from 'react-router-dom';
import { default as mapping } from './mapping.json';

const App = () => {
  const colorScheme = useColorScheme();
  const [ webTheme, setWebTheme] = useState({ ...eva.light, ...myTheme });
  const [theme, setTheme] = useState(colorScheme === 'dark' ? { ...eva.dark, ...myTheme } : { ...eva.light, ...myTheme });

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === eva.light ? eva.dark : eva.light);
    setWebTheme(prevTheme => prevTheme === eva.light ? eva.dark : eva.light);
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={Platform.OS === 'web' ? webTheme : theme}
        customMapping={mapping}
      >
        {Platform.OS === 'web' ? (
          <Router>
            <WebNavigation toggleTheme={toggleTheme}/>
          </Router>
        ) : (
          <MobileNavigation toggleTheme={toggleTheme} />
        )}
      </ApplicationProvider>
    </>
  );
};

export default App;
