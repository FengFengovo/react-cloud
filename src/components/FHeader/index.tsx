import {Button, Modal, QRCode} from "antd";
import './index.scss'
import useQR from "@/components/FHeader/useQR.ts";
import useLoginStatus from "@/pages/Layout/useLoginStatus.ts";

const FHeader=()=>{
    const {showQR,setShowQR,qrUrl} = useQR()
    const {loginStatus} = useLoginStatus()
    return(
        <div className={'bg-black flex flex-col'}>
            <div className={'bg-red h-10px drag'}>123</div>
            <div className={'nodrag'}>
                {!loginStatus&& <Button onClick={()=>setShowQR(true)}>登录</Button>}

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