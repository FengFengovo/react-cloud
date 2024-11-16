import {useEffect, useState} from "react";
import {getQrKeyAPI,getQrImgAPI,checkQrStatusAPI} from "@/apis/user.ts";
import {useSetCookie} from "@/hooks/useSetCookie.ts";
import {useSelector} from "react-redux";
import {message} from "antd";
const UseQR=()=>{
    const {isLogin,userInfo} =useSelector(state=>state.user);
    const [showQR, setShowQR] = useState(false);
    const [qrUrl, setQrUrl] = useState('')
    useEffect(()=>{
        if (isLogin){
            message.success(`${userInfo.nickname},欢迎回来!`)
        }
        else{
            const getQrImage=async ()=>{
                const res =await getQrKeyAPI()
                const key =res.data.unikey
                const qrRes = await getQrImgAPI(key)
                setQrUrl(qrRes.data.qrurl)
                const checkQR=setInterval(async ()=>{
                    const qrStarus =await checkQrStatusAPI(key)
                    console.log(qrStarus)
                    if (qrStarus.code===803){
                        console.log('登录成功')
                        useSetCookie(qrStarus.cookie)
                        clearInterval(checkQR)
                    }
                },2000)
                getQrImage()
            }

        }

    },[isLogin])

    return{
        showQR,
        setShowQR,
        qrUrl
    }
}
export default UseQR;