/******************
 * 部门管理
 *****************/

// 导入请求公用方法
import {
    request
} from '../../utils/axiosFun';

export function fetchDeptTree(query) {
    return request('get', '/admin/dept/user-tree', query, "Y")
}

export function fetchTree(query) {
    return request('get', '/admin/dept/tree', query, "Y")
}

export function addObj(obj) {
    return request('post', '/admin/dept', obj)
}

export function getdept(id) {
    return request('get', '/admin/dept/' + id, {})
}

export function delObj(id) {
    return request('delete', '/admin/dept/' + id, {})
}

export function putObj(obj) {
    return request('put', '/admin/dept', obj)
}

// 保存角色与部门对应关系
export function saveRoledept(obj) {
    return request('post', '/admin/roledept', obj)
}

// 通过角色ID查询部门ID列表
export function getRoledept(roleId) {
    return request('get', '/admin/roledept/' + roleId, {})
}