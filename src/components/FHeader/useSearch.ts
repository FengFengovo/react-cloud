import {getDefaultKeyAPI, getHotKeyAPI, getKeySuggestAPI} from "@/apis/search.ts";
import {useEffect, useState} from "react";


const useSearch = () => {
    const [defaultKey, setDefaultKey] = useState<string>();
    const [hotKey, setHotKey] = useState<{ value: string; label: string; }[]>();
    //获取默认搜索关键词
    const getDefaultKey = async () => {
        const res = await getDefaultKeyAPI();
        setDefaultKey(res.data.showKeyword)
    }
    //获取热搜关键词
    const getHotKey = async () => {
        const res = await getHotKeyAPI();
        console.log(res.data)
        //转换数据格式为 自动补全输入框所需的格式
        const options = res.data.map(item => ({
            value: item.searchWord,  // 用于搜索匹配
            label: item.searchWord   // 显示文本
        }));
        setHotKey(options);
    }
    //获取搜索建议
    const getKeySuggets = async (key) => {
        const res = await getKeySuggestAPI(key)
        console.log(res.result)
        return res.result.songs.map(item => ({
            value: item.name,  // 用于搜索匹配
            label: item.name, // 显示文本
            key: item.id
        }));
    }
    useEffect(() => {
        getDefaultKey()
        getHotKey()
    }, [])

    return {
        defaultKey,
        hotKey,
        getKeySuggets,
    }
}
export default useSearch;