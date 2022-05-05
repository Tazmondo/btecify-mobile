import 'expo-dev-client';

import {registerRootComponent} from 'expo';
import TrackPlayer, {Event} from 'react-native-track-player'

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
TrackPlayer.registerPlaybackService(() => {
    return async function () {
        TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
        TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
        TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
        TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
        TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
    }
})

registerRootComponent(App);
