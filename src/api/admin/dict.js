/******************
 * 字典管理
 *****************/

// 导入请求公用方法
import {
    request
} from '../../utils/axiosFun';

export const fetchList = (query) => {
    return request('get', '/admin/dict/page', query, "Y")
}

export const addObj = (obj) => {
    return request('post', '/admin/dict', obj)
}

export const getObj = (id) => {
    return request('get', '/admin/dict/' + id, {})
}

export const delObj = (row) => {
    return request('delete', '/admin/dict/' + row.id + '/' + row.type, {})
}

export const putObj = (obj) => {
    return request('put', '/admin/dict', obj)
}

export const remote = (type) => {
    return request('get', '/admin/dict/type/' + type, {})
}