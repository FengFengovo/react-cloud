import {configureStore} from "@reduxjs/toolkit";
import userReducer from "@/store/modules/userStore.ts";
import playingReducer from "@/store/modules/playingStore.ts";
export default  configureStore({
    reducer: {
        user: userReducer,
        playing: playingReducer,
    }
})
