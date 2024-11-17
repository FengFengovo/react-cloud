import {getDailySongsAPI, getListInfo, getPlayListAPI} from "@/apis/recommend.ts";
import {useEffect, useState} from "react";
import {getRecentlyPlayedAPI} from "@/apis/song.ts";

interface Info {
    coverImgUrl: string,
    name:string,
    description:string,
    creator:{
        avatarUrl:string,
        nickname:string
    },
    createTime:string
}
function useGetList(id?) {
    const [info,setInfo] = useState<Info>();
    const [playList, setPlayList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(() => {
        setPlayList(null)
        setIsLoading(true)
        //获取每日推荐列表
        const getDailyList = async () => {
            try {
                const res = await getDailySongsAPI()
                setPlayList(res?.data?.dailySongs)
            }catch (e){
                console.log(e)
            }finally {
                setIsLoading(false);
            }

        }
        //根据id获取列表
        const getListByID = async () => {
            try {
                const info = await getListInfo(id)
                setInfo(info.playlist)
                const list = await  getPlayListAPI(id)
                setPlayList(list.songs)
            }catch (e){
                console.log(e)
            }finally {
                setIsLoading(false);
            }

        }
        //获取最近播放列表
        const getRecentlyList =async ()=>{
            try {
                const res = await getRecentlyPlayedAPI();
                const recentlyList =  res.data.list.map(item=>{
                    return item.data
                })
                setPlayList(recentlyList)
            }catch (e){
                console.log(e)
            }finally {
                setIsLoading(false);
            }


        }
        if (location.pathname==='/recently'){
            getRecentlyList()
        }
        else if (id) {
            getListByID()
        }else{
            getDailyList()
        }

    }, [id])
    return {
        playList,
        info,
        isLoading
    }
}

export default useGetList