
import { Layout } from 'antd';
import FMenu from "@/components/FMenu";
const { Header, Footer, Sider, Content } = Layout;
import './index.scss'
import {Outlet} from "react-router-dom";
import FPlayer from "@/components/FPlayer";
import FHeader from "@/components/FHeader";

const CloudLayout=()=>{
    return (
        <>
            <Layout className={'h-full'}>
                <Layout>
                    <Sider className={'bg-side'} width={'205px'}>
                        <FMenu/>
                    </Sider>
                    <Layout>
                        <Header className={'bg-green m-0 p-0 drag'}>
                            <FHeader/>
                        </Header>
                        <Content className={'bg-[#13131aff]'}>
                            <Outlet/>
                        </Content>
                    </Layout>
                </Layout>
                <Footer  className={'bg-player player p-0'}>
                    <FPlayer/>
                </Footer>
            </Layout>
        </>
    )
}
export default CloudLayout