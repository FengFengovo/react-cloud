import './index.scss'
import {Tabs, TabsProps} from 'antd';
import RecommendList from "@/views/Recommend/compenents/RecommendList.tsx";
import {useEffect, useState} from "react";
import {getResourceAPI} from "@/apis/recommend.ts";


const Recommend = () => {
    const [recommend, setRecommend] = useState([])
    //tabs
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '个性推荐',
            children:<RecommendList recommend={recommend}/>
        },
        {
            key: '2',
            label: '专属定制',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: '歌单',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: '排行榜',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '5',
            label: '歌手',
            children: 'Content of Tab Pane 3',
        },
    ];
    useEffect(() => {
        const getResource = async () => {
            const res = await getResourceAPI()
            setRecommend(res.recommend)
        }
        getResource()
    }, [])
    return (
        <div className={'flex m-auto h-90% w-90% bg-[#13131aff]'}>
            <Tabs className={'w-full'} items={items}></Tabs>
        </div>
    )
}
export default Recommend;