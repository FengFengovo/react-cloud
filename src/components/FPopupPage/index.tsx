// PopupPage.tsx
import './index.scss';
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {getLyricAPI} from "@/apis/song.ts";
import '@lrc-player/core/dist/style.css' // 引入样式
import { parseLrc, parseYrc } from '@lrc-player/parse'
import Player from '@lrc-player/core'
interface Props {
    isShow: boolean;
    onClose: () => void;
    audioRef:React.RefObject<HTMLAudioElement>;
}

const FPopupPage: React.FC<Props> = ({ isShow, onClose,audioRef }) => {
    const player = new Player({
        // 当点击任意歌词行时，会触发这个事件
        click(time: number, index: number) {
            console.log(time, index)
            audioRef.current.value!.currentTime = time
            player.syncIndex(index)
        }
    })
    const songInfo = useSelector(state => state.playing.songInfo);
    useEffect(() => {
        player.mount(document.querySelector('.geci') as HTMLElement, audioRef)
        const  getLyric=async ()=>{
            const res = await getLyricAPI(songInfo?.id)
            console.log(res)
            if (res?.yrc?.lyric){
                //如果有逐字歌词 则使用逐字歌词
                const lyrics = res.yrc.lyric.replace(/^\{.*}$/gm, '').trim();
                console.log('这是逐字正则后的',lyrics);
                const lrc=parseLrc(lyrics)
                console.log('这是逐字处理之后的',lrc)
                player.updateAudioLrc(lrc, 'lrc')
            }else{
                const lyrics = res.lrc.lyric.replace(/^\{.*}$/gm, '').trim();
                console.log('这是逐行正则后的',lyrics);
                const yrc=parseYrc(lyrics)
                console.log('这是逐行处理之后的',yrc)
                // @ts-ignore
                player.updateAudioLrc(yrc, 'yrc')
            }

        }
        audioRef.current.play()
        player.play()
        getLyric()

    },[songInfo])
    return (
        <div className={`popup-page ${isShow ? 'show' : ''}`}>
            {/* 背景层 */}
            <div className="fixed inset-0">
                <img
                    src={songInfo?.al?.picUrl}
                    className="w-full h-full object-cover blur-lg opacity-40 scale-110 relative top-100"
                    alt="background"
                />
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"/>
                <div className="absolute inset-0 bg-black/20 mix-blend-multiply"/>
            </div>

            {/* 内容层 */}
            <div className="relative z-10 w-95% m-auto h-full mt-30px">
                {/* 关闭按钮 */}
                <div
                    onClick={onClose}
                    className="w-35px h-35px flex justify-center items-center border border-white/20  backdrop-blur-2xl transition-all duration-500 hover:bg-white/8 "
                >
                    <i className="iconfont text-35px text-white">&#xe626;</i>
                </div>

                {/* 歌曲信息 */}
                <div className="mt-5 flex flex justify-around  h-full ">
                    <img
                        src={songInfo?.al?.picUrl}
                        className="w-280px h-280px rounded-lg shadow-2xl"
                        alt={songInfo?.name}
                    />
                    <div className="mt-6 text-center text-white">
                        <h2 className="text-2xl font-bold">{songInfo?.name}</h2>
                        <p className="mt-2 text-lg opacity-80">{songInfo?.ar[0].name}</p>
                        <div className={'geci'}></div>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default FPopupPage;