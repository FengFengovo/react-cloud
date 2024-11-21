import {MutedOutlined, SoundOutlined} from "@ant-design/icons";
import {Drawer, Slider} from "antd";
import {memo, useCallback, useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import './index.scss';
import type {RootState} from "@/store";

// 抽离播放列表项组件并使用 memo
const PlayListItem = memo(({item, isActive}) => (
    <div className={'bg-black rounded-lg w-97% m-auto my-3px'}>
        <div className="flex flex-col rounded-lg hover:bg-white/10 transition-all duration-200 p4 cursor-pointer">
      <span className={`
        ${isActive ? 'text-#ff3d89 drop-shadow-[0_0_10px_#ff3d89]' : 'text-white/60'}
        hover:text-white/80
        transition-all
      `}>
        {item.name}
      </span>
            <span className="text-white/50 text-12px">
        {item.ar[0].name}
      </span>
        </div>
    </div>
));

const PlayerRight = memo(({audioRef}) => {
    const [volume, setVolume] = useState(100);
    const [openDrawer, setOpenDrawer] = useState(false);

    const playList = useSelector((state: RootState) => state.playing.playList);
    const currentSongId = useSelector((state: RootState) => state.playing.songInfo?.id);

    // 缓存事件处理函数
    const handleVolumeChange = useCallback((value) => {
        if (audioRef.current) {
            audioRef.current.volume = value / 100;
            if (audioRef.current.volume !== 0) {
                localStorage.setItem("volume", audioRef.current.volume);
            }
            setVolume(value);
        }
    }, [audioRef]);

    const changeMuted = useCallback(() => {
        if (audioRef.current.volume > 0) {
            audioRef.current.volume = 0;
            setVolume(0);
        } else {
            const storedVolume = localStorage.getItem("volume");
            const volumeValue = parseFloat(storedVolume) * 100;
            audioRef.current.volume = storedVolume;
            setVolume(volumeValue);
        }
    }, [audioRef]);

    const toggleDrawer = useCallback(() => {
        setOpenDrawer(prev => !prev);
    }, []);

    // 缓存播放列表渲染
    const playListContent = useMemo(() => (
        playList.map(item => (
            <PlayListItem
                key={item.id}
                item={item}
                isActive={currentSongId === item.id}
            />
        ))
    ), [playList, currentSongId]);

    // 初始化音量
    useEffect(() => {
        const storedVolume = localStorage.getItem("volume");
        if (storedVolume) {
            const volumeValue = parseFloat(storedVolume) * 100;
            setVolume(volumeValue);
        }
    }, []);

    return (
        <div className={'flex w-120px items-center mr-50px'}>
            <Drawer
                className={'w-400px! h-600px! pos-fixed bottom-65px right-1px p-0! m-0!'}
                title="播放列表"
                onClose={toggleDrawer}
                open={openDrawer}
                destroyOnClose={false}
            >
                {playListContent}
            </Drawer>

            <i
                onClick={toggleDrawer}
                className={'iconfont text-16px mr-15px text-white hover:text-[#fa3d49] transition-all duration-300 cursor-pointer'}
            >
                &#xe600;
            </i>

            {volume === 0 ? (
                <MutedOutlined
                    onClick={changeMuted}
                    className={'color-white text-20px mr-5px'}
                />
            ) : (
                <SoundOutlined
                    onClick={changeMuted}
                    className={'color-white text-20px mr-5px'}
                />
            )}

            <Slider
                className={'w-100px'}
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    );
});

export default PlayerRight;