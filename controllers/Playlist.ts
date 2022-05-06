import TrackPlayer, {State, Track} from "react-native-track-player";
import {Song} from "../schemas";
import {api} from "../constants/Api";


// Polyfill Promise.allSettled
Promise.allSettled = Promise.allSettled || ((promises: any) => Promise.all(
    promises.map((p: Promise<any>) => p
        .then(value => ({
            status: "fulfilled",
            value
        }))
        .catch(reason => ({
            status: "rejected",
            reason
        }))
    )
));

type playlistInfoType = {
    title?: string
    id?: number
    songs?: number[]
}

let playlistInfo: playlistInfoType = {}

export function updatePlaylist(props: playlistInfoType) {
    playlistInfo = props
    unbufferedSongs = []
    buffer = []
    TrackPlayer.removeUpcomingTracks()
    TrackPlayer.getState().then(state => {
        if (state == State.Stopped || state == State.None) {
            // todo: do this logic
            getNextSongs().then(songs => {
                return TrackPlayer.add(songs);
            }).then(() => TrackPlayer.play())
        }
    })
}

function getRandomSongs() {
    //  See superliminary's answer
    //  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    return playlistInfo?.songs
        ?.map(value => ({value, sort: Math.random()}))
        ?.sort((a, b) => a.sort - b.sort)
        ?.map(({value}) => value)
}

async function getSongInfo(id: number): Promise<Song> {
    let res = await fetch(api + "/song/" + id)
    if (res.status == 200) {
        let songInfo = await res.json()
        let thumbId = await (await fetch(api + "/song/" + id + "/thumb")).json()

        return {...songInfo, thumbId}
    } else {
        throw Error("Status was " + res.status)
    }
}

function songToTrack(song: Song): Track {
    return {
        id: song.id,
        url: api + "/song/" + song.id + "/src",
        title: song.title,
        artist: song.artist == null ? "" : song.artist.title,
        album: song.album == null ? "" : song.album.title,
        duration: song.duration,
        artwork: api + "/thumb/" + song.thumbId
    }
}

let unbufferedSongs: number[] = []
let buffer: Track[] = []

export async function getNextSongs(): Promise<Track[]> {
    const infoBuffer = 10
    let response: Track[] | undefined = undefined;

    if (unbufferedSongs.length == 0) {
        unbufferedSongs = getRandomSongs() ?? []
    }

    if (buffer.length >= infoBuffer) {
        response = buffer.splice(0, infoBuffer)
    }
    let numToAdd = (infoBuffer * 2) - buffer.length
    if (numToAdd > unbufferedSongs.length) {
        numToAdd = unbufferedSongs.length
    }

    if (numToAdd > 0) {
        let newIds = unbufferedSongs.splice(0, numToAdd)
        let newSongs: Track[] = (await Promise.allSettled(newIds.map(id => getSongInfo(id))))
            .map(settled => settled.status == "fulfilled" ? songToTrack(settled.value) : false)
            .filter((value): value is Track => value != false)

        buffer.push(...newSongs)

    }

    if (response == undefined) {
        response = buffer.splice(0, infoBuffer)
    }
    return response
}

export {playlistInfo}