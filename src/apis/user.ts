import request from "@/utils"

//用户登录状态
interface LoginInfo {
  profile: object
  data: {
    profile: object
  }
}
export const loginStatusAPI = (): Promise<LoginInfo> => {
  return request({
    url: "/login/status",
  })
}
//获取扫码登录的key
export const getQrKeyAPI = () => {
  return request({
    url: `/login/qr/key`,
  })
}
//使用key来获取一个登录二维码图片
export const getQrImgAPI = (key: string) => {
  return request({
    url: `/login/qr/create?key=${key}`,
  })
}
//检查二维码扫描状态（需要轮询）
interface QrStatus {
  cookie: string
  code: number
}
export const checkQrStatusAPI = (key: string): Promise<QrStatus> => {
  return request({
    url: `/login/qr/check?key=${key}`,
  })
}
//获取用户歌单信息
interface PlayList {
  playlist: []
}
export const getUserPlayListAPI = (id: string): Promise<PlayList> => {
  return request({
    url: `/user/playlist?uid=${id}`,
  })
}
//退出登录
export const outLoginAPI = () => {
  return request({
    url: "/logout",
  })
}

// //获取用户粉丝列表
// interface Follow {
//   followeds: []
//   follow: []
// }
// export const getFollowedsAPI = (uid): Promise<Follow> => {
//   return request({
//     url: `/user/followeds?uid=${uid}`,
//   })
// }
// //获取用户关注列表
// export const getFollowsAPI = (uid): Promise<Follow> => {
//   return request({
//     url: `/user/follows?uid=${uid}`,
//   })
// }
//获取用户详情
export interface UserDetail {
  level: number
  profile: {
    nickname: string
    followed: boolean
    avatarUrl: string
    followeds: number
    follows: number
    gender: number
    signature: string
  }
}
export const getUserDetailAPI = (uid): Promise<UserDetail> => {
  return request({
    url: `/user/detail?uid=${uid}`,
  })
}
