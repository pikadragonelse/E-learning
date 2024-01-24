export interface VideoWatching {
    episodeId?: number | string;
    played: number;
    playedSeconds: number;
    loadedSeconds: number;
    durationDefault?: number;
}
