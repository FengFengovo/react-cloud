import './index.scss'
import { Slider } from "antd"

import PlayerLeft from "@/components/FPlayer/Left";
import PlayerRight from "@/components/FPlayer/Right";
import PlayerCenter from "@/components/FPlayer/Center";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import FPopupPage from "@/components/FPopupPage";

const FPlayer = () => {
    // 创建对 audio 元素的引用
    const audioRef:React.MutableRefObject<HTMLAudioElement> = useRef(null);
    const currentUrl = useSelector(state => state.playing.currentUrl);
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {

        if (currentUrl && audioRef.current) {
            audioRef.current.src = currentUrl;
            audioRef.current.play().catch(err => {
                console.error('播放失败:', err);
            });
        }
    }, [currentUrl]);
    return (
        <div className={'h-full w-full overflow-hidden relative'}>


            {/* 播放器内容 - 提高层级 */}
            <div className="relative z-10">
                <div className={'w-full flex justify-center'}>
                    <Slider
                        className={'w-99.5%'}
                        tooltip={{open: false}}
                        // value={progress}
                        // onChange={handleSliderChange}
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
                    <PlayerRight/>
                </div>
            </div>

            {/* 弹出层 */}
            <FPopupPage
                audioRef={audioRef}
                isShow={showPopup}
                onClose={() => setShowPopup(false)}
            />
        </div>
    )
}

export default FPlayer