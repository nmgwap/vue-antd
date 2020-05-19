/******************
 * 终端管理
 *****************/

// 导入请求公用方法
import {
    request
} from '../../utils/axiosFun';

export const fetchList = (query) => {
    return request('get', '/admin/client/page', query, "Y")
}

export const delObj = (id) => {
    return request('delete', '/admin/client/' + id, {})
}

export const addObj = (obj) => {
    return request('post', '/admin/client', obj)
}

export const getObj = (id) => {
    return request('get', '/admin/client/' + id, {})
}

export const putObj = (obj) => {
    return request('put', '/admin/client', obj)
}