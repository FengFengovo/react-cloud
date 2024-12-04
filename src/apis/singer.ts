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
