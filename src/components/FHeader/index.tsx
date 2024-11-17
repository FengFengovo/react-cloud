import {Button, Modal, QRCode} from "antd";
import './index.scss'
import useQR from "@/components/FHeader/useQR.ts";
import {useSelector} from "react-redux";

const FHeader=()=>{
    const {showQR,setShowQR,qrUrl} = useQR()
    const {isLogin} =useSelector(state => state.user)
    return(
        <div className={'bg-red h-full flex  flex-col'}>
            <div className={'h-10px bg-pink'}></div>
            <div>
                { !isLogin && <Button onClick={()=>setShowQR(true)}>登录</Button>}
                <Modal
                    title="请使用网易云APP扫码"
                    open={showQR}
                    onCancel={() =>setShowQR(false)}
                    footer=""
                    width={300}
                >
                    <div className={'flex items-center justify-center mt-50px'}>
                        <QRCode value={qrUrl}/>
                    </div>
                </Modal>
            </div>

        </div>
    )
}
export default FHeader;