import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'RNativeWeb',
  })
  .useReactNative()
  .connect();

  console.tron = Reactotron;

export default Reactotron;