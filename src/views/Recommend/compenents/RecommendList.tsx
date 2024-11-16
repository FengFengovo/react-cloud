
import picImg from '@/assets/default.jpg'
import {useNavigate} from "react-router-dom";
function RecommendList({recommend}) {

    const navigate = useNavigate()

    return (

        <div className={'h-full w-full flex items-center justify-center'}>  {/* 新增外层容器 */}
            <div className={'flex flex-wrap gap-4'}>
                <div
                    onClick={()=>navigate('/dailySongs')}
                     className={'w-[calc(50%-8px)] sm:w-[calc(33.333%-12px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-16px)]'}>
                    <div>
                        <img
                            className={'w-full aspect-square object-cover rounded-lg hover:opacity-45'}
                            src={picImg}
                        />
                    </div>
                    <div className={'mt-2 text-sm truncate color-white'}>每日推荐</div>
                </div>
                {recommend.map(item => (
                    <div onClick={()=>navigate(`/playList?id=${item.id}`)} key={item.id}
                         className={'w-[calc(50%-8px)] sm:w-[calc(33.333%-12px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-16px)]'}>
                        <div>
                            <img
                                className={'w-full aspect-square object-cover rounded-lg hover:opacity-45'}
                                src={item.picUrl}
                                alt={item.name}
                            />
                        </div>
                        <div className={'mt-2 text-sm whitespace-normal color-white'}>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecommendList;