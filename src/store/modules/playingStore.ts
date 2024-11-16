// store/playerSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PlayerState {
    currentUrl: string;
    currentSong: any | null;  // 可以定义具体的类型
    isPlaying: boolean;
    songInfo: object | null
}

const playingStore = createSlice({
    name: 'playing',
    initialState: <PlayerState>{
        currentUrl: '',
        currentSong: null,
        isPlaying: false,
        songInfo: null
    },
    reducers: {
        setCurrentUrl: (state, action: PayloadAction<string>) => {
            state.currentUrl = action.payload;
        },
        setCurrentSong: (state, action: PayloadAction<any>) => {
            state.currentSong = action.payload;
        },
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        setSongInfo: (state, action: PayloadAction<object>) => {
            state.songInfo = action.payload;
        }
    }
})

export const {setCurrentUrl, setCurrentSong, setSongInfo, setIsPlaying} = playingStore.actions;


const playingReducer = playingStore.reducer
export default playingReducer;