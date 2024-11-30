import { useSearchParams } from "react-router-dom"
import "./index.scss"
import { ManOutlined, PlusOutlined, WomanOutlined } from "@ant-design/icons"
import { Tabs, TabsProps } from "antd"
import UserPlayList from "./components/UserPlayList"
import UseUserHome from "./UseUserHome"
import UserDynamic from "./components/UserDynamic"

export default function UserHome() {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("id")
  const { userInfo, userPlayList, userDynamic } = UseUserHome(userId)
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "歌单",
      children: <UserPlayList userPlayList={userPlayList} />,
    },
    {
      key: "2",
      label: "动态",
      children: <UserDynamic userDynamic={userDynamic} />,
    },
    {
      key: "3",
      label: "播客",
      children: "Content of Tab Pane 3",
    },
  ]

  return (
    <div className="h-full overflow-y-scroll w-100% m-auto pt-3 flex flex-col text-white">
      <div className="h-200px flex w-90% m-auto mb-5 ">
        <img
          className="h-full rounded-full"
          src={userInfo?.profile?.avatarUrl}
        />
        <div className="flex flex-col justify-around ml-5">
          <div className="text-5">{userInfo?.profile?.nickname}</div>
          <div className="text-3 flex">
            <span className="bg-gray-8 mr-2 rounded-md w-30px flex justify-center">
              Lv{userInfo?.level}
            </span>
            {userInfo?.profile?.gender === 1 ? (
              <span>
                <ManOutlined className="text-blue" />
              </span>
            ) : (
              <span>
                <WomanOutlined className="text-pink" />
              </span>
            )}
          </div>
          <div className="flex">
            <div>
              关注<span className="ml-1">{userInfo?.profile?.follows}</span>
            </div>
            <span className="mx-2 text-gray-6">|</span>
            <div>
              粉丝<span className="ml-1">{userInfo?.profile?.followeds}</span>
            </div>
          </div>
          {userInfo?.profile?.signature !== "" && (
            <div>简介：{userInfo?.profile?.signature}</div>
          )}
          <div>
            <button className="b-none w-80px h-35px rounded-lg text-white bg-red-5 hover:cursor-pointer">
              <PlusOutlined />
              <span>关注</span>
            </button>
          </div>
        </div>
      </div>
      <div className="h-full w-90% m-auto">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  )
}
