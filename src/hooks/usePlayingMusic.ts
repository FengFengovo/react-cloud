// hooks/usePlayingMusic.ts
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentIndex, setCurrentUrl, setSongInfo } from "@/store/modules/playingStore.ts";
import { getMusicInfoAPI, getMusicUrlAPI } from "@/apis/song.ts";

function usePlayingMusic() {
    const dispatch = useAppDispatch();

    const currentIndex = useAppSelector(state => state.playing.currentIndex);

    const currentUrl = useAppSelector(state => state.playing.currentUrl);

    const playList = useAppSelector(state => state.playing.playList);

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
            //处理索引越界 如果当前音乐是最后一首 则定向到第一首
            await setMusicData(0);
        }
    };

    const playPrevMusic = async () => {
        if (currentIndex - 1 >= 0) {
            await setMusicData(currentIndex -1);
        }else{
            //处理索引越界 如果当前音乐是第一首 则定向到最后一首
            await setMusicData(playList.length-1);
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
