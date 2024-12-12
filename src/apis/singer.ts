import request from "@/utils"
//歌手分类列表
interface ArtistList {
  artists: [
    {
      id: string
      name: string
      picUrl: string
      musicSize: number
    },
  ]
}
export const getArtistListAPI = (
  type,
  region,
  initial,
  offset,
): Promise<ArtistList> => {
  return request({
    url: `artist/list?type=${type}&area=${region}&initial=${initial}&limit=30&offset=${offset}`,
  })
}
//获取歌手所有音乐
interface AllSongsBySinger {
  songs: any[]
}
export const getAllSongsBySingerIdAPI = (id): Promise<AllSongsBySinger> => {
  return request({
    url: `/artist/songs?id=${id}`,
  })
}
//收藏/取消收藏歌手
export const followSingerAPI = (id: string, status: number) => {
  return request({
    url: `/artist/sub?id=${id}&t=${status}`,
  })
}
