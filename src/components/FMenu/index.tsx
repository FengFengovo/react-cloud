import "./index.scss"
import { Menu, MenuProps } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserPlayListAPI } from "@/apis/user.ts"
import { useAppSelector } from "@/store/hooks"

// 定义接口
interface PlayListItem {
  id: number
  name: string
}

const FMenu = () => {
  const navigation = useNavigate()

  const { userInfo } = useAppSelector((state) => state.user)
  const location = useLocation()
  const [uPlayList, setUPlayList] = useState<PlayListItem[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["/"])
  // 监听路由变化
  useEffect(() => {
    const element = document.querySelector(".scrollReset")
    if (element) {
      element.scrollTop = 0
    }
    const searchParams = new URLSearchParams(location.search)
    const playlistId = searchParams.get("id")
    if (playlistId) {
      setSelectedKeys([playlistId])
    } else {
      setSelectedKeys([location.pathname])
    }
  }, [location])
  const itemClick: MenuProps["onClick"] = ({ key }) => {
    const id = Number(key)
    if (!isNaN(id)) {
      navigation(`/playList?id=${id}`)
    } else {
      navigation(key)
    }
  }

  const getAllMenuItems = (): MenuProps["items"] => {
    const defaultItems: MenuProps["items"] = [
      {
        key: "/",
        label: "推荐",
        icon: <i className={"iconfont"}>&#xe618;</i>,
      },
      {
        key: "/recently",
        label: "最近播放",
        icon: <i className={"iconfont"}>&#xe676;</i>,
      },
      {
        type: "divider",
      },
    ]

    // 转换歌单为菜单项
    const playlistItems: MenuProps["items"] = uPlayList.map((item) => ({
      key: item.id,
      label: item.name,
    }))

    return [...defaultItems, ...playlistItems]
  }

  useEffect(() => {
    const getUserPlayList = async () => {
      try {
        if (userInfo?.userId) {
          const res = await getUserPlayListAPI(userInfo.userId)
          setUPlayList(res.playlist || [])
        }
      } catch (error) {
        console.error("获取歌单失败:", error)
        setUPlayList([])
      }
    }

    if (userInfo?.userId) {
      getUserPlayList()
    }
  }, [userInfo?.userId])

  return (
    <div>
      <div
        className={
          "h-60px text-25px text-white flex justify-center  line-height-85px font-['gete'] drag"
        }
      >
        Music
      </div>
      <Menu
        selectedKeys={selectedKeys}
        className={
          "h-full bg-[#1d1d1f]/95 backdrop-blur-md border-r border-white/5"
        }
        onClick={itemClick}
        mode="vertical"
        items={getAllMenuItems()}
      />
    </div>
  )
}

export default FMenu
