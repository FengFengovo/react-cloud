import FSongList from "@/components/FSongList";
import useGetList from "@/components/FSongList/useGetList.ts";
const  Recently  =()=>{
    const {playList,isLoading} = useGetList();
    return(
        <div className={'m-auto h-full overflow-y-scroll'}>
            <div className={'w-90% m-auto my-30px'}>
                <div className={'flex'}>
                    <i className={'iconfont text-120px text-[#fa3d49]'}>&#xe681;</i>
                    <div className={'text-white text-1.5em flex ml-20px items-center'}>
                        <span>为您保存近期播放的300首歌曲</span>
                    </div>
                </div>

            </div>
            <FSongList playList={playList} isLoading={isLoading}/>
        </div>
    )
}
export default Recently