/******************
 * 用户管理
 *****************/

// 导入请求公用方法
import {
    request
} from '../../utils/axiosFun';

export const fetchList = (query) => {
    return request('get', '/admin/user/page', query, "Y")
}

export const addObj = (obj) => {
    return request('post', '/admin/user', obj)
}

export const getObj = (id) => {
    return request('get', '/admin/user/' + id, {})
}

export const delObj = (id) => {
    return request('delete', '/admin/user/' + id, {})
}

export const putObj = (obj) => {
    return request('put', '/admin/user', obj)
}

export const getDetails = (obj) => {
    return request('get', '/admin/user/details/' + obj, {})
}