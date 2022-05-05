export type Playlist = {
    id: number,
    songs: number[],
    title: string
}

export type SongPlaylist = {
    id: number
    title: string
    dateadded: string
}

export type Album = {
    id: number
    title: string
}

export type Artist = {
    id: number
    title: string
}

export type Song = {
    id: number
    title: string
    weburl: string
    disabled: boolean
    playlists: SongPlaylist[]
    duration: number
    album: Album | null
    artist: Artist | null
    extractor: string | null
}