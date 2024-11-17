import {MutedOutlined, SoundOutlined} from "@ant-design/icons";
import {Slider} from "antd";
import {useEffect, useState} from "react";
import './index.scss'

const PlayerRight = ({audioRef}) => {
    //处理音量逻辑
    const [volume, setVolume] = useState(100)
    const handleVolumeChange = (value) => {
        if (audioRef.current) {
            audioRef.current.volume = value / 100;
            if (audioRef.current.volume!==0){
                localStorage.setItem("volume",audioRef.current.volume);
            }

            setVolume(value);
        }
    }
    const changeMuted = () => {
        if (audioRef.current.volume>0) {
            audioRef.current.volume = 0;
            setVolume(0)
        }else{
            audioRef.current.volume = localStorage.getItem("volume");
            const Volume:string = localStorage.getItem("volume")
            console.log(Volume)
            const volume = parseFloat(Volume) * 100
            setVolume(volume);
        }
    }
    useEffect(() => {
        const Volume:string = localStorage.getItem("volume")
        const volume = parseFloat(Volume) * 100
        setVolume(volume)
    }, []);

    return (
        <div className={'flex w-100px  items-center mr-50px'}>
            {/*根据是否静音渲染图标*/}
            {
                volume===0 ? <MutedOutlined onClick={changeMuted} className={'color-white text-20px mr-5px'}/>:
                    <SoundOutlined onClick={changeMuted} className={'color-white text-20px mr-5px'}/>

            }
            <Slider className={'w-100px'} value={volume} onChange={handleVolumeChange}/>
        </div>
    )
}
export default PlayerRight;