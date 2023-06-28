import http from '@/utils/http'
import { prefix } from '../config'
import type { Comment,CommentRes } from './type'

/** @desc 获取评论列表 */

export function getCommentList(params: { current: number ,pageSize: number ,text:string,attack:number}) {
    return http.post<ApiRes<ApiListData<Comment[]>>>(`${prefix}/api/comment/list/` , params)
}

export function getCommentCount() {
    return http.get<ApiRes<CommentRes>>(`${prefix}/api/comment/count/`)
}

export function updateComment(params: { type: number , text: string , attack:number }) {
    return http.post<ApiRes<CommentRes>>(`${prefix}/api/comment/update/` , params)
}

export function deleteComment(params: { idx: number  } ) {
    return http.post<ApiRes<CommentRes>>(`${prefix}/api/comment/delete/`,params)
}

export function addComment(params: { data: string[][] , type:number  } ) {
    return http.post<ApiRes<CommentRes>>(`${prefix}/api/comment/add/`,params)
}