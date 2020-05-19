/******************
 * 代码生成
 *****************/

// 导入请求公用方法
import {
    request
} from '../../utils/axiosFun';
// 针对文件下载引入axios
import axios from 'axios';

export const fetchList = (query) => {
    return request('get', '/gen/generator/page', query, "Y")
}

export const handleDown = (table) => {
    return axios({
        url: '/gen/generator/code',
        method: 'post',
        data: table,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        responseType: 'arraybuffer'
    }).then((response) => { // 处理返回的文件流
        let blob = new Blob([response.data], {
            type: 'application/zip'
        })
        let filename = table.tableName + '.zip'
        let link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = filename
        document.body.appendChild(link)
        link.click()
        window.setTimeout(function () {
            URL.revokeObjectURL(blob)
            document.body.removeChild(link)
        }, 0)
    })
}