import FSongList from "@/components/FSongList";
import './index.scss'
import {Button} from "antd";
import useGetList from "@/components/FSongList/useGetList.ts";
const dateIconMap: Record<number, string> = {
    1: '\ue600',   // 日历1
    2: '\ue601',   // 日历2
    3: '\ue603',   // 日历3
    4: '\ue602',   // 日历4
    5: '\ue604',   // 日历5
    6: '\ue60d',   // 日历6
    7: '\ue605',   // 日历7
    8: '\ue606',   // 日历8
    9: '\ue608',   // 日历9
    10: '\ue60a',  // 日历10
    11: '\ue607',  // 日历11
    12: '\ue609',  // 日历12
    13: '\ue60b',  // 日历13
    14: '\ue60c',  // 日历14
    15: '\ue60e',  // 日历15
    16: '\ue610',  // 日历16
    17: '\ue60f',  // 日历17
    18: '\ue611',  // 日历18
    19: '\ue612',  // 日历19
    20: '\ue614',  // 日历20
    21: '\ue613',  // 日历21
    22: '\ue616',  // 日历22
    23: '\ue618',  // 日历23
    24: '\ue615',  // 日历24
    25: '\ue617',  // 日历25
    26: '\ue61a',  // 日历26
    27: '\ue619',  // 日历27
    28: '\ue61c',  // 日历28
    29: '\ue61b',  // 日历29
    30: '\ue61e',  // 日历30
    31: '\ue61d'   // 日历31
};
const Daily = () => {
    const {isLoading,playList} = useGetList();
    // 获取当前日期
    const today = new Date().getDate(); // 获取当月的第几天（1-31）

    return (
        <div className={'bg-[#13131aff] h-full  flex-col overflow-y-scroll'}>
            <div className={'w-90% m-auto my-20px flex flex-col'}>
                <div className={'flex items-center'}>
                    <i className={'iconfont1 text-100px text-[#fa3d49]'}>{dateIconMap[today]}</i>
                    <div className={'flex flex-col justify-center ml-10px'}>
                        <div className={'color-white text-30px iconfont-bold'}>每日歌曲推荐</div>
                        <div className={'color-gray-3'}>根据您的口味推荐，每天6:00更新</div>
                    </div>
                </div>
                <div className={'ml-8px mt-10px'}>
                    <Button size={"large"} className={'play-all-btn mr-20px' }>播放全部</Button>
                    <Button size={"large"} className={'love-all-btn' }>喜欢全部</Button>
                </div>
            </div>
            <FSongList playList={playList} isLoading={isLoading}/>
        </div>
    )
}
export default Daily;