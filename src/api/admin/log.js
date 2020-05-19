/******************
 * 日志管理
 *****************/

// 导入请求公用方法
import {
    request
} from '../../utils/axiosFun';

export const fetchList = (query) => {
    return request('get', '/admin/log/page', query, "Y")
}

export const delObj = (id) => {
    return request('delete', '/admin/log/' + id, {})
}

export const addObj = (obj) => {
    return request('post', '/admin/log', obj)
}

export const getObj = (id) => {
    return request('get', '/admin/log/' + id, {})
}

export const putObj = (obj) => {
    return request('put', '/admin/log', obj)
}