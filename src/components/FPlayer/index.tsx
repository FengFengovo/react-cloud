import './index.scss'
import { Slider } from "antd"

import PlayerLeft from "@/components/FPlayer/Left";
import PlayerRight from "@/components/FPlayer/Right";
import PlayerCenter from "@/components/FPlayer/Center";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import FPopupPage from "@/components/FPopupPage";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const FPlayer = () => {
    // 创建对 audio 元素的引用
    const audioRef = useRef(null);
    const currentUrl = useSelector(state => state.playing.currentUrl);
    const [progress, setProgress] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    // 存储子组件方法
    const [playerMethods, setPlayerMethods] = useState<{ syncIndex: () => void } | null>(null);

    useEffect(() => {
        if (currentUrl && audioRef.current) {
            audioRef.current.src = currentUrl;
            audioRef.current.play().catch(err => {
                console.error('播放失败:', err);
            });
        }
    }, [currentUrl]);

    // 添加音频时间更新事件监听
    useEffect(() => {
        const audio = audioRef.current;
        const handleTimeUpdate = () => {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            if (duration > 0) {
                setProgress((currentTime / duration) * 100);
            }
        };

        audio?.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            audio?.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    // 新增：接收子组件方法的回调
    const handlePlayerReady = (methods: { syncIndex: () => void }) => {
        setPlayerMethods(methods);
    };

    // 处理进度条改变
    const handleSliderChange = (value) => {
        const audio = audioRef.current;
        if (audio) {
            const time = (value / 100) * audio.duration;
            audio.currentTime = time;
            setProgress(value);
            // 调用子组件的同步歌词方法
            playerMethods?.syncIndex();
        }
    };

    return (
        <div className={'h-full w-full flex flex-col overflow-hidden relative'}>
            {/* 播放器内容 - 提高层级 */}
                <div className={'w-full flex justify-center'}>
                    <Slider
                        className={'w-99.5%'}
                        // 取消悬浮时候的进度提示
                        tooltip={{open: false}}
                        value={progress}
                        onChange={handleSliderChange}
                    />
                    <audio ref={audioRef} src={currentUrl} autoPlay={true}/>
                </div>

                <div
                    onClick={(e) => {
                        // 如果点击的是背景（当前div），而不是其子元素
                        if (e.target === e.currentTarget) {
                            setShowPopup(true);
                        }
                    }}
                    className={'flex flex justify-between w-99% m-auto rounded-xl overflow-hidden h-60px bg-[#212121ff]'}>
                    <PlayerLeft/>
                    <PlayerCenter audioRef={audioRef}/>
                    <PlayerRight audioRef={audioRef}/>
                </div>

            {/* 弹出层 */}
            <FPopupPage
                audioRef={audioRef}
                isShow={showPopup}
                onClose={() => setShowPopup(false)}
                onPlayerReady={handlePlayerReady}  // 新增：传递回调函数
            />
        </div>
    )
}

export default FPlayer