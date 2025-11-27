import { useAppSelector } from "@/store/hooks"
import { Card, Descriptions, Avatar, Space, Typography } from "antd"
import { UserOutlined, CloseOutlined, MinusOutlined } from "@ant-design/icons"
import "./index.scss"

const { Title } = Typography

const UserInfo = () => {
  const userInfo = useAppSelector((state) => state.user.userInfo)

  // 关闭窗口
  const closeWindow = () => {
    ;(window.ipcRenderer as any).closeWindow()
  }

  // 最小化窗口
  const minimizeWindow = () => {
    ;(window.ipcRenderer as any).minimizeWindow()
  }

  if (!userInfo) {
    return (
      <div className={"user-info-container bg-black"}>
        {/* 自定义标题栏 */}
        <div className={"custom-titlebar"}>
          <div className={"titlebar-title pt-3 pl-3"}>用户信息</div>
          <div className={"titlebar-controls pr-3 pt-3 "}>
            <i
              className={
                "iconfont text-20px text-white hover:cursor-pointer hover:text-red-6"
              }
              onClick={minimizeWindow}
            >
              &#xe607;
            </i>
            <i
              className={
                "iconfont text-20px text-white ml-5 hover:cursor-pointer hover:text-red-6 "
              }
              onClick={closeWindow}
            >
              &#xe660;
            </i>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={"user-info-container"}>
      {/* 自定义标题栏 */}
      <div className={"custom-titlebar"}>
        <div className={"titlebar-title"}>用户信息</div>
        <div className={"titlebar-controls"}>
          <div className={"titlebar-button"} onClick={minimizeWindow}>
            <MinusOutlined />
          </div>
          <div className={"titlebar-button close"} onClick={closeWindow}>
            <CloseOutlined />
          </div>
        </div>
      </div>

      <div className={"user-info-content"}>
        <Card>
          <Space
            direction={"vertical"}
            size={"large"}
            style={{ width: "100%" }}
          >
            {/* 用户头像和基本信息 */}
            <div className={"text-center"}>
              <Avatar size={100} src={userInfo.avatarUrl} />
              <Title level={3} className={"mt-20px mb-0"}>
                {userInfo.nickname}
              </Title>
            </div>

            {/* 用户详细信息 */}
            <Descriptions title={"用户信息"} column={1} bordered>
              <Descriptions.Item label={"用户ID"}>
                {userInfo.userId}
              </Descriptions.Item>
              <Descriptions.Item label={"昵称"}>
                {userInfo.nickname}
              </Descriptions.Item>
              <Descriptions.Item label={"签名"}>
                {userInfo.signature || "暂无签名"}
              </Descriptions.Item>
              <Descriptions.Item label={"性别"}>
                {userInfo.gender === 1
                  ? "男"
                  : userInfo.gender === 2
                    ? "女"
                    : "保密"}
              </Descriptions.Item>
              <Descriptions.Item label={"生日"}>
                {userInfo.birthday
                  ? new Date(userInfo.birthday).toLocaleDateString()
                  : "未设置"}
              </Descriptions.Item>
              <Descriptions.Item label={"省份"}>
                {userInfo.province || "未设置"}
              </Descriptions.Item>
              <Descriptions.Item label={"城市"}>
                {userInfo.city || "未设置"}
              </Descriptions.Item>
            </Descriptions>

            {/* 这里可以添加更多自定义逻辑 */}
            <Card type={"inner"} title={"其他功能"}>
              <p className={"text-gray-5"}>
                在这里可以添加更多的用户相关功能，例如：
              </p>
              <ul className={"text-gray-5"}>
                <li>编辑个人资料</li>
                <li>查看收藏列表</li>
                <li>查看听歌记录</li>
                <li>账号设置</li>
                <li>等等...</li>
              </ul>
            </Card>
          </Space>
        </Card>
      </div>
    </div>
  )
}

export default UserInfo
