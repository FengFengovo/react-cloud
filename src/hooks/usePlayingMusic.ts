// hooks/usePlayingMusic.ts
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIndex, setCurrentUrl, setSongInfo } from "@/store/modules/playingStore.ts";
import { getMusicInfoAPI, getMusicUrlAPI } from "@/apis/song.ts";
import {message} from "antd";

function usePlayingMusic() {
    const dispatch = useDispatch();
    const currentIndex = useSelector(state => state.playing.currentIndex);
    const currentUrl = useSelector(state => state.playing.currentUrl);
    const playList = useSelector(state => state.playing.playList);

    const setMusicData = async (index: number) => {
        try {
            const currentId = playList[index].id;
            const [urlRes, songInfoRes] = await Promise.all([
                getMusicUrlAPI(currentId),
                getMusicInfoAPI(currentId)
            ]);
            dispatch(setCurrentIndex(index));
            dispatch(setCurrentUrl(urlRes.data[0].url));
            dispatch(setSongInfo(songInfoRes.songs[0]));
        } catch (error) {
            console.error('获取音乐信息失败:', error);
        }
    };

    const playNextMusic = async () => {
        if (currentIndex + 1 < playList.length) {
            await setMusicData(currentIndex + 1);
        }else{
            message.info('当前已经是最后一首啦')
        }
    };

    const playPrevMusic = async () => {
        if (currentIndex - 1 >= 0) {
            await setMusicData(currentIndex - 1);
        }else{
            message.info('当前已经是第一首啦')
        }
    };

    return {
        playingUrl: currentUrl,
        setCurrentId: setMusicData,
        playNextMusic,
        playPrevMusic
    };
}

export default usePlayingMusic;
