import { Course } from "./course";

export interface ResSearch {
    took: number;
    timed_out: boolean;
    _shards: Shards;
    hits: Hits;
    aggregations: Aggregations;
}

export interface Shards {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
}

export interface Aggregations {
    language: Language;
    level: Level;
    price_ranges: Ranges;
    video_duration_ranges: Ranges;
    average_rating_ranges: Ranges;
}

export interface Ranges {
    buckets: AverageRatingRangesBucket[];
}

export interface AverageRatingRangesBucket {
    key: string;
    from: number;
    doc_count: number;
    to?: number;
}

export interface Language {
    doc_count: number;
    language_id: ID;
}

export interface ID {
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
    buckets: LanguageIDBucket[];
}

export interface LanguageIDBucket {
    key: number;
    doc_count: number;
}

export interface Level {
    doc_count: number;
    level_id: ID;
}

export interface Hits {
    total: Total;
    max_score: null;
    hits: Hit[];
}

export interface Hit {
    _index: string;
    _id: string;
    _score: null;
    _source: Course;
    highlight: Highlight;
    sort: number[];
}

export interface Category {
    id: number;
    name: string;
}

export interface Highlight {
    introduction: string[];
}

export interface Total {
    value: number;
    relation: string;
}
