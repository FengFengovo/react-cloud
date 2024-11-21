import {configureStore} from "@reduxjs/toolkit";
import userReducer from "@/store/modules/userStore.ts";
import playingReducer from "@/store/modules/playingStore.ts";


const store= configureStore({
    reducer: {
        user: userReducer,
        playing: playingReducer,
    }
})
export default store;
export type RootState = ReturnType<typeof store.getState>
