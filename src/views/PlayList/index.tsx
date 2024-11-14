import FSongList from "@/components/FSongList";
import {useSearchParams} from "react-router-dom";
import useGetList from "@/components/FSongList/useGetList.ts";
import dayjs from "dayjs";
function playList() {
    const [searchParams] = useSearchParams();
    const listID = searchParams.get('id');
    const {info} = useGetList(listID)
    console.log(info)
    return (
        <div className={'text-white h-full w-100% m-auto overflow-y-scroll'}>
            <div className={'w-90% m-auto bg-red flex'}>
                <div className={'flex'}>
                    <img className={'h-200px w-200px rounded-lg'} src={info?.coverImgUrl}/>
                </div>
                <div>
                    <div className={'text-17px font-bold'}>{info?.name}</div>
                    <div className={'text-14px'}>
                        {info?.description}
                    </div>
                    <div className={'text-14px flex items-center'}>
                        <img className={'w-30px rd-full'} src={info?.creator.avatarUrl}/>
                        <div>{info?.creator.nickname}</div>
                        <div>{dayjs(info?.createTime).format('YYYY-MM-DD')}</div>
                    </div>
                </div>
            </div>
            <FSongList listID={listID}/>
        </div>
    )
}

export default playList