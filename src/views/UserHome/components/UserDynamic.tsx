import { useEffect } from "react"

interface UserDynamicProps {
  userDynamic?: {
    events: Array<{
      actName?: string
      info: {
        commentThread: {
          commentCount: number
          likedCount: number
          shareCount: number
        }
      }
      pics: Array<{
        originUrl: string
      }>
      json: string
    }>
  }
}

export default function UserDynamic({ userDynamic }: UserDynamicProps) {
  useEffect(() => {
    console.log(userDynamic)
  }, [userDynamic])

  const renderDynamicContent = (jsonData: any) => {
    if (!jsonData) {
      return null
    }

    // 渲染歌曲信息
    if (jsonData.song) {
      const { song } = jsonData
      return (
        <div className="mb-2">
          <div className="text-lg font-semibold">{song.name}</div>
          <div className="text-sm text-gray-400">
            歌手: {song.artists?.map((artist: any) => artist.name).join(" / ")}
          </div>
          {song.album && (
            <div className="text-sm text-gray-400">专辑: {song.album.name}</div>
          )}
        </div>
      )
    }

    // 渲染专辑信息
    if (jsonData.album) {
      const { album } = jsonData
      return (
        <div className="mb-2">
          <div className="text-lg font-semibold">{album.name}</div>
          <div className="text-sm text-gray-400">
            艺人: {album.artists?.map((artist: any) => artist.name).join(" / ")}
          </div>
        </div>
      )
    }

    // 渲染 MV 信息
    if (jsonData.mv) {
      const { mv } = jsonData
      return (
        <div className="mb-2">
          <div className="text-lg font-semibold">{mv.name}</div>
          <div className="text-sm text-gray-400">
            艺人: {mv.artists?.map((artist: any) => artist.name).join(" / ")}
          </div>
        </div>
      )
    }

    // 渲染歌单信息
    if (jsonData.playlist) {
      const { playlist } = jsonData
      return (
        <div className="mb-2">
          <div className="text-lg font-semibold">{playlist.name}</div>
          <div className="text-sm text-gray-400">
            歌曲数: {playlist.trackCount} | 播放量: {playlist.playCount}
          </div>
          {playlist.description && (
            <div className="text-sm text-gray-300 mt-1">
              {playlist.description}
            </div>
          )}
        </div>
      )
    }

    // 渲染转发内容
    if (jsonData.msg) {
      return (
        <div className="mb-2">
          <div className="text-base">{jsonData.msg}</div>
        </div>
      )
    }

    // 渲染视频信息
    if (jsonData.video) {
      const { video } = jsonData
      return (
        <div className="mb-2">
          <div className="text-lg font-semibold">{video.title}</div>
          {video.description && (
            <div className="text-sm text-gray-300 mt-1">
              {video.description}
            </div>
          )}
        </div>
      )
    }

    return null
  }

  return (
    <div className="text-white h-full  h-full">
      <div>
        {userDynamic?.events.map((item, index) => {
          const jsonData = item.json ? JSON.parse(item.json) : null

          return (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded"
            >
              {/* 显示标签 */}
              {item.actName && (
                <div className="text-sm text-blue-400 mb-2">
                  #{item.actName}
                </div>
              )}

              {/* 显示解析后的内容 */}
              {renderDynamicContent(jsonData)}

              {/* 显示图片 */}
              {item.pics && item.pics.length > 0 && (
                <div className="flex gap-2 mb-2 flex-wrap">
                  {item.pics.map((pic, picIndex) => (
                    <img
                      key={picIndex}
                      src={pic.originUrl}
                      alt={`pic-${picIndex}`}
                      className="w-32 h-32 object-cover rounded"
                    />
                  ))}
                </div>
              )}

              {/* 显示互动数据 */}
              <div className="flex gap-6 text-sm text-gray-400 mt-3 items-center">
                <span className="flex items-center gap-1 cursor-pointer hover:text-blue-400 transition-colors">
                  <i className="iconfont" style={{ fontSize: "16px" }}>
                    &#xe608;
                  </i>
                  {item.info.commentThread.commentCount}
                </span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-red-400 transition-colors">
                  <i className="iconfont" style={{ fontSize: "16px" }}>
                    &#xe6b4;
                  </i>
                  {item.info.commentThread.likedCount}
                </span>
                <span className="flex items-center gap-1 cursor-pointer hover:text-green-400 transition-colors">
                  <i className="iconfont" style={{ fontSize: "16px" }}>
                    &#xe61e;
                  </i>
                  {item.info.commentThread.shareCount}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
