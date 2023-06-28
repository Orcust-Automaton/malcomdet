import http from '@/utils/http'
import { prefix } from '../config'
import type {TiebaThread , TiebaComment} from './type'


export function getBar() {
    return http.get<ApiRes<ApiListData<String[]>>>(`${prefix}/api/tieba/bar/`)
}

export function getThread(params: { name: string ,num: number }) {
    return http.post<ApiRes<ApiListData<TiebaThread[]>>>(`${prefix}/api/tieba/top/` , params)
}

export function getConments(params: { tid: number ,num: number }) {
    return http.post<ApiRes<ApiListData<TiebaComment[]>>>(`${prefix}/api/tieba/comments/` , params)
}
