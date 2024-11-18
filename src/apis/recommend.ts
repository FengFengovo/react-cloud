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
interface PlayList{
    playlist:any
}
export function getListInfo (id):Promise<PlayList>  {
    return request({
        url:`/playlist/detail?id=${id}`
    })
}
interface PlayList{
    songs:[]
}
export function getPlayListAPI (id):Promise<PlayList>  {
    return request({
        url:`/playlist/track/all?id=${id}`
    })
}