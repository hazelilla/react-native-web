import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import regular from './src/assets/fonts/Roboto-Regular.ttf';
import medium from './src/assets/fonts/Roboto-Medium.ttf';
import bold from './src/assets/fonts/Roboto-BoldItalic.ttf';

const regularFontStyles = `@font-face {
  src: url(${regular});
  font-family: 'Roboto-Regular';
}`;

const mediumFontStyles = `@font-face {
  src: url(${medium});
  font-family: 'Roboto-Medium';
}`;

const boldFontStyles = `@font-face {
  src: url(${bold});
  font-family: 'Roboto-BoldItalic';
}`;


const style = document.createElement('style');
style.type = 'text/css';

if (style.styleSheet) {
  style.styleSheet.cssText = `${regularFontStyles} ${mediumFontStyles} ${boldFontStyles}`;
} else {
  style.appendChild(document.createTextNode(regularFontStyles));
  style.appendChild(document.createTextNode(mediumFontStyles));
  style.appendChild(document.createTextNode(boldFontStyles));
}

document.head.appendChild(style);

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
