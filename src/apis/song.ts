import request from "@/utils"
//喜欢音乐接口
export const likeSongAPI = (id: string, like?: boolean) => {
  const baseUrl = `/like?id=${id}`
  const url = like !== undefined ? `${baseUrl}&like=${like}` : baseUrl
  return request({
    url,
  })
}
interface LikeList {
  ids: string[]
}
//获取喜欢音乐列表接口
export const getLikeListAPI = (id: string): Promise<LikeList> => {
  return request({
    url: `/likelist?id=${id}`,
  })
}
//获取音乐url
interface MusicUrl {
  data: {
    url: string
  }
}
export const getMusicUrlAPI = (id: string): Promise<MusicUrl> => {
  return request({
    url: `/song/url/v1?id=${id}&level=exhigh`,
  })
}
interface MusicInfo {
  songs: [
    {
      al: {
        name: string
        picUrl: string
      }
      ar: [
        {
          name: string
        },
      ]
    },
  ]
}
//获取音乐详情
export const getMusicInfoAPI = (id: string): Promise<MusicInfo> => {
  return request({
    url: `/song/detail?ids=${id}`,
  })
}
//获取歌词
interface Lyric {
  //逐字歌词
  yrc: {
    lyric: string
  }
  //逐行歌词
  lrc?: {
    lyric: string
  }
}
export const getLyricAPI = (id: string): Promise<Lyric> => {
  return request({
    url: `/lyric/new?id=${id}`,
  })
}
//最近播放歌曲
export const getRecentlyPlayedAPI = () => {
  return request({
    url: `/record/recent/song?limit=100`,
  })
}
//获取歌曲评论
interface CommentList {
  data: {
    comments: [
      user: {
        nickname: string
        avatarUrl: string
        liked: boolean
      },
      commentId: string,
      content: string,
      timeStr: string,
      likedCount: number,
    ]
    cursor: string
    liked: boolean
    hasMore: boolean
  }
}
//获取热门评论接口
export const getCommentByMusicIDAPI = (id): Promise<CommentList> => {
  return request({
    url: `/comment/new?type=0&id=${id}&sortType=2&pageSize=5`,
  })
}
//获取最近评论接口
export const getRecentlyCommentAPI = (
  id,
  page,
  cursor,
): Promise<CommentList> => {
  return request({
    url: `/comment/new?type=0&id=${id}&sortType=3&cursor=${cursor}&pageNo=${page}&pageSize=20`,
  })
}
//给评论点赞
export const likeCommentAPI = (songId, cid, status) => {
  return request({
    url: `/comment/like?id=${songId}&cid=${cid}&t=${status}&type=0`,
  })
}
