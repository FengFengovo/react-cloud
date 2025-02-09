import {useEffect, useRef, useState} from "react";
import {checkQrStatusAPI, getQrImgAPI, getQrKeyAPI} from "@/apis/user.ts";
import {useSetCookie} from "@/hooks/useSetCookie.ts";
import {message} from "antd";
import {fetchUserInfo} from "@/store/modules/userStore.ts";
import {useAppDispatch,useAppSelector} from "@/store/hooks.ts";

const UseQR = () => {
    const {isLogin, userInfo} = useAppSelector(state => state.user);
    const [showQR, setShowQR] = useState(false);
    const [qrUrl, setQrUrl] = useState('')
    const dispatch = useAppDispatch();
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => {
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
                        dispatch(fetchUserInfo())
                        clearInterval(timerRef.current)
                    }
                }, 1500)

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