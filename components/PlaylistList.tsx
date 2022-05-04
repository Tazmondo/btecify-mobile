import {PlaylistCard, PlaylistCardProps} from "./PlaylistCard";
import {ActivityIndicator, ScrollView} from "react-native";
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

    let [playlists, setPlaylists] = useState<PlaylistCardProps[] | undefined>()

    useEffect(() => {
        let fetchPlaylists = async () => {
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

    if (playlists == undefined) {
        return <ActivityIndicator size="large" color="#00ff00"></ActivityIndicator>
    } else {
        return <ScrollView>
            {
                playlists.map(playlist => {
                    return <PlaylistCard {...playlist} key={playlist.title}/>
                })
            }
        </ScrollView>
    }
}