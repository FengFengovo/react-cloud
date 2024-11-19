import request from "@/utils";

//用户登录状态
interface LoginInfo {
    profile: object;
    data:{
        profile:object
    }

}
export const loginStatusAPI =():Promise<LoginInfo>=> {
    return request({
        url:'/login/status'
    })
}
//获取扫码登录的key
export const getQrKeyAPI =()=> {
    return request({
        url:`/login/qr/key`
    })
}
//使用key来获取一个登录二维码图片
export const getQrImgAPI =(key:string)=> {
    return request({
        url:`/login/qr/create?key=${key}`,
    })
}
//检查二维码扫描状态（需要轮询）
export const checkQrStatusAPI =(key:string)=> {
    return request({
        url:`/login/qr/check?key=${key}`
    })
}
//获取用户歌单信息
interface  PlayList{
    playlist:[]
}
export const getUserPlayListAPI =(id:string):Promise<PlayList>=> {
    return request({
        url:`/user/playlist?uid=${id}`,
    })
}
