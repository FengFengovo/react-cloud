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
    const isPlaying = useSelector(state => state.playing.isPlaying);
    const player = new Player({
        // 当点击任意歌词行时，会触发这个事件
        click(time: number, index: number) {
            audioRef.current.currentTime = time
            player.syncIndex(index)
        }
    })
    const songInfo = useSelector(state => state.playing.songInfo);
    useEffect(() => {

        if (songInfo){
            player.mount(document.querySelector('.geci') as HTMLElement, audioRef.current)
            const  getLyric=async ()=>{
                const res = await getLyricAPI(songInfo?.id)
                const lyricData = res?.yrc?.lyric || res.lrc?.lyric;  // 如果yrc.lyric存在则优先使用，否则使用lrc.lyric

                if (lyricData) {
                    const lyrics = lyricData.replace(/^\{.*}$/gm, '').trim();
                    const parsedLrc = res?.yrc?.lyric ? parseLrc(lyrics) : parseYrc(lyrics);  // 根据来源选择解析方式
                    const type = res?.yrc?.lyric ? 'lrc' : 'yrc';  // 判断是逐字歌词还是普通歌词

                    // @ts-ignore
                    player.updateAudioLrc(parsedLrc, type);
                }

            }
            audioRef.current.play()
            player.play()
            getLyric()
        }


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