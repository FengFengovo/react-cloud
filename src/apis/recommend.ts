import request from "@/utils/index";

export function getResourceAPI()  {
    return request({
        url:'/recommend/resource',
    })
}
export function getDailySongsAPI()  {
    return request({
        url:'/recommend/songs',
    })
}
export function getPlayListAPI(id)  {
    return request({
        url:`/playlist/detail?id=${id}`
    })
}