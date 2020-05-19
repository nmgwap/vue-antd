/******************
 * 角色管理
 *****************/

// 导入请求公用方法
import {
    request
} from '../../utils/axiosFun';

export function fetchList(query) {
    return request('get', '/admin/role/page', query, "Y")
}

export function deptRoleList() {
    return request('get', '/admin/role/list', {})
}

export function getObj(id) {
    return request('get', '/admin/role/' + id, {})
}

export function addObj(obj) {
    return request('post', '/admin/role', obj)
}

export function putObj(obj) {
    return request('put', '/admin/role', obj)
}

export function delObj(id) {
    return request('delete', '/admin/role/' + id, {})
}

export function permissionUpd(roleId, menuIds) {
    return request('put', '/admin/role/menu', {
        roleId: roleId,
        menuIds: menuIds
    }, "Y")
}

export function fetchRoleTree(roleName) {
    return request('get', '/admin/menu/tree/' + roleName, {})
}