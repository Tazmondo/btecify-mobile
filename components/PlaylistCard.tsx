import {Image, StyleSheet, Text, View} from 'react-native'
import {PlayFillSVG} from './Icon'
import {MonoText} from "./StyledText";

type PlaylistCardProps = {
    title: string
    thumbnail: string
    songCount: number
    selected: boolean
}

export function PlaylistCard(props: PlaylistCardProps) {
    return (
        <View style={styles.container}>
            <Image source={{uri: props.thumbnail}} style={styles.image} resizeMode={"cover"}/>
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
        borderColor: "red",
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        borderRadius: 20,
        padding: 15
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
    }
})