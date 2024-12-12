import { followSingerAPI } from "@/apis/singer"
import FSongList from "@/components/FSongList"
import useGetList from "@/components/FSongList/useGetList"
import { CheckOutlined, PlusOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useLocation } from "react-router-dom"

export default function SingerHome() {
  const { playList, isLoading } = useGetList()
  const location = useLocation()
  const singerInfo = location.state
  const [followStatus, setFollowStatus] = useState(singerInfo.followed)
  //关注/取关歌手
  const followSinger = async () => {
    const status = followStatus ? 0 : 1
    await followSingerAPI(singerInfo.id, status)
    setFollowStatus(status)
  }
  return (
    <div className="text-white h-full flex overflow-y-auto flex-col">
      <div className="h-200px flex w-90% ml-auto my-5 ">
        <img
          className="w-200px h-200px object-cover rounded-full"
          src={singerInfo?.img1v1Url}
        />
        <div className="flex flex-col justify-evenly ml-5">
          <div className="text-5">{singerInfo?.name}</div>
          <div className="text-3 flex">
            {singerInfo.alias.map((item, index) => (
              <span key={index} className="text-13px ">
                {item}
                {index !== singerInfo.alias.length - 1 ? " / " : ""}
              </span>
            ))}
          </div>
          <div>
            {followStatus ? (
              <button
                onClick={followSinger}
                className="b-none w-80px h-35px rounded-lg text-black bg-gray-2 hover:cursor-pointer"
              >
                <CheckOutlined />
                <span>已关注</span>
              </button>
            ) : (
              <button
                onClick={followSinger}
                className="b-none w-80px h-35px rounded-lg text-white bg-red-5 hover:cursor-pointer"
              >
                <PlusOutlined />
                <span>关注</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <FSongList playList={playList} isLoading={isLoading} />
    </div>
  )
}
