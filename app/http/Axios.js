/*
 * @Author: Lsfern
 * @Date: 2019-08-10 21:48:11
 * @LastEditors: Lsfern
 * @LastEditTime: 2019-08-10 22:23:09
 * @Description: 网络请求
 */
import Axios from 'axios';

const _Axios = Axios.create({
    baseURL: "", // baseUrl
    timeout: 10000, // 超时时间
    withCredentials: true, // 允许携带请求头
    responseType: 'json', // 服务器响应的数据类型
    headers: {
        // 请求头
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
});

// 网络请求前处理
_Axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error.data.message);
    }
);

// 网络返回处理
_Axios.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        return Promise.reject(error);
    }
);

const axios = {
    get: async (url, params, config) => {
        return _Axios({
                method: 'get',
                url: url,
                params,
                // data: encodeQuery(params),
                ...config
            })
            .then(data => {
                // console.log(data);
                return data;
            })
            .catch(error => {
                detailError(error);
            });
    },
    post: async (url, params, config) => {
        return _Axios({
                method: 'post',
                url: url,
                data: params,
                ...config
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                detailError(error);
            });
    }
};

/**
 * 处理错误
 * @param {Object} error
 */
const detailError = (error) => {
    // 请求超时
    if (error.code === 'ECONNABORTED' && error.request._response === 'timeout') {
        // 超时处理
        return;
    }

    if (error.response) {
        return error.response.data;
    }
    throw error;
};
export {
    axios
};
