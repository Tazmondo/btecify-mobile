import {MonoText} from "./StyledText";
import {View} from "./Themed";
import {Image, Pressable, StyleSheet} from "react-native";
import {useState} from "react";

import TrackPlayer, {Event, State, useTrackPlayerEvents} from "react-native-track-player";
import {PauseSVG, PlaySVG, SkipSVG} from "./Icon";
import {playlistInfo} from "../controllers/Playlist";

const iconProps = {
    color: "#fff",
    width: 35,
    height: 35
}

export default function Player() {
    const [imageUrl, setImageUrl] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [artist, setArtist] = useState<string>("")
    const [position, setPosition] = useState<number>(0)
    const [paused, setPaused] = useState<boolean>(true)
    const [playlist, setPlaylist] = useState<string>("")

    useTrackPlayerEvents([Event.PlaybackTrackChanged, Event.PlaybackState], async (event) => {
        setPlaylist(playlistInfo.title ?? "")
        if (event.type == Event.PlaybackTrackChanged) {

            let currentTrack = await TrackPlayer.getTrack(event.nextTrack)
            let state = await TrackPlayer.getState()
            console.log("state: " + state);

            if (currentTrack == null) {
                setImageUrl("")
                setTitle("null track")
                setArtist("null track")
                setPosition(0)
                setPaused(true)
            } else {
                console.log(currentTrack);
                setImageUrl(currentTrack.artwork as string ?? "")
                setTitle(currentTrack.title ?? "")
                setArtist(currentTrack.artist ?? "")
                setPosition(currentTrack.duration != null ? 100 * await TrackPlayer.getPosition() / (currentTrack.duration) : 0)
                setPaused(!(state == State.Playing))
            }
        } else if (event.type == Event.PlaybackState) {
            let state = event.state
            console.log("state changed " + state);
            setPaused(!(state == State.Playing))
        }
    })

    function play() {
        TrackPlayer.play()
    }

    function pause() {
        TrackPlayer.pause()
    }

    function skip() {
        TrackPlayer.skipToNext()
    }

    // Player needs:
    //      Image on left
    //      Song title
    //      Artist
    //      Album (if it fits)
    //      Current playlist in middle
    //      Pause and skip on right
    if (title == "") {
        return <View style={styles.container}>
            <MonoText>Choose a playlist!</MonoText>
        </View>
    } else {
        return <View style={styles.container}>
            <Image source={imageUrl != "" ? {uri: imageUrl} : {}} style={styles.image}></Image>

            <View style={styles.trackInfo}>
                <MonoText>{title}</MonoText>
                <MonoText>{artist}</MonoText>
            </View>

            <View style={styles.middle}>
                <MonoText>{playlist}</MonoText>
            </View>

            <View style={styles.buttons}>
                {paused ?
                    <Pressable style={styles.icon} onPress={play}>
                        <PlaySVG {...iconProps}></PlaySVG>
                    </Pressable>
                    :
                    <Pressable style={styles.icon} onPress={pause}>
                        <PauseSVG {...iconProps}></PauseSVG>
                    </Pressable>
                }
                <Pressable style={styles.icon} onPress={skip}>
                    <SkipSVG {...iconProps}></SkipSVG>
                </Pressable>
            </View>
        </View>
    }
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
    },
    trackInfo: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    middle: {
        display: "flex",
        flexDirection: "column"
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    icon: {
        marginHorizontal: 3
    },
    image: {
        width: 70,
        height: 70,
        marginRight: 5
    }
})