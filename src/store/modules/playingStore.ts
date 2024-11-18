// store/playerSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import playList from "@/views/PlayList";
import {getMusicUrlAPI} from "@/apis/song.ts";
interface PlayerState {
    currentUrl: string;
    currentIndex: number;  // 可以定义具体的类型
    isPlaying: boolean;
    songInfo:null|object,
    playList:[]
}

const playingStore = createSlice({
    name: 'playing',
    initialState: <PlayerState>{
        currentUrl: '',
        currentIndex: 0,
        isPlaying: false,
        songInfo: null,
        playList:[]
    },
    reducers: {
        setCurrentUrl: (state, action: PayloadAction<string>) => {
            state.currentUrl = action.payload;
        },
        setCurrentIndex: (state, action: PayloadAction<any>) => {
            state.currentIndex = action.payload;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setSongInfo: (state, action: PayloadAction<object>) => {
            state.songInfo = action.payload;
        },
        setPlayList: (state, action: PayloadAction<[]>) => {
            state.playList = action.payload;
        },
        playNext : (state) => {
            state.currentIndex = state.currentIndex +1;
        }
    }
})
export const {setCurrentUrl, setCurrentIndex,setPlayList,playNext, setSongInfo, setIsPlaying} = playingStore.actions;




const playingReducer = playingStore.reducer
export default playingReducer;