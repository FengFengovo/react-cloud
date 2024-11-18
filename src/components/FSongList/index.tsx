import './index.scss'
import {Spin, Table} from "antd";
import {debounce} from 'lodash';
import useGetList from "@/components/FSongList/useGetList.ts";
import {getLikeListAPI, likeSongAPI} from "@/apis/song.ts";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import usePlayingMusic from "@/hooks/usePlayingMusic.ts";
import {setPlayList} from "@/store/modules/playingStore.ts";
import classNames from "classnames";

function FSongList() {
    const {userInfo} = useSelector(state => state.user);
    const [likeList, setLikeList] = useState<number[]>([]);
    const {playList, isLoading} = useGetList();
    const {setCurrentId} = usePlayingMusic();
    const songInfo = useSelector(state => state.playing.songInfo);
    const dispatch = useDispatch()
    // 获取喜欢列表
    const fetchLikeList = useCallback(async () => {
        if (!userInfo?.userId) return;
        try {
            const res = await getLikeListAPI(userInfo.userId);
            setLikeList(res.ids || []);
        } catch (error) {
            console.error('获取歌单失败:', error);
            setLikeList([]);
        }
    }, [userInfo?.userId]);
    useEffect(() => {
        fetchLikeList();
    }, [fetchLikeList]);
    useEffect(() => {
        //如果切换了歌单 则将滚动条重置
        const element = document.querySelector('.overflow-y-scroll');
        if (element) {
            element.scrollTop = 0;
        }
    }, []);
    // 创建防抖的API调用函数
    const debouncedLike = useMemo(() => debounce(async (id: number, like: boolean) => {
        try {
            await likeSongAPI(String(id), like);
        } catch (error) {
            console.error('操作失败:', error);
            // 如果API调用失败，回滚状态
            setLikeList(prev =>
                !like
                    ? [...prev, id]
                    : prev.filter(songId => songId !== id)
            );
        }
    }, 300), []);
    // 处理喜欢/取消喜欢
    const handleLike = (id: number, like: boolean) => {
        setLikeList(prev =>
            like
                ? [...prev, id]
                : prev.filter(songId => songId !== id)
        );
        debouncedLike(id, like);
    };
    // 播放音乐
    const playMusic = (index) => {
        //设置播放索引
        setCurrentId(index);
        //设置播放列表
        // @ts-ignore
        dispatch(setPlayList(playList))
    };
    //设置播放列表
    useEffect(() => {

        if (playList?.length > 0) {
            // @ts-ignore
            dispatch(setPlayList(playList));
        }
    }, [playList, dispatch]);
    // 组件卸载时取消未执行的防抖函数
    useEffect(() => {
        return () => {
            debouncedLike.cancel();
        };
    }, [debouncedLike]);
    //定义列数据
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'id',
            width: 50,
            render: (_, __, index) => {
                return String(index + 1).padStart(2, '0');
            }
        },
        {
            title: '标题',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                return (
                    <div className={'flex flex-col'}>
                        {/*
                            使用classNames来动态判断是否需要高亮
                            判断依据：当前列的音乐id 是否等于store中的currentID
                        */}
                        <span
                            className={classNames('font-bold text-gray-3', {'text-red': record.id === songInfo?.id})}>{record.name}
                        </span>

                        <span
                            className={classNames('font-bold  text-13px text-gray-3 ', {'text-red': record.id === songInfo?.id})}>{record.ar[0]?.name}
                        </span>
                    </div>
                )
            }
        },
        {
            title: '专辑',
            dataIndex: ['al', 'name'],
            key: 'al.name',
        },
        {
            title: '操作',
            width: 80,
            align: 'center',
            key: 'actions',
            render: (_, record) => {
                const isLiked = likeList.includes(record.id);
                return (
                    <i
                        onClick={(e) => {
                            e.stopPropagation();  // 阻止事件冒泡
                            handleLike(record.id, !isLiked);
                        }}
                        className={'iconfont cursor-pointer'}
                    >
                        {isLiked ? '\ue8c3' : '\ue8ab'}
                    </i>
                );
            }
        },
        {
            title: '时长',
            key: 'duration',
            render: (_, record) => {
                const formatDuration = (dt: number) => {
                    const minutes = Math.floor(dt / 1000 / 60);
                    const seconds = Math.floor((dt / 1000) % 60);
                    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
                }
                const time = formatDuration(record.dt)
                return <div>{time}</div>
            }
        },
    ];

    if (!userInfo?.userId) {
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                请先登录
            </div>
        );
    }

    return (
        <Spin className={'h-full'} spinning={isLoading}>
            <div className={'flex h-100% overflow-hidden flex-col'}>
                {playList !== null &&
                    <Table
                        className={'custom-table w-90% m-auto'}
                        rowKey={record => record.id}
                        bordered={false}
                        dataSource={playList}
                        // 通过这个属性来添加class类名 播放时 row 的样式
                        rowClassName={(record)=>{
                            return classNames('',{ 'row-active':record.id === songInfo?.id})
                        }}
                        columns={columns}
                        pagination={false}
                        onRow={(_, index) => ({
                            onDoubleClick: () => playMusic(index)
                        })}
                    />
                }

            </div>
        </Spin>

    );
}

export default FSongList;