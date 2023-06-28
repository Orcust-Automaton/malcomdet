export interface TiebaThread {
    "view": number,
    "tid": number,
    "name": string
}

export interface TiebaComment {
    "floor": number,
    "reply": number,
    "user": string,
    "text": string,
    "attack":string,
    "feature":string
}