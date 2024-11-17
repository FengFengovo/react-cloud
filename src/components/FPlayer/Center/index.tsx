import {useEffect, useState} from "react";
import { useSelector,useDispatch } from 'react-redux'
import {playNext, setIsPlaying} from "@/store/modules/playingStore.ts";
import {getLikeListAPI} from "@/apis/song.ts";
const PlayerCenter = ({audioRef}) => {
    const isPlaying =useSelector(state => state.playing.isPlaying)
    const [loveStatus, setLoveStatus] = useState(true)
    const currentUrl = useSelector(state => state.playing.currentUrl);
    const currentIndex = useSelector(state => state.playing.currentIndex);
    const currentSong = useSelector(state => state.playing.currentSong);
    const songInfo = useSelector(state => state.playing.songInfo);

    const dispatch = useDispatch();
    const playList = useSelector(state => state.playing.playList);
    // 监听 URL 变化，重置播放状态
    const userInfo =useSelector(state => state.user.userInfo)
    //判断是否喜欢音乐

    useEffect(() => {
        if (currentUrl) {
            dispatch(setIsPlaying(true)) // URL 变化时，重置为播放状态
        }
        const getLikeStatus = async () => {
            const res =await getLikeListAPI(userInfo.userId)
            if (res?.ids?.includes(songInfo?.id)){
                setLoveStatus(true)
            }else{
                setLoveStatus(false)
            }
        }
        getLikeStatus()
    }, [currentUrl,loveStatus]);
    const changePlayerStatus = () => {

        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => {
                    console.error('播放失败:', err);
                });
            }
            dispatch(setIsPlaying(!isPlaying))
        }
    }
    const next =()=>{
        dispatch(playNext())
        console.log('这是点击下一首之后的索引',currentIndex)
        console.log('这是点击下一首之后的currentURL',currentUrl)
    }
    return (
        <div className={'flex items-center'}>
            <i className="iconfont text-25px mx-40px">&#xe68c;</i>
            <i className="iconfont text-30px" onClick={next}>&#xe63c;</i>
            {/*播放状态三目运算*/}
            { isPlaying?
                <i className="iconfont text-35px mx-40px" onClick={changePlayerStatus}>&#xe63b;</i>
                :
                <i className="iconfont text-35px mx-40px" onClick={changePlayerStatus}>&#xe63a;</i>
            }
            <i className="iconfont text-30px" onClick={next}>&#xe63e;</i>
            <i className="iconfont text-25px mx-40px" onClick={() => setLoveStatus(!loveStatus)}>
                {loveStatus ? '\ue8c3' : '\ue8ab'}
            </i>
        </div>
    )
}
export default PlayerCenter;