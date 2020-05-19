/******************
 * 菜单管理
 *****************/

// 导入请求公用方法
import {
    request
} from '../../utils/axiosFun';

export function GetMenu() {
    return request('get', '/admin/menu', {})
}

export function fetchMenuTree(query) {
    return request('get', '/admin/menu/tree', query, "Y")
}

export function addObj(obj) {
    return request('post', '/admin/menu', obj)
}

export function getObj(id) {
    return request('get', '/admin/menu/' + id, {})
}

export function delObj(id) {
    return request('delete', '/admin/menu/' + id, {})
}

export function putObj(obj) {
    return request('put', '/admin/menu', obj)
}
