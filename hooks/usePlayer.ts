import {useEffect, useState} from "react";
import TrackPlayer, {Capability} from "react-native-track-player";

export default function usePlayer() {
    const [player, setPlayer] = useState<boolean>(false)

    useEffect(() => {
        async function run() {
            await TrackPlayer.setupPlayer()

            // Copy pasted from the example in the reat native track player src repo
            await TrackPlayer.updateOptions({
                stopWithApp: false,  // todo: make me false
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                    Capability.SeekTo
                ],
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                ],
                // progressUpdateEventInterval: 2,  // Commented because it doesnt seem to exist, maybe the example was outdated
            });

            setPlayer(true)
        }

        run()
    }, [])

    return player
}