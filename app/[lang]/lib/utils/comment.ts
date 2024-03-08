export interface CommentObject {
    id: string;
    avt: string;
    name: string;
    date: string;
    content: string;
    replies?: CommentObject[];
}
