import FSongList from "@/components/FSongList";
const  Recently  =()=>{
    return(
        <div className={'m-auto h-full overflow-y-scroll'}>
            <div className={'w-90% m-auto my-30px'}>
                <div className={'flex'}>
                    <i className={'iconfont text-120px'}>&#xe681;</i>
                    <div className={'text-white text-1.5em flex ml-20px items-center'}>
                        <span>为您保存近期播放的300首歌曲</span>
                    </div>
                </div>

            </div>


            <FSongList/>
        </div>
    )
}
export default Recently