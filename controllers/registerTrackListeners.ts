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
        console.log("\n\nQueue: ")
        let curQueue = await TrackPlayer.getQueue()
        let curIndex = await TrackPlayer.getCurrentTrack()
        let songsLeft = curQueue.length - curIndex

        console.log(`songs left: ${songsLeft}`)

        if (songsLeft < 5) {
            await TrackPlayer.add(await getNextSongs())
        }
    })
}