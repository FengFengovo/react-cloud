import request from "@/utils";

export const loginStatusAPI =()=> {
    return request({
        url:'/login/status'
    })
}
export const getQrKeyAPI =()=> {
    return request({
        url:`/login/qr/key`
    })
}
export const getQrImgAPI =(key:string)=> {
    return request({
        url:`/login/qr/create?key=${key}`,
    })
}
export const checkQrStatusAPI =(key:string)=> {
    return request({
        url:`/login/qr/check?key=${key}`
    })
}