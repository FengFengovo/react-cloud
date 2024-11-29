import { useEffect } from "react"
import "../index.scss"
import { useNavigate } from "react-router-dom"
export default function UserPlayList({ playlist }) {
  const navigate = useNavigate()
  useEffect(() => {
    console.log(playlist)
  }, [playlist])
  const goPlayList = (id) => {
    navigate(`/playList?id=${id}`)
  }
  return (
    <div className="h-full flex flex-col ">
      <div className="text-white text-4">Ta的歌单</div>
      <div className="flex flex-wrap justify-between ">
        {playlist.map((item) => (
          <div key={item.id} className="my-2  w-200px truncate ">
            <div className="relative">
              <img
                onClick={() => goPlayList(item.id)}
                className="w-full rounded-2xl hover:cursor-pointer transition-all duration-300 hover:brightness-65 "
                src={item.coverImgUrl}
              />
              <div>
                <div className="text-white">{item.name}</div>
                <div className="text-gray-3">{item.trackCount}首</div>
              </div>
              <span className="absolute top-2 right-2 text-white px-2 text-sm">
                <i className="iconfont text-14px">&#xe688;</i>
                {item.playCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
