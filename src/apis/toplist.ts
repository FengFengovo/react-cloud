import request from "@/utils"
//获取所有榜单内容摘要
export interface TopDetail {
  list: [
    tracks: [
      {
        first: string
        second: string
      },
    ],
    updateFrequency: string,
    coverImgUrl: string,
    name: string,
  ]
}
export const getTopDetailAPI = (): Promise<TopDetail> => {
  return request({
    url: "/toplist/detail",
  })
}
