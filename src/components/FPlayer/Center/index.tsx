import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from '@/store/hooks'
import {setIsPlaying} from "@/store/modules/playingStore.ts";
import {getLikeListAPI} from "@/apis/song.ts";
import usePlayingMusic from "@/hooks/usePlayingMusic.ts";
import classNames from "classnames";
import type {RootState} from "@/store";

const PlayerCenter = ({audioRef}) => {

    const isPlaying = useAppSelector(state => state.playing.isPlaying)
    const [loveStatus, setLoveStatus] = useState(true)

    const currentUrl = useAppSelector(state => state.playing.currentUrl);

    const songInfo = useAppSelector((state:RootState) => state.playing.songInfo);
    const dispatch = useAppDispatch();
    const {playNextMusic, playPrevMusic} = usePlayingMusic()
    // 监听 URL 变化，重置播放状态

    const userInfo = useAppSelector(state => state.user.userInfo)
    //判断是否喜欢音乐
    useEffect(() => {
        if (currentUrl) {
            dispatch(setIsPlaying(true)) // URL 变化时，重置为播放状态
        }
        const getLikeStatus = async () => {
            const res = await getLikeListAPI(userInfo?.userId)
            if (res?.ids?.includes(songInfo?.id)) {
                setLoveStatus(true)
            } else {
                setLoveStatus(false)
            }
        }
        getLikeStatus()
    }, [currentUrl, loveStatus]);
    const changePlayerStatus = () => {
        //确保获取到audio
        if (audioRef.current) {
            //如果正在播放 则暂停
            if (isPlaying) {
                audioRef.current.pause();
                dispatch(setIsPlaying(!isPlaying))
            }
            //未播放 并且audio 有音乐url
            else if (currentUrl !== '') {
                audioRef.current.play().catch(err => {
                    console.error('播放失败:', err);
                });
                dispatch(setIsPlaying(!isPlaying))
            }

        }
    }
    const next = () => {
        //播放下一首
        playNextMusic()

    }
    const Prev = () => {
        //播放上一首
        playPrevMusic()
    }
    return (
        <div className="flex items-center">
            <i className="iconfont text-25px mx-40px text-white hover:text-[#fa3d49] transition-all duration-300 hover:scale-110 cursor-pointer">&#xe68c;</i>
            <i className="iconfont text-30px text-white hover:text-[#fa3d49] transition-all duration-300 hover:scale-110 cursor-pointer"
               onClick={Prev}>&#xe63c;</i>
            <i
                className="iconfont text-35px mx-40px text-white hover:text-[#fa3d49] transition-all duration-300 hover:scale-110 cursor-pointer "
                onClick={changePlayerStatus}
            >
                {isPlaying ? '\ue63b' : '\ue63a'}
            </i>
            <i className="iconfont text-30px text-white hover:text-[#fa3d49] transition-all duration-300 hover:scale-110 cursor-pointer"
               onClick={next}>&#xe63e;</i>
            <i
                className={classNames('iconfont text-25px mx-40px text-gray-1 hover:text-[#fa3d49] transition-all duration-300 hover:scale-110 cursor-pointer',{'text-red-5':loveStatus})}
                // className="iconfont text-25px mx-40px text-white hover:text-[#fa3d49] transition-all duration-300 hover:scale-110 cursor-pointer"
                onClick={() => setLoveStatus(!loveStatus)}
            >
                {loveStatus ? '\ue8c3' : '\ue8ab'}
            </i>
        </div>
    )
}
export default PlayerCenter;