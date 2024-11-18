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

const {Header, Footer, Sider, Content} = Layout;

const CloudLayout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getStatus = async () => {
            const res = await loginStatusAPI();
            if (res.profile !== null) {
                dispatch(changeLoginStatus(true))
            } else {
                dispatch(changeLoginStatus(false))
            }
        }
        // @ts-ignore
        dispatch(fetchUserInfo())
        getStatus()
    }, [])
    return (
        <Layout className={'h-100vh flex  flex'}>
            <Layout className={'flex h-full'}>
                <Sider className={'bg-side'} width={'205px'}>
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
            <div className={'bg-player player h-90px  '}>
                <FPlayer/>
            </div>
        </Layout>
    )
}
export default CloudLayout