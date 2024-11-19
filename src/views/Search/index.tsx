import FSongList from "@/components/FSongList";
import {useSearchParams} from "react-router-dom";

const Search =()=>{
    const [searchParams]= useSearchParams()
    //从路由参数中提取出关键字
    const key = searchParams.get('key');
    // 只在有 key 的时候才调用 useGetList
    return (
        <div className={'m-auto h-full overflow-y-auto '}>

            <div className={'text-white w-90% m-auto pl-12px py-30px text-30px'}>{key}的相关搜索如下</div>
            <div className={'h-full '}>
                <FSongList />
            </div>
        </div>
    )
}
export default Search;