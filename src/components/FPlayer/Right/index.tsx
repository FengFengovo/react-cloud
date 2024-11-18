import {MutedOutlined, SoundOutlined} from "@ant-design/icons";
import {Drawer, Slider} from "antd";
import {useEffect, useState} from "react";
import './index.scss'
import {useSelector} from "react-redux";

const PlayerRight = ({audioRef}) => {
    //处理音量逻辑
    const [volume, setVolume] = useState(100)
    const [openDrawer, setOpenDrawer] = useState(false)
    const playList = useSelector(state => state.playing.playList)
    const songInfo = useSelector(state => state.playing.songInfo);
    const handleVolumeChange = (value) => {
        if (audioRef.current) {
            audioRef.current.volume = value / 100;
            if (audioRef.current.volume !== 0) {
                localStorage.setItem("volume", audioRef.current.volume);
            }
            setVolume(value);
        }
    }
    //静音按钮逻辑
    const changeMuted = () => {
        if (audioRef.current.volume > 0) {
            audioRef.current.volume = 0;
            setVolume(0)
        } else {
            audioRef.current.volume = localStorage.getItem("volume");
            const Volume: string = localStorage.getItem("volume")
            console.log(Volume)
            const volume = parseFloat(Volume) * 100
            setVolume(volume);
        }
    }
    useEffect(() => {
        const Volume: string = localStorage.getItem("volume")
        const volume = parseFloat(Volume) * 100
        setVolume(volume)
        console.log(playList)
    }, []);

    return (
        <div className={'flex w-120px  items-center mr-50px'}>
            {/*播放列表抽屉*/}
            <Drawer className={'w-400px! h-600px!  pos-fixed bottom-82.27px  right-1px p-0! m-0!'} title="播放列表"
                    onClose={() => setOpenDrawer(false)} open={openDrawer}>
                {playList.map(item => {
                    return (
                        <div className={'bg-black rounded-lg w-97% m-auto my-3px'}>
                            <div className="flex flex-col rounded-lg hover:bg-white/10 transition-all duration-200 p4 cursor-pointer">
                                <span className={`
                                        ${songInfo?.id === item?.id
                                        ? 'text-#ff3d89 drop-shadow-[0_0_10px_#ff3d89]'
                                        : 'text-white/60'}
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
                    )
                })}
            </Drawer>
            <i onClick={() => setOpenDrawer(true)}
               className={'iconfont text-16px mr-15px text-white hover:text-[#fa3d49] transition-all duration-300 cursor-pointer '}>&#xe600;</i>
            {/*根据是否静音渲染图标*/}
            {
                volume === 0 ? <MutedOutlined onClick={changeMuted} className={'color-white text-20px mr-5px'}/> :
                    <SoundOutlined onClick={changeMuted} className={'color-white text-20px mr-5px'}/>
            }
            <Slider className={'w-100px'} value={volume} onChange={handleVolumeChange}/>
        </div>
    )
}
export default PlayerRight;