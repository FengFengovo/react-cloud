import {AutoComplete, AutoCompleteProps, Avatar, Modal, Popover, QRCode} from "antd";
import './index.scss'
import useQR from "@/components/FHeader/useQR.ts";
import type {KeyboardEvent} from 'react';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from '@/store/hooks'
import {DeleteOutlined, LeftOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import useSearch from "@/components/FHeader/useSearch.ts";
import classNames from "classnames";
import {outLoginAPI} from "@/apis/user.ts";
import {changeLoginStatus} from "@/store/modules/userStore.ts";



const FHeader = () => {
    const [options, setOptions] = useState<AutoCompleteProps['options']>([])
    //输入框状态
    const [value, setValue] = useState<string>('')

    //气泡卡片状态
    const [popOpen, setPopOpen] = useState<boolean>(false)
    //搜索历史状态数据
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    //自动补全输入框状态
    const [open, setOpen] = useState<boolean>(false)
    const {defaultKey, hotKey, getKeySuggets} = useSearch()
    const {showQR, setShowQR, qrUrl} = useQR()
    const userInfo = useAppSelector(state => state.user.userInfo)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const handleSearch = async (value: string) => {
        try {
            //如果输入值为空 则显示热搜内容
            if (!value.trim()) {
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
    //删除历史搜索记录
    const deleteHistory = () => {
        localStorage.removeItem('searchHistory');
        setSearchHistory([])
    }
    //点击搜索建议中某项时触发
    const onSelect = (value: string) => {
        // 获取当前历史记录
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        // 将新搜索词添加到数组开头
        const newHistory = [value, ...history.filter(item => item !== value)].slice(0, 10);
        // 保存到 localStorage
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        // 更新状态
        setSearchHistory(newHistory);
        // 导航
        navigate(`/search?key=${value}`);
    };
    //初始化设置热搜列表
    useEffect(() => {
        if (hotKey) {
            setOptions(hotKey);
        }
        //初始化搜索历史
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        setSearchHistory(history);
    }, [hotKey]);
    // 键盘enter按下触发搜索
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            navigate(`/search?key=${value}`);
            setOpen(false)
        }
    };
    //退出登录逻辑
    const outLogin = async () => {
        await outLoginAPI()
        dispatch(changeLoginStatus(false))
        location.reload()
    }
    //关闭程序
    const closeWindow = () => {
        (window.ipcRenderer as  any).closeWindow()
    }
    //最小化程序
    const miniMize = () => {
        (window.ipcRenderer as any).minimizeWindow()
    }
    return (

        <div className={'h-full m-auto flex justify-between  drag'}>
            <Modal
                title="请使用网易云APP扫码"
                open={showQR}
                onCancel={() => setShowQR(false)}
                footer=""
                width={300}
            >
                <div className={'flex items-center justify-center mt-50px'}>
                    {qrUrl && <QRCode value={qrUrl}/>}
                </div>
            </Modal>
            <div className={'flex items-center'}>
                <LeftOutlined onClick={() => navigate(-1)} className={'h-full text-25px text-white mr-10px'}/>
                <AutoComplete
                    onKeyDown={handleKeyDown}
                    options={options}
                    placeholder={defaultKey}
                    onSearch={handleSearch}
                    onDropdownVisibleChange={(visible) => {
                        setOpen(visible);  // 控制下拉框显示/隐藏
                    }}
                    value={value}
                    onChange={setValue}
                    open={open}
                    // 自定义弹出框
                    dropdownRender={() => (
                        <div className="max-h-400px  overflow-auto  scrollbar-hide">
                            {searchHistory.length > 0 && value === '' &&
                                <div className={'ml-10px'}>
                                    <div className={'my-10px flex text-gray'}>历史搜索
                                        <DeleteOutlined onClick={deleteHistory}
                                                        className={'ml-auto mr-20px  text-gray-5 text-16px'}/>
                                    </div>
                                    <div className={'flex gap-2 flex-wrap'}>
                                        {searchHistory.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    onSelect(item)
                                                    setOpen(false)
                                                }}
                                                className={'bg-gray-2 text-gray h-30px flex justify-center items-center px-5px text-nowrap rounded-lg hover-bg-gray-3 hover:text-gray-9 transition-all duration-200 delay-30'}>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                            <div className=" h-40px flex items-center px-4">
                                {/*根据输入框内容是否为空来动态渲染列表头文字*/}
                                {value.trim() === '' ? '热搜榜' : '猜你想搜'}
                            </div>
                            <div className="py-2">
                                {options.map((item, index) => (
                                    <div
                                        onClick={() => {
                                            onSelect(item.value as string)
                                            setOpen(false)
                                        }}
                                        key={index}
                                        className="
                                            px-4 py-2  cursor-pointer flex items-center hover:bg-gray-2 rounded-lg"
                                    >
                                        <span
                                            className={classNames("mr-3 text-gray-5/60 w-20px text-center", {'text-red-5': index < 3})}>{index + 1}</span>
                                        <span>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    prefix={<SearchOutlined className={'text-gray'}/>}
                />

            </div>
            {
                userInfo ?
                    <div className={'items-center flex'}>
                        <img className={'h-30px w-30px rounded-full'} src={userInfo?.avatarUrl} alt={''}/>
                        <Popover
                            trigger={'click'}
                            arrow={false}
                            placement={"bottomRight"}
                            content={
                                <div onClick={outLogin} className={'cursor-pointer hover:text-red-5'}>
                                    退出登录
                                </div>
                            }
                        >
                        <span onClick={() => setPopOpen(!popOpen)}
                              className={'ml-5px text-gray-3 cursor-pointer hover:text-gray-1'}>
                            {userInfo?.nickname}
                        </span>
                        </Popover>
                    </div>
                    :
                    <div className={'items-center flex ml-20'}>
                        <Avatar className={'bg-gray'} size={'default'} icon={<UserOutlined/>}/>
                        <span onClick={() => setShowQR(true)}
                              className={'ml-5px text-gray-3 cursor-pointer hover:text-gray-1'}>
                            未登录
                        </span>
                    </div>
            }
            <div className={''}>
                <i className={'iconfont text-20px text-white hover:cursor-pointer hover:text-red-6'} onClick={miniMize}>&#xe607;</i>
                <i className={'iconfont text-20px text-white ml-5 hover:cursor-pointer hover:text-red-6 '} onClick={closeWindow}>&#xe660;</i>
            </div>
        </div>
    )
}
export default FHeader