import {useEffect, useState} from "react";
import {loginStatusAPI} from "@/apis/user.ts";

function useLoginStatus(){
    const [loginStatus,setLoginStatus]=useState(false)
    useEffect(()=>{
        const getStatus=async ()=>{
            const res =  await loginStatusAPI();
            if (res.profile!==null){
                setLoginStatus(true)
            }else {
                setLoginStatus(false)
            }
        }
        getStatus()
    },[])
    return{
        loginStatus,
    }
}
export default useLoginStatus;