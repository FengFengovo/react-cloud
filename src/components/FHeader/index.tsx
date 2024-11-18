import {AutoComplete, AutoCompleteProps, Button, Modal, QRCode} from "antd";
import './index.scss'
import useQR from "@/components/FHeader/useQR.ts";
import {useSelector} from "react-redux";
import {LeftOutlined, SearchOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

import useSearch from "@/components/FHeader/useSearch.ts";
import {useEffect, useState} from "react";

const FHeader = () => {
    const [options, setOptions] =  useState<AutoCompleteProps['options']>([])
    const {defaultKey, hotKey, getKeySuggets} = useSearch()
    const {showQR, setShowQR, qrUrl} = useQR()
    const {isLogin} = useSelector(state => state.user)
    const userInfo = useSelector(state => state.user.userInfo)
    const navigate = useNavigate();
    //
    const handleSearch = async (value: string) => {
        try {
            //如果输入值为空 则显示热搜内容
            if (!value) {
                setOptions(hotKey);
                return;
            }
            //根据搜索关键词搜索并返回
            const suggestions = await getKeySuggets(value);
            setOptions(suggestions);
        } catch (error) {
            console.error('搜索建议获取失败:', error);
        }
    };
    //点击搜索建议中某项时触发
    const onSelect = (value: string) => {
        navigate(`/search?key=${value}`);
    }
    //初始化设置热搜列表
    useEffect(() => {
        if (hotKey) {
            setOptions(hotKey);
        }
    }, [hotKey]);
    return (
        <div className={'h-full w-90% m-auto flex items-center'}>
            <div className={'flex'}>
                {!isLogin && <Button onClick={() => setShowQR(true)}>登录</Button>}
                <Modal
                    title="请使用网易云APP扫码"
                    open={showQR}
                    onCancel={() => setShowQR(false)}
                    footer=""
                    width={300}
                >
                    <div className={'flex items-center justify-center mt-50px'}>
                        <QRCode value={qrUrl}/>
                    </div>
                </Modal>
            </div>
            <div className={'flex items-center'}>
                <LeftOutlined onClick={() => navigate(-1)} className={'h-full text-25px text-white mr-10px'}/>
                <AutoComplete
                    options={options}
                    placeholder={defaultKey}
                    onSearch={handleSearch}
                    onSelect={onSelect}
                    prefix={<SearchOutlined className={'text-gray'}/>}
                />
            </div>
        </div>
    )
}
export default FHeader;