//request.js
//进行axios二次封装 使用请求与响应拦截器
import axios from "axios";


//第一步，利用aixos对象的create方法 去创建axios示例（其他的配置:基础路径 ，超时的时间）
let request= axios.create({
    baseURL:'http://localhost:3000',
    withCredentials:true,
    timeout:3000
});
//第二步 ，request示例添加axios响应与请求拦截器
request.interceptors.request.use((config)=>{
    const timestamp = new Date().getTime();
    const url = config.url || '';

    // 判断 URL 是否已经有参数
    if (url.includes('?')) {
        // 已有参数，添加 &timestamp=
        config.url = `${url}&timestamp=${timestamp}`;
    } else {
        // 没有参数，添加 ?timestamp=
        config.url = `${url}?timestamp=${timestamp}`;
    }
    return config
})

//第三部：响应拦截器
request.interceptors.response.use((response)=>{
    //成功回调
    //简化数据
    return response.data
},error => {
    //失败回调，处理http网络错误
    //401 token失效处理
    //1.清除本地用户数据
    //2.跳转到登录页
    return Promise.reject(error);
})
export  default request