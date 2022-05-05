import {Image, Pressable, StyleSheet, View} from 'react-native'
import {PlayFillSVG} from './Icon'
import {MonoText} from "./StyledText";
import {useEffect, useState} from "react";
import {api} from '../constants/Api'
import {updatePlaylist} from '../controllers/Playlist'

export type PlaylistCardProps = {
    title: string
    thumbnail: string
    songs: number[]
    selected: boolean
    id: number
}

export function PlaylistCard(props: PlaylistCardProps) {
    const [thumburl, setThumburl] = useState<string>("")

    useEffect(() => {
        let fetchThumb = async () => {
            let response = await fetch(props.thumbnail)
            if (response.status == 200) {
                let thumbId = await response.json()
                setThumburl(api + "/thumb/" + thumbId)
            } else {
                // todo: add a placeholder image
            }
        }
        fetchThumb()
    }, [])

    function play() {
        updatePlaylist({title: props.title, songs: props.songs, id: props.id})
        console.log("Playing " + props.title)
    }

    return (
        <View style={styles.container}>
            <Image source={thumburl === "" ? {} : {uri: thumburl}} style={styles.image} resizeMode={"cover"}/>
            <View style={styles.trackInfo}>
                <MonoText>{props.title}</MonoText>
                <MonoText>{props.songs.length} {props.songs.length === 1 ? "song" : "songs"}</MonoText>
                <Pressable onPress={play} style={({pressed}) => pressed ? styles.svgbutton : {}}>
                    <PlayFillSVG color={"#00c200"} width={35} height={35}/>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#262626",
        borderColor: "#247e0b",
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        borderRadius: 20,
        padding: 15,
        marginTop: 10,
        flex: 1,
        justifyContent: "flex-start"
        // width: "max-content"
    },
    image: {
        width: 95,
        height: 95,
        marginRight: 10
    },
    trackInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1
    },
    svgbutton: {
        opacity: 0.8,
        transform: [{scale: 1.1}]
    }
})