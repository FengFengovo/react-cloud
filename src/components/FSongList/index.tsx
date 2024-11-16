
import './index.scss'
import { Spin, Table } from "antd";
import { debounce } from 'lodash';
import useGetList from "@/components/FSongList/useGetList.ts";
import { getLikeListAPI, likeSongAPI } from "@/apis/song.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import usePlayingMusic from "@/hooks/usePlayingMusic.ts";

interface FSongListProps {
    listID?: string;
}

function FSongList({ listID }: FSongListProps) {
    const { userInfo } = useSelector(state => state.user);
    const [likeList, setLikeList] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { playList } = useGetList(listID);
    const { playingUrl, setCurrentId } = usePlayingMusic();

    // 获取喜欢列表
    const fetchLikeList = useCallback(async () => {
        if (!userInfo?.userId) return;

        try {
            setIsLoading(true);
            const res = await getLikeListAPI(userInfo.userId);
            setLikeList(res.ids || []);
        } catch (error) {
            console.error('获取歌单失败:', error);
            setLikeList([]);
        } finally {
            setIsLoading(false);
        }
    }, [userInfo?.userId]);

    useEffect(() => {
        fetchLikeList();
    }, [fetchLikeList]);

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
    const playMusic = (id: string) => {
        setCurrentId(id);
    };

    // 组件卸载时取消未执行的防抖函数
    useEffect(() => {
        return () => {
            debouncedLike.cancel();
        };
    }, [debouncedLike]);

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
                        <span className={'font-bold color-gray-3'}>{record.name}</span>
                        <span className={'text-13px'}>{record.ar[0]?.name}</span>
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
        <Spin spinning={isLoading} className={'flex flex-col'}>
            <div className={'flex h-300px flex-col'}>
                {playList.length > 0 && (
                    <Table
                        className={'custom-table w-90% m-auto'}
                        rowKey={record => record.id}
                        bordered={false}
                        dataSource={playList}
                        columns={columns}
                        pagination={false}
                        onRow={(record) => ({
                            onDoubleClick: () => playMusic(record.id)
                        })}
                    />
                )}
            </div>
        </Spin>
    );
}

export default FSongList;