import {useState} from "react";
const PlayerCenter = () => {
    const [playerStatus, setPlayerStatus] = useState(true)
    const [loveStatus, setLoveStatus] = useState(true)
    return (
        <div className={'flex items-center'}>
            <i className="iconfont text-32px mx-40px">&#xe68c;</i>
            <i className="iconfont text-40px">&#xe63c;</i>
            {/*播放状态三目运算*/}
            { playerStatus?
                <i className="iconfont text-40px mx-40px" onClick={()=>setPlayerStatus(!playerStatus)}>&#xe63b;</i>
                :
                <i className="iconfont text-40px mx-40px" onClick={()=>setPlayerStatus(!playerStatus)}>&#xe63a;</i>
            }
            <i className="iconfont text-40px">&#xe63e;</i>
            {loveStatus ?
                <i className="iconfont text-30px mx-40px" onClick={() => setLoveStatus(!loveStatus)}>&#xe8ab;</i>
                :
                <i className="iconfont text-30px mx-40px" onClick={() => setLoveStatus(!loveStatus)}>&#xe8c3;</i>
            }
        </div>
    )
}
export default PlayerCenter;