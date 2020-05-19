/**
 * axios 请求方法封转
 */

import axios from 'axios';


/**
 * axios 登录请求方法
 * @param：{string}     method          请求类型,必填
 * @param：{string}     url             请求地址,必填
 * @param：{string}     params          请求参数,必填
 * @param：{string}     variation       是否变异,非必填
 **/
const loginRequest = (method, url, params, variation = "F") => {
    if (variation == "F") {
        return axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic cGlnOnBpZw=='
            },
            data: params
        }).then(res => res.data);
    } else {
        return axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic cGlnOnBpZw=='
            },
            params: params
        }).then(res => res.data);
    }

};

/**
 * axios 通用公用方法
 * @param：{string}     method          请求类型,必填
 * @param：{string}     url             请求地址,必填
 * @param：{string}     params          请求参数,必填
 * @param：{string}     variation       是否变异,非必填
 **/
const request = (method, url, params, variation = "F") => {
    if (variation == "F") {
        return axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: params,
        }).then(res => res.data);
    } else {
        return axios({
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            params: params,
        }).then(res => res.data);
    }

};
// 导出方法
export {
    loginRequest,
    request
}