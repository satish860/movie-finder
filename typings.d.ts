export interface Movie{
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
    backdrop_path: string;
    popularity: number;
    video: boolean;
    genre_ids: number[];
}


export interface Genre{
    id: number;
    name: string;
}