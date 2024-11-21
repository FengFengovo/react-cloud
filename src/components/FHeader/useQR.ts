import {useEffect, useRef, useState} from "react";
import {checkQrStatusAPI, getQrImgAPI, getQrKeyAPI} from "@/apis/user.ts";
import {useSetCookie} from "@/hooks/useSetCookie.ts";
import {useSelector} from "react-redux";
import {message} from "antd";
import {fetchUserInfo} from "@/store/modules/userStore.ts";

const UseQR = () => {
    const {isLogin, userInfo} = useSelector(state => state.user);
    const [showQR, setShowQR] = useState(false);
    const [qrUrl, setQrUrl] = useState('')
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => {
        console.log(showQR)
        if (userInfo) {
            message.success(`${userInfo?.nickname},欢迎回来!`)
        }
        if (showQR) {
            const getQrImage = async () => {
                const res = await getQrKeyAPI()
                const key = res.data.unikey
                const qrRes = await getQrImgAPI(key)
                setQrUrl(qrRes.data.qrurl)

                timerRef.current = setInterval(async () => {
                    const qrStarus = await checkQrStatusAPI(key)
                    console.log(qrStarus)
                    if (qrStarus.code === 803) {
                        console.log('登录成功')
                        useSetCookie(qrStarus.cookie)
                        setShowQR(false)
                        fetchUserInfo()
                        clearInterval(timerRef.current)
                        location.reload()
                    }
                }, 2000)

            }
            getQrImage()
        }else{
            if (timerRef.current){
                clearInterval(timerRef.current)
            }
        }

    }, [isLogin, showQR])

    return {
        showQR,
        setShowQR,
        qrUrl
    }
}
export default UseQR;