import './index.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {getLyricAPI} from "@/apis/song.ts";
import '@lrc-player/core/dist/style.css';
import { parseLrc, parseYrc } from '@lrc-player/parse';
import Player from '@lrc-player/core';
import {setIsPlaying} from "@/store/modules/playingStore.ts";

interface Props {
    isShow: boolean;
    onClose: () => void;
    audioRef: React.RefObject<HTMLAudioElement>;
    // 新增：添加回调函数 prop
    onPlayerReady?: (methods: { syncIndex: () => void }) => void;
}

const FPopupPage: React.FC<Props> = ({ isShow, onClose, audioRef, onPlayerReady }) => {
    // @ts-ignore
    const isPlaying = useSelector(state => state.playing.isPlaying);
    // @ts-ignore
    const songInfo= useSelector(state => state.playing.songInfo);
    const [currentPlayer, setCurrentPlayer] = useState<any>(null);
    const playerRef = useRef<any>(null);
    const dispatch = useDispatch();
    // 重置滚动条位置
    useEffect(() => {
        const element = document.querySelector('.y-player-container');
        if (element) {
            element.scrollTop = 0;
        }
    }, [songInfo?.id]);

    // 处理歌词播放器
    useEffect(() => {
        if (!songInfo?.id || !audioRef.current) return;

        // 清除旧的歌词容器内容
        const container = document.querySelector('.geci');
        if (container) {
            container.innerHTML = '';
        }

        // 创建新的播放器实例
        const player = new Player({
            click(time: number, index: number) {
                if (audioRef.current) {
                    audioRef.current.currentTime = time;
                    audioRef.current.play();
                    dispatch(setIsPlaying(true))
                    player.syncIndex(index);
                }
            }
        });

        // 挂载播放器
        if (container) {
            player.mount(container, audioRef.current);
        }

        // 将方法传递给父组件
        onPlayerReady?.({ syncIndex: () => player.syncIndex() });

        // 获取并设置歌词
        const getLyric = async () => {
            try {
                const res = await getLyricAPI(songInfo.id);
                const lyricData = res?.yrc?.lyric || res.lrc?.lyric;

                if (lyricData) {
                    const lyrics = lyricData.replace(/^\{.*}$/gm, '').trim();
                    const parsedLrc = res?.yrc?.lyric ? parseLrc(lyrics) : parseYrc(lyrics);
                    const type = res?.yrc?.lyric ? 'lrc' : 'yrc';

                    // 确保在更新歌词前清空旧的内容
                    if (container) {
                        container.innerHTML = '';
                    }

                    // 更新歌词
                    // @ts-ignore
                    player.updateAudioLrc(parsedLrc, type);
                }
            } catch (err) {
                console.error('获取歌词失败:', err);
            }
        };

        playerRef.current = player;
        setCurrentPlayer(player);

        // 获取歌词并开始播放
        getLyric();
        if (isPlaying) {
            player.play();
        }

        // 清理函数
        return () => {
            if (container) {
                container.innerHTML = '';
            }
            playerRef.current = null;
        };

    }, [songInfo?.id]);

    // 处理播放状态变化
    useEffect(() => {
        if (currentPlayer) {
            if (isPlaying) {
                currentPlayer.play();
            } else {
                currentPlayer.pause();
            }
        }
    }, [isPlaying]);

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
                {/* 歌曲信息 */}
                <div className="mt-5 flex items-center justify-around h-full">
                    {/* 关闭按钮 */}
                    <div
                        onClick={onClose}
                        className="w-35px h-35px flex justify-center items-center border border-white/20  transition-all duration-500 hover:bg-white/8 hover:backdrop-blur-2xl"
                    >
                        <i className="iconfont text-35px text-white">&#xe626;</i>
                    </div>

                    {/* 封面信息 */}
                    <div>
                        <img
                            src={songInfo?.al?.picUrl}
                            className="w-320px h-320px rounded-lg shadow-2xl"
                            alt={songInfo?.name}
                        />
                        <div className={'mt-4'}>
                            <span className="text-2xl font-bold">{songInfo?.name}</span>
                            <span className="mt-2 ml-20px text-lg opacity-80">
                                {songInfo?.ar?.[0]?.name}
                            </span>
                            <div className="text-1em opacity-80">
                                专辑：{songInfo?.al?.name}
                            </div>
                        </div>
                    </div>

                    {/* 歌词容器 */}
                    <div className="text-center text-white h-400px">
                        <div className="geci overflow-auto h-full scroll-hidden"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FPopupPage;