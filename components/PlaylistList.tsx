import {PlaylistCard, PlaylistCardProps} from "./PlaylistCard";
import {ScrollView, View} from "react-native";
import {useEffect, useState} from "react";
import {Playlist} from "../schemas";

const api = "http://raspberrypi.local:8000/"

function getPlaylistCardPropsFromPlaylists(playlists: Playlist[]) {
    return playlists.map(value => {
        return {
            'title': value.title,
            'selected': false,
            'songCount': value.songs.length,
            'thumbnail': api + "song/" + value.songs[Math.floor(Math.random() * value.songs.length)] + "/thumb"
        }
    })
}

export type PlaylistListProps = {
    playlists: Playlist[]
}

export function PlaylistList(props: PlaylistListProps) {
    console.log("rendering");

    let [playlists, setPlaylists] = useState<PlaylistCardProps[]>([])

    useEffect(() => {
        let fetchPlaylists = async () => {
            console.log("fetching playlists");
            let data = await fetch(api+"playlist")
            let json = await data.json() as Playlist[]
            setPlaylists(getPlaylistCardPropsFromPlaylists(json))
        }
        if (props.playlists.length == 0) {
            fetchPlaylists().catch(() => setPlaylists(getPlaylistCardPropsFromPlaylists(props.playlists)))
        } else {
            setPlaylists(getPlaylistCardPropsFromPlaylists(props.playlists))
        }

        return () => {}
    }, [])

    return <ScrollView>
        {
            playlists.map(playlist => {
        return <PlaylistCard {...playlist} key={playlist.title}/>
    })
        }
    </ScrollView>
}