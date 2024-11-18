import request from "@/utils";

//搜索默认关键词
interface DefaultKey {
    data: {
        showKeyword: string,
        styleKeyword: {
            keyWord: string,
            descWord: string
        },
        realkeyword: string
    }
}

export const getDefaultKeyAPI = (): Promise<DefaultKey> => {
    return request({
        url: '/search/default'
    })
}

//热搜关键词
interface HotKey {
    data: [
        {
            searchWord: string,
        }
    ]
}

export const getHotKeyAPI = (): Promise<HotKey> => {
    return request({
        url: '/search/hot/detail'
    })
}

//搜索关键词建议
interface KeySuggest {
    result: {
        songs: [
            {
                name: string,
                id:string
            }
        ]
    }
}
export const getKeySuggestAPI = (key:string):Promise<KeySuggest> => {
    return request({
        url:`/search/suggest?keywords=${key}`
    })
}
//根据关键词搜索音乐
interface MusicByKey {
    result: {
        songs:[
            {
                id:string,
                name:string,
                artists:[
                    {
                        id:string,
                        name:string
                    }
                ],
                album:{
                    id:string,
                    name:string,
                },
                duration:string
            }
        ]
    }
}
export const getMusicByKeyAPI =(key:string):Promise<MusicByKey>=>{
    return request({
        url:`/search?keywords=${key}`
    })
}
