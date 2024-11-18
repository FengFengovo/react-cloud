import {getDailySongsAPI, getListInfo, getPlayListAPI} from "@/apis/recommend.ts";
import {useEffect, useState} from "react";
import {getRecentlyPlayedAPI} from "@/apis/song.ts";
import {getMusicByKeyAPI} from "@/apis/search.ts";
import {useLocation, useSearchParams} from "react-router-dom";

interface Info {
    coverImgUrl: string,
    name: string,
    description: string,
    creator: {
        avatarUrl: string,
        nickname: string
    },
    createTime: string
}

function useGetList() {
    const [searchParams]= useSearchParams()
    //从路由参数中提取出关键字
    const key = searchParams.get('key');
    const id = searchParams.get('id');
    const location = useLocation();
    const [info, setInfo] = useState<Info>();
    const [playList, setPlayList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setPlayList(null)
        setIsLoading(true)
        //获取每日推荐列表
        const getDailyList = async () => {
            try {
                const res = await getDailySongsAPI()
                setPlayList(res?.data?.dailySongs)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false);
            }
        }
        //根据id获取列表
        const getListByID = async () => {
            try {
                const info = await getListInfo(id)
                setInfo(info.playlist)
                const list = await getPlayListAPI(id)
                setPlayList(list.songs)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false);
            }
        }
        //获取最近播放列表
        const getRecentlyList = async () => {
            try {
                const res = await getRecentlyPlayedAPI();
                const recentlyList = res.data.list.map(item => {
                    return item.data
                })
                setPlayList(recentlyList)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false);
            }
        }
        //根据关键词搜索音乐
        const getMusicByKey = async (key: string) => {
            try {
                const res = await getMusicByKeyAPI(key);
                const formattedSongs = res.result.songs.map(song => ({
                    id: song.id,
                    name: song.name,
                    ar: song.artists.map(artist => ({
                        id: artist.id,
                        name: artist.name
                    })),
                    al: {
                        id: song.album.id,
                        name: song.album.name
                    },
                    dt: song.duration,
                }));
                setPlayList(formattedSongs);
            } catch (e) {
                console.error('搜索失败:', e);
                setPlayList([]);
            } finally {
                setIsLoading(false);
            }
        };
        if (location.pathname === '/search' &&key) {
            console.log('执行search');
            getMusicByKey(key);
        }
        if (location.pathname === '/recently') {
            getRecentlyList()
        }
        if (id) {
            getListByID()
        }
        if (location.pathname === '/dailySongs') {
            console.log('执行每日')
            getDailyList()
        }
    }, [id,key])
    return {
        playList,
        info,
        isLoading
    }
}


export default useGetList