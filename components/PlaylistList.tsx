import {PlaylistCard, PlaylistCardProps} from "./PlaylistCard";
import {ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {Playlist} from "../schemas";
import {api} from '../constants/Api'


function apiToCardProps(playlists: Playlist[]) {
    return playlists.map(value => {
        return {
            'title': value.title,
            'selected': false,
            'songCount': value.songs.length,
            'thumbnail': api + "/song/" + value.songs[Math.floor(Math.random() * value.songs.length)] + "/thumb"
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
            let data = await fetch(api + "/playlist")
            let json = await data.json() as Playlist[]
            setPlaylists(apiToCardProps(json))
        }
        if (props.playlists.length == 0) {
            fetchPlaylists().catch(() => setPlaylists([]))
        } else {
            setPlaylists(apiToCardProps(props.playlists))
        }
    }, [])

    return <ScrollView>
        {
            playlists.map(playlist => {
        return <PlaylistCard {...playlist} key={playlist.title}/>
    })
        }
    </ScrollView>
}