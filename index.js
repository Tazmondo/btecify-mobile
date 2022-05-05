import 'expo-dev-client';

import {registerRootComponent} from 'expo';
import TrackPlayer, {Event} from 'react-native-track-player'

import App from './App';
import {getNextSongs} from "./controllers/Playlist";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

registerRootComponent(App);

TrackPlayer.registerPlaybackService(() => {
    return async function () {
        console.log("Registering playback service...")
        TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
        TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
        TrackPlayer.addEventListener(Event.RemoteStop, () => {
            console.log("Destroy track player...")
            TrackPlayer.destroy();
        });
        TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
        TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());

        TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
            getNextSongs().then(tracks => {
                TrackPlayer.add(tracks)
                TrackPlayer.play()
            })
        })
    }
})