import {useEffect, useState} from "react";

import {getQrKeyAPI,getQrImgAPI,checkQrStatusAPI} from "@/apis/user.ts";
import {setCookie} from "@/hooks/setCookie.ts";
import useLoginStatus from "@/pages/Layout/useLoginStatus.ts";
import {message} from "antd";
const UseQR=()=>{
    const {loginStatus}=useLoginStatus()
    const [showQR, setShowQR] = useState(false);
    const [qrUrl, setQrUrl] = useState('')
    useEffect(()=>{
        if (loginStatus){
            message.success('欢迎！')
        }else{
            const getQrImage=async ()=>{
                const res =await getQrKeyAPI()
                const key =res.data.unikey
                console.log(key)
                const qrRes = await getQrImgAPI(key)
                setQrUrl(qrRes.data.qrurl)
                const checkQR=setInterval(async ()=>{
                    const qrStarus =await checkQrStatusAPI(key)
                    console.log(qrStarus)
                    if (qrStarus.code===803){
                        console.log('登录成功')
                        setCookie(qrStarus.cookie)
                        clearInterval(checkQR)
                    }
                },2000)
                getQrImage()
            }

        }

    },[])

    return{
        showQR,
        setShowQR,
        qrUrl
    }
}
export default UseQR;