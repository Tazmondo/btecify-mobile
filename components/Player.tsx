import {MonoText} from "./StyledText";
import {View} from "./Themed";
import {Image, Pressable, StyleSheet} from "react-native";
import {useState} from "react";

import TrackPlayer, {Event, useTrackPlayerEvents} from "react-native-track-player";
import {PauseSVG, PlaySVG, SkipSVG} from "./Icon";

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

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        if (event.type == Event.PlaybackTrackChanged) {
            console.log("track changed", event.track, event.position, event.nextTrack)
            console.log(await TrackPlayer.getTrack(0))
            await TrackPlayer.play()
        }
    })

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
            <Image source={imageUrl != "" ? {uri: imageUrl} : {}} width={100} height={100}></Image>

            <View style={styles.trackInfo}>
                <MonoText>{title}</MonoText>
                <MonoText>{artist}</MonoText>
            </View>

            <View style={styles.middle}>
                <MonoText>{playlist}</MonoText>
            </View>

            <View style={styles.buttons}>
                <Pressable style={styles.icon}>
                    {paused ? <PlaySVG {...iconProps}></PlaySVG> : <PauseSVG {...iconProps}></PauseSVG>}
                </Pressable>
                <Pressable style={styles.icon}>
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
    }
})