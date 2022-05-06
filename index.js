import 'expo-dev-client';

import {registerRootComponent} from 'expo';
import TrackPlayer from 'react-native-track-player'

import App from './App';
import {registerEvents} from "./controllers/TrackEvents";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(App);

TrackPlayer.registerPlaybackService(() => registerEvents)