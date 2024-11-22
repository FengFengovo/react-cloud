import {useAppSelector} from "@/store/hooks";
import './index.scss'
//未播放情况下默认封面
import defaultImg from '@/assets/default.jpg'



const PlayerLeft = () => {

    const isPlaying = useAppSelector(state => state.playing.isPlaying);

    const songInfo = useAppSelector(state => state.playing.songInfo)
    //弹出层状态


    return (
        <div onClick={e => e.stopPropagation()} className={'flex items-center ml-20px w-150px text-nowrap z-999'}>

            <div className={'flex items-center'}>
                <div className="record-container">
                    <img
                        src={songInfo ? songInfo?.al?.picUrl : defaultImg}
                        className={`record-img ${isPlaying ? 'rotate-animation' : 'rotate-animation paused'}`}
                     alt={''}/>
                </div>
            </div>
            <div className={'flex h-50px ml-15px flex-col justify-around '}>
                <div className="scroll-container">
                    <span className="scroll-text font-bold text-white text-sm">
                        {songInfo ? songInfo.name : '未播放歌曲'}
                     </span>
                </div>
                <div>
                    <span className="scroll-text text-sm text-gray-400">

                        {songInfo ? songInfo.ar[0].name : '未播放'}
                     </span>
                </div>
            </div>
        </div>
    )
}
export default PlayerLeft;