import './index.scss'
import {Table} from "antd";
import {useEffect, useState} from "react";
import useGetList from "@/components/FSongList/useGetList.ts";

const columns = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'id',
        width: 50,
        render: (_, __, index) => {
            // 将索引+1，并格式化为两位数
            return String(index + 1).padStart(2, '0');
        }
    },
    {
        title: '标题',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => {
            return (
                <div className={' flex flex-col'}>
                    <span className={'font-bold color-gray-3'}>{record.name}</span>
                    <span className={'text-13px'}>{record.ar[0].name}</span>
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
        key: 'al.name',
        render: (_, __) => {
            return (
                <i className={'iconfont'}>&#xe8ab;</i>
            )

        }
    },
    {
        title: '时长',
        key: 'al.name',
        render: (_, record) => {
            const formatDuration = (dt: number) => {
                const minutes = Math.floor(dt / 1000 / 60);
                const seconds = Math.floor((dt / 1000) % 60);
                return `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            const time = formatDuration(record.dt)
            return (
                <div>{time}</div>
            )

        }
    },


];

function FSongList({listID}) {
    const {playList} = useGetList(listID)
    return (
        <div className={'h-full'}>
            {playList.length > 0 &&
                <Table
                    className={'custom-table w-90% m-auto'}
                    rowKey={record => record.id || record.key} bordered={false} dataSource={playList}
                    columns={columns}
                    pagination={false}/>
            }
        </div>
    )
}

export default FSongList