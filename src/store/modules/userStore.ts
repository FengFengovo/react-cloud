import {createSlice} from "@reduxjs/toolkit";
import {loginStatusAPI} from "@/apis/user.ts";


const userStore = createSlice({
    name:'user',
    initialState:{
        isLogin:false,
        userInfo:null
    },
    reducers:{
        changeLoginStatus(state, action){
            state.isLogin = action.payload;
        },
        setUserInfo(state, action){
            state.userInfo = action.payload;
        }
    }
})
export const {changeLoginStatus,setUserInfo} = userStore.actions;
const fetchUserInfo= ()=>{
    return async (dispatch)=>{
        const res = await loginStatusAPI()
        dispatch(changeLoginStatus(true))
        dispatch(setUserInfo(res.data.profile))
    }
}
export {fetchUserInfo}

const userReducer = userStore.reducer
export default userReducer;