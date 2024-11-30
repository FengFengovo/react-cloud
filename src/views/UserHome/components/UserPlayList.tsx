import "../index.scss"
import { useNavigate } from "react-router-dom"

export default function UserPlayList({ userPlayList }) {
  const navigate = useNavigate()

  const goPlayList = (id) => {
    navigate(`/playList?id=${id}`)
  }
  return (
    <div className="h-full flex flex-col">
      <div className="text-white text-4">Ta的歌单</div>
      {userPlayList?.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 w-full">
          {userPlayList?.map((item) => (
            <div key={item.id} className="flex-grow">
              <div className="relative w-full aspect-square">
                <img
                  onClick={() => goPlayList(item.id)}
                  className="w-full h-full object-cover rounded-2xl hover:cursor-pointer transition-all duration-300 hover:brightness-65"
                  src={item.coverImgUrl}
                />
                <div>
                  <div className="text-white truncate mt-2">{item.name}</div>
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
      ) : (
        <div className="text-white h-full text-6">该用户未公布歌单哦~</div>
      )}
    </div>
  )
}
