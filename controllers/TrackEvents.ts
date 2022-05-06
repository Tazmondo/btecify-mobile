import TrackPlayer, {Event} from "react-native-track-player";
import {getNextSongs} from "./Playlist";

export async function registerEvents() {
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
        getNextSongs().then(async (tracks) => {
            await TrackPlayer.add(tracks)
            await TrackPlayer.play()
        })
    })

    TrackPlayer.addEventListener(Event.PlaybackState, async () => {
        console.log(await TrackPlayer.getQueue())
    })
}