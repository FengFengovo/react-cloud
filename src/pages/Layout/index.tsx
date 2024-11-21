import {Layout} from 'antd';
import FMenu from "@/components/FMenu";
import './index.scss'
import {Outlet} from "react-router-dom";
import FPlayer from "@/components/FPlayer";
import FHeader from "@/components/FHeader";
import {useEffect} from "react";
import {loginStatusAPI} from "@/apis/user.ts";
import {changeLoginStatus, fetchUserInfo} from "@/store/modules/userStore.ts";
import {useDispatch} from "react-redux";

const {Header, Sider, Content} = Layout;

const CloudLayout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getStatus = async () => {
            const res = await loginStatusAPI();
            if (res.data.profile !== null) {
                dispatch(changeLoginStatus(true))
            } else {
                dispatch(changeLoginStatus(false))
            }
        }
        fetchUserInfo()
        getStatus()
    }, [])
    return (
        <Layout className={'h-100vh flex  flex'}>
            <Layout className={'flex h-full'}>
                <Sider className={'bg-[#1d1d1f] border-r border-white/5'} width={'205px'}>
                    <FMenu/>
                </Sider>
                <Layout>
                    <Header className={'bg-[#13131aff]'}>
                        <FHeader/>
                    </Header>
                    <Content className={'bg-[#13131aff]'}>
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
            <div className={'bg-player player h-65px  '}>
                <FPlayer/>
            </div>
        </Layout>
    )
}
export default CloudLayout