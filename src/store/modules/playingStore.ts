// store/playerSlice.ts
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PlayerState {
    currentUrl: string;
    currentIndex: number;
    isPlaying: boolean;
    songInfo: {
        ar: Array<{
            name: string;
        }>;
        name: string;
        id: string;
        al: {
            name:string
            picUrl: string;
        };
    } | null;
    playList: any[];
}

const playingStore = createSlice({
    name: 'playing',
    initialState: <PlayerState>{
        currentUrl: '',
        currentIndex: 0,
        isPlaying: false,
        songInfo: null,
        playList: []
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
        setSongInfo: (state, action: PayloadAction<any>) => {

            state.songInfo = action.payload;
        },
        setPlayList: (state, action: PayloadAction<[]>) => {
            state.playList = action.payload;
        },
    }
})
export const {setCurrentUrl, setCurrentIndex, setPlayList, setSongInfo, setIsPlaying} = playingStore.actions;

const playingReducer = playingStore.reducer
export default playingReducer;