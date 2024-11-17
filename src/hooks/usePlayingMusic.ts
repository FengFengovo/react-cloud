// hooks/usePlayingMusic.ts
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentUrl, setSongInfo} from "@/store/modules/playingStore.ts";
import {getMusicInfoAPI, getMusicUrlAPI} from "@/apis/song.ts";

function usePlayingMusic() {
    const dispatch = useDispatch();
    const currentUrl = useSelector(state => state.playing.currentUrl);

    const setCurrentId = async (id: string) => {
        try {
            const res = await getMusicUrlAPI(id);
            const songInfo =await getMusicInfoAPI(id);
            dispatch(setCurrentUrl(res.data[0].url));
            dispatch(setSongInfo(songInfo.songs[0]));
        } catch (error) {
            console.error('获取音乐URL失败:', error);
        }
    };

    return {
        playingUrl: currentUrl,
        setCurrentId,
    };
}
export default usePlayingMusic;