import {Menu} from 'antd';
import {useNavigate} from "react-router-dom";

const items = [
    {
        key: '/',
        label: '推荐'
    },
    {
        key:'/songList',
        label:'歌曲列表'
    }
]
const FMenu = () => {
    const navigation= useNavigate()
    //菜单项路由跳转
    const itemClick=(value: any)=>{
        navigation(value.key)
    }
    return (
        <div>
            <div className={'h-60px text-20px flex justify-center items-center'}>
                网易云音乐
            </div>
            <Menu className={'h-full'} onClick={itemClick} mode="vertical" items={items}>
            </Menu>
        </div>
    )
}
export default FMenu