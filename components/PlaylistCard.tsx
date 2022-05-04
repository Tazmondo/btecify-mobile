import {Image, StyleSheet, View} from 'react-native'
import {PlayFillSVG} from './Icon'
import {MonoText} from "./StyledText";
import {useEffect, useState} from "react";
import {api} from '../constants/Api'

export type PlaylistCardProps = {
    title: string
    thumbnail: string
    songCount: number
    selected: boolean
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

    return (
        <View style={styles.container}>
            <Image source={thumburl === "" ? {} : {uri: thumburl}} style={styles.image} resizeMode={"cover"}/>
            <View style={styles.container2}>
                <MonoText>{props.title}</MonoText>
                <MonoText>{props.songCount} {props.songCount === 1 ? "song" : "songs"}</MonoText>
                <PlayFillSVG color={"green"}/>
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
        flexGrow: 1,
        flexShrink: 0
        // width: "max-content"
    },
    image: {
        width: 95,
        height: 95,
        marginRight: 10
    },
    container2: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
    },
})