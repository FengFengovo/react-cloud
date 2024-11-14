import './index.scss'
import { Slider } from "antd"

import PlayerLeft from "@/components/FPlayer/Left";
import PlayerRight from "@/components/FPlayer/Right";
import PlayerCenter from "@/components/FPlayer/Center";
const FPlayer = () => {
    // 创建对 audio 元素的引用
    return (
        <div className={'h-full w-full overflow-hidden nodrag'}>
            <div className={'w-full flex justify-center'}>
                <Slider
                    className={'w-99.5%'}
                    tooltip={{ open: false }}
                    // value={progress}
                    // onChange={handleSliderChange}
                />
            </div>
            <div className={'flex flex justify-between w-99%  m-auto rounded-xl overflow-hidden h-60px bg-[#212121ff]'}>
                <PlayerLeft/>
                <PlayerCenter/>
                <PlayerRight/>
            </div>

        </div>

    )
}

export default FPlayer