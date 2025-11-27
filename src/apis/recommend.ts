import request from "@/utils/index"

//获取每日推荐歌单
interface Recommend {
  recommend: any[]
}
export function getResourceAPI(): Promise<Recommend> {
  return request({
    url: "/recommend/resource",
  })
}
//获取每日推荐歌曲
export function getDailySongsAPI() {
  return request({
    url: "/recommend/songs",
  })
}
interface PlayList {
  playlist: any
}
export function getListInfo(id): Promise<PlayList> {
  return request({
    url: `/playlist/detail?id=${id}`,
  })
}
interface PlayList {
  songs: []
}
export function getPlayListAPI(id): Promise<PlayList> {
  return request({
    url: `/playlist/track/all?id=${id}&limit=1000`,
  })
}
