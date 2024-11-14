import {getDailySongsAPI, getPlayListAPI} from "@/apis/recommend.ts";
import {useEffect, useState} from "react";

function useGetList(id?) {
    const [info,setInfo] = useState<Array<any>>();
    const [playList, setPlayList] = useState([]);
    useEffect(() => {
        const getDailyList = async () => {
            const res = await getDailySongsAPI()
            setPlayList(res?.data?.dailySongs)
        }
        const getListByID = async () => {
            const res = await getPlayListAPI(id)
            setInfo(res.playlist)
            setPlayList(res.playlist.tracks)
        }
        if (id) {
            getListByID()
        }else{
            getDailyList()
        }

    }, [id])
    return {
        playList,
        info
    }
}

export default useGetList