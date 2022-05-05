import TrackPlayer, {Track} from "react-native-track-player";
import {Song} from "../schemas";
import {api} from "../constants/Api";

let isPlaying = false

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

    if (!isPlaying) {
        isPlaying = true
        getNextSongs().then(songs => {
            console.log("songs", songs);
            return TrackPlayer.add(songs);
        })
            .then(() => TrackPlayer.play())
    }
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
        return await res.json()
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
        duration: song.duration
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
    console.log(infoBuffer, buffer.length)
    let numToAdd = (infoBuffer * 2) - buffer.length
    if (numToAdd > unbufferedSongs.length) {
        console.log("reducing");
        numToAdd = unbufferedSongs.length
    }
    console.log(numToAdd);
    if (numToAdd > 0) {
        console.log("adding");
        let newIds = unbufferedSongs.splice(0, numToAdd)
        let newSongs: Track[] = (await Promise.allSettled(newIds.map(id => getSongInfo(id))))
            .map(settled => settled.status == "fulfilled" ? songToTrack(settled.value) : false)
            .filter((value): value is Track => value != false)

        buffer.push(...newSongs)

    }

    if (response == undefined) {
        response = buffer.splice(0, infoBuffer)
    }
    console.log("a response", response.length, buffer.length, unbufferedSongs.length);
    return response
}

export {playlistInfo}