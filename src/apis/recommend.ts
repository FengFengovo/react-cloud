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
//排行榜
export interface ExampleGenerate {
  code: number
  list: List[]
  artistToplist: ArtistToplist
}

export interface ArtistToplist {
  coverUrl: string
  name: string
  upateFrequency: string
  position: number
  updateFrequency: string
}

export interface List {
  subscribers: any[]
  subscribed: null
  creator: null
  artists: null
  tracks: null
  updateFrequency: string
  backgroundCoverId: number
  backgroundCoverUrl: null
  titleImage: number
  coverText: null
  titleImageUrl: null
  coverImageUrl: null
  iconImageUrl: null
  englishTitle: null
  opRecommend: boolean
  recommendInfo: null
  socialPlaylistCover: null
  tsSongCount: number
  algType: null
  originalCoverId: number
  topTrackIds: null
  playlistType: PlaylistType
  uiPlaylistType: null
  specialType: number
  highQuality: boolean
  coverImgId: number
  newImported: boolean
  anonimous: boolean
  updateTime: number
  coverImgUrl: string
  trackCount: number
  commentThreadId: string
  trackUpdateTime: number
  totalDuration: number
  playCount: number
  trackNumberUpdateTime: number
  privacy: number
  adType: number
  subscribedCount: number
  cloudTrackCount: number
  createTime: number
  ordered: boolean
  description: null | string
  status: number
  tags: string[]
  userId: number
  name: string
  id: number
  coverImgId_str: string
  ToplistType?: string
}

export enum PlaylistType {
  Ugc = "UGC",
}

export function getRankingListAPI(): Promise<ExampleGenerate> {
  return request("/toplist")
}

// 歌手榜
export interface ArtistToplistResponse {
  code: number
  list: {
    artists: Artist[]
    updateTime: number
    type: number
  }
  updateTime: number
}

export interface Artist {
  id: number
  name: string
  picUrl: string
  alias: string[]
  albumSize: number
  picId: number
  img1v1Url: string
  img1v1: number
  trans: string
  musicSize: number
  topicPerson: number
  followed: boolean
  score: number
  lastRank: number
}

export function getArtistToplistAPI(
  type: number = 1,
): Promise<ArtistToplistResponse> {
  return request({
    url: `/toplist/artist?type=${type}`,
  })
}
