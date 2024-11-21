import request from "@/utils";
//喜欢音乐接口
export const likeSongAPI = (id: string, like?: boolean) => {
    const baseUrl = `/like?id=${id}`;
    const url = like !== undefined ? `${baseUrl}&like=${like}` : baseUrl;
    return request({
        url
    });
};
interface LikeList {
    ids:[];
}
//获取喜欢音乐列表接口
export const getLikeListAPI = (id: string):Promise<LikeList> => {
    return request({
        url: `/likelist?id=${id}`
    })
}
//获取音乐url
interface MusicUrl {
    data:{
        url:string,
    }
}
export const getMusicUrlAPI = (id: string):Promise<MusicUrl> => {
    return request({
        url: `/song/url/v1?id=${id}&level=exhigh`
    })
}
interface MusicInfo {
    songs:[
        {
            al:{
                name:string,
                picUrl:string
            },
            ar:[
                {
                    name:string,
                }
            ]
        }
    ],

}
//获取音乐详情
export const getMusicInfoAPI = (id: string):Promise<MusicInfo> => {
    return request({
        url: `/song/detail?ids=${id}`
    })
}
//获取歌词
interface Lyric {
    //逐字歌词
    yrc:{
        lyric:string
    },
    //逐行歌词
    lrc?:{
        lyric:string
    }
}
export const getLyricAPI = (id: string):Promise<Lyric> => {
    return request({
        url: `/lyric/new?id=${id}`
    })
}
//最近播放歌曲

export const getRecentlyPlayedAPI = () => {
    return request({
        url: `/record/recent/song?limit=100`
    })
}