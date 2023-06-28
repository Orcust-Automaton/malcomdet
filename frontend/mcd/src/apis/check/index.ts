import http from '@/utils/http'
import { prefix } from '../config'
import type { CheckArg } from './type'

export function checkText(params: { text: string , length:number }) {
    return http.post<ApiRes<CheckArg>>(`${prefix}/api/textcheck/` , params)
}

export function checkTexts(params: { texts: string[] }) {
    return http.post<ApiRes<ApiListData<CheckArg[]>>>(`${prefix}/api/textscheck/` , params)
}