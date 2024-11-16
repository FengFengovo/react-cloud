
import { Layout } from 'antd';
import FMenu from "@/components/FMenu";
const { Header, Footer, Sider, Content } = Layout;
import './index.scss'
import {Outlet} from "react-router-dom";
import FPlayer from "@/components/FPlayer";
import FHeader from "@/components/FHeader";
import {useEffect, useState} from "react";
import {loginStatusAPI} from "@/apis/user.ts";
import {changeLoginStatus, fetchUserInfo} from "@/store/modules/userStore.ts";
import {useDispatch} from "react-redux";

const CloudLayout=()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const getStatus=async ()=>{
            const res =  await loginStatusAPI();
            if (res.profile!==null){
                dispatch(changeLoginStatus(true))
            }else {
                dispatch(changeLoginStatus(false))
            }
        }
        // @ts-ignore
        dispatch(fetchUserInfo())
        getStatus()
    },[])
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

                    <FPlayer />
                </Footer>
            </Layout>
        </>
    )
}
export default CloudLayout