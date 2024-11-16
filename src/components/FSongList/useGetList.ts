import {getDailySongsAPI, getListInfo, getPlayListAPI} from "@/apis/recommend.ts";
import {useEffect, useState} from "react";

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

    useEffect(() => {
        const getDailyList = async () => {
            const res = await getDailySongsAPI()
            setPlayList(res?.data?.dailySongs)
        }
        const getListByID = async () => {
            const info = await getListInfo(id)
            setInfo(info.playlist)
            const list = await  getPlayListAPI(id)
            setPlayList(list.songs)
        }
        if (id) {
            getListByID()
        }else{
            getDailyList()
        }

    }, [id])
    return {
        playList,
        info,
    }
}

export default useGetList