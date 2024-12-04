import "./index.scss"
import { Spin, Table } from "antd"
import { debounce } from "lodash"
import { getLikeListAPI, likeSongAPI } from "@/apis/song.ts"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import usePlayingMusic from "@/hooks/usePlayingMusic.ts"
import { setPlayList } from "@/store/modules/playingStore.ts"
import classNames from "classnames"

function FSongList({ playList, isLoading }) {
  const { userInfo } = useAppSelector((state) => state.user)
  const [likeList, setLikeList] = useState([])
  const { setCurrentId } = usePlayingMusic()

  const songInfo = useAppSelector((state) => state.playing.songInfo)
  const dispatch = useAppDispatch()
  // 获取喜欢列表
  const fetchLikeList = useCallback(async () => {
    if (!userInfo?.userId) return
    try {
      const res = await getLikeListAPI(userInfo.userId)
      setLikeList(res.ids || [])
    } catch (error) {
      console.error("获取歌单失败:", error)
      setLikeList([])
    }
  }, [])
  useEffect(() => {
    fetchLikeList()
  }, [fetchLikeList])
  useEffect(() => {
    //如果切换了歌单 则将滚动条重置
    const element = document.querySelector(".overflow-y-scroll")
    if (element) {
      element.scrollTop = 0
    }
  }, [])

  // 创建防抖的API调用函数
  const debouncedLike = useMemo(
    () =>
      debounce(async (id: number, like: boolean) => {
        try {
          await likeSongAPI(String(id), like)
        } catch (error) {
          console.error("操作失败:", error)
          // 如果API调用失败，回滚状态
          setLikeList((prev) =>
            !like ? [...prev, id] : prev.filter((songId) => songId !== id),
          )
        }
      }, 300),
    [],
  )
  // 处理喜欢/取消喜欢
  const handleLike = (id: number, like: boolean) => {
    setLikeList((prev) =>
      like ? [...prev, id] : prev.filter((songId) => songId !== id),
    )
    debouncedLike(id, like)
  }
  // 播放音乐
  const playMusic = (index) => {
    //设置播放索引
    setCurrentId(index)
    //设置播放列表
    dispatch(setPlayList(playList))
  }
  //设置播放列表
  useEffect(() => {
    if (playList?.length > 0) {
      dispatch(setPlayList(playList))
    }
  }, [playList, dispatch])
  // 组件卸载时取消未执行的防抖函数
  useEffect(() => {
    return () => {
      debouncedLike.cancel()
    }
  }, [debouncedLike])

  //定义列数据
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "id",
      width: 50,
      render: (_, __, index) => {
        return String(index + 1).padStart(2, "0")
      },
    },
    {
      title: "标题",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className={"flex flex-col"}>
            {/*
                            使用classNames来动态判断是否需要高亮
                            判断依据：当前列的音乐id 是否等于store中的currentID
                        */}
            <span
              className={classNames("font-bold text-gray-3", {
                "text-#ff3d89 drop-shadow-[0_0_10px_#ff3d89]":
                  record.id === songInfo?.id,
              })}
            >
              {record.name}
            </span>

            <div className="font-bold text-13px text-gray-3">
              {record.ar?.map((item, index) => (
                <span
                  key={item.id}
                  className={classNames("font-bold text-13px text-gray-3", {
                    "text-#ff3d89 drop-shadow-[0_0_10px_#ff3d89]":
                      record.id === songInfo?.id,
                  })}
                >
                  {item.name}
                  {index < record.ar.length - 1 && " /"}{" "}
                </span>
              ))}
            </div>
          </div>
        )
      },
    },
    {
      title: "专辑",
      dataIndex: ["al", "name"],
      key: "al.name",
    },
    {
      title: "喜欢",
      width: 80,
      align: "center",
      key: "actions",
      render: (_, record) => {
        const isLiked = likeList.includes(record.id)
        return (
          <i
            onClick={(e) => {
              e.stopPropagation() // 阻止事件冒泡
              handleLike(record.id, !isLiked)
            }}
            // className={'iconfont cursor-pointer'}
            className={classNames("iconfont cursor-pointer text-gray-3", {
              "text-red-5": isLiked,
            })}
          >
            {isLiked ? "\ue8c3" : "\ue8ab"}
          </i>
        )
      },
    },
    {
      title: "时长",
      key: "duration",
      render: (_, record) => {
        const formatDuration = (dt: number) => {
          const minutes = Math.floor(dt / 1000 / 60)
          const seconds = Math.floor((dt / 1000) % 60)
          return `${minutes}:${seconds.toString().padStart(2, "0")}`
        }
        const time = formatDuration(record.dt)
        return <div>{time}</div>
      },
    },
  ]

  return (
    <Spin className={"h-full"} spinning={isLoading}>
      <div className={"flex h-100% overflow-hidden flex-col"}>
        {!isLoading &&
          (playList?.length > 0 ? (
            <Table
              className={"custom-table w-90% m-auto"}
              rowKey={(record) => record.id}
              bordered={false}
              dataSource={playList}
              rowClassName={(record) => {
                return classNames("", {
                  "row-active": record.id === songInfo?.id,
                })
              }}
              // @ts-ignore
              columns={columns}
              pagination={false}
              onRow={(_, index) => ({
                onDoubleClick: () => playMusic(index),
              })}
            />
          ) : (
            <div className="flex justify-center  h-full">歌单为空</div>
          ))}
      </div>
    </Spin>
  )
}

export default FSongList
// import "./index.scss"
// import { Spin } from "antd"
// import { debounce } from "lodash"
// import { getLikeListAPI, likeSongAPI } from "@/apis/song.ts"
// import { useCallback, useEffect, useMemo, useRef, useState } from "react"
// import { useAppSelector, useAppDispatch } from "@/store/hooks"
// import usePlayingMusic from "@/hooks/usePlayingMusic.ts"
// import { setPlayList } from "@/store/modules/playingStore.ts"
// import classNames from "classnames"
// import { useVirtualList } from "ahooks"

// function FSongList({ playList, isLoading }) {
//   const { userInfo } = useAppSelector((state) => state.user)
//   const [likeList, setLikeList] = useState([])
//   const { setCurrentId } = usePlayingMusic()
//   const containerRef = useRef(null)
//   const wrapperRef = useRef(null)

//   const songInfo = useAppSelector((state) => state.playing.songInfo)
//   const dispatch = useAppDispatch()

//   // 使用 useVirtualList
//   const [virtualList] = useVirtualList(playList || [], {
//     containerTarget: containerRef,
//     wrapperTarget: wrapperRef,
//     itemHeight: 53, // 每行的高度，根据实际情况调整
//     overscan: 10, // 预渲染的数量
//   })

//   // 获取喜欢列表
//   const fetchLikeList = useCallback(async () => {
//     if (!userInfo?.userId) return
//     try {
//       const res = await getLikeListAPI(userInfo.userId)
//       setLikeList(res.ids || [])
//     } catch (error) {
//       console.error("获取歌单失败:", error)
//       setLikeList([])
//     }
//   }, [userInfo?.userId])

//   useEffect(() => {
//     fetchLikeList()
//   }, [fetchLikeList])

//   useEffect(() => {
//     //如果切换了歌单 则将滚动条重置
//     if (containerRef.current) {
//       containerRef.current.scrollTop = 0
//     }
//   }, [playList])

//   // 创建防抖的API调用函数
//   const debouncedLike = useMemo(
//     () =>
//       debounce(async (id: number, like: boolean) => {
//         try {
//           await likeSongAPI(String(id), like)
//         } catch (error) {
//           console.error("操作失败:", error)
//           // 如果API调用失败，回滚状态
//           setLikeList((prev) =>
//             !like ? [...prev, id] : prev.filter((songId) => songId !== id),
//           )
//         }
//       }, 300),
//     [],
//   )

//   // 处理喜欢/取消喜欢
//   const handleLike = (id: number, like: boolean) => {
//     setLikeList((prev) =>
//       like ? [...prev, id] : prev.filter((songId) => songId !== id),
//     )
//     debouncedLike(id, like)
//   }

//   // 播放音乐
//   const playMusic = (index) => {
//     setCurrentId(index)
//     dispatch(setPlayList(playList))
//   }

//   //设置播放列表
//   useEffect(() => {
//     if (playList?.length > 0) {
//       dispatch(setPlayList(playList))
//     }
//   }, [playList, dispatch])

//   // 组件卸载时取消未执行的防抖函数
//   useEffect(() => {
//     return () => {
//       debouncedLike.cancel()
//     }
//   }, [debouncedLike])

//   return (
//     <Spin className={"h-full"} spinning={isLoading}>
//       <div className={"flex h-100% overflow-hidden flex-col"}>
//         {!isLoading &&
//           (playList?.length > 0 ? (
//             <div className="w-90% m-auto">
//               {/* 表头 */}
//               <div className="grid grid-cols-[50px_1fr_1fr_80px_100px] py-4 border-b border-gray-200 text-gray-3">
//                 <div>#</div>
//                 <div>标题</div>
//                 <div>专辑</div>
//                 <div className="text-center">喜欢</div>
//                 <div>时长</div>
//               </div>

//               {/* 虚拟列表容器 */}
//               <div
//                 ref={containerRef}
//                 style={{
//                   height: "calc(100vh - 200px)",
//                   overflow: "auto",
//                 }}
//               >
//                 <div ref={wrapperRef}>
//                   {virtualList.map(({ data: record, index }) => {
//                     return (
//                       <div
//                         key={record.id}
//                         className={classNames(
//                           "grid grid-cols-[50px_1fr_1fr_80px_100px] py-4 hover:bg-gray-100 cursor-pointer ",
//                           {
//                             "row-active": record.id === songInfo?.id,
//                           },
//                         )}
//                         onDoubleClick={() => playMusic(index)}
//                       >
//                         <div className="text-gray-3">
//                           {String(index + 1).padStart(2, "0")}
//                         </div>
//                         <div className="flex flex-col">
//                           <span
//                             className={classNames("font-bold text-gray-3", {
//                               "text-#ff3d89 drop-shadow-[0_0_10px_#ff3d89]":
//                                 record.id === songInfo?.id,
//                             })}
//                           >
//                             {record.name}
//                           </span>
//                           <div className="font-bold text-13px text-gray-3">
//                             {record.ar?.map((item, idx) => (
//                               <span
//                                 key={item.id}
//                                 className={classNames(
//                                   "font-bold text-13px text-gray-3",
//                                   {
//                                     "text-#ff3d89 drop-shadow-[0_0_10px_#ff3d89]":
//                                       record.id === songInfo?.id,
//                                   },
//                                 )}
//                               >
//                                 {item.name}
//                                 {idx < record.ar.length - 1 && " / "}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                         <div className="text-gray-3">{record.al?.name}</div>
//                         <div className="text-center">
//                           <i
//                             onClick={(e) => {
//                               e.stopPropagation()
//                               handleLike(
//                                 record.id,
//                                 !likeList.includes(record.id),
//                               )
//                             }}
//                             className={classNames(
//                               "iconfont cursor-pointer text-gray-3",
//                               {
//                                 "text-red-5": likeList.includes(record.id),
//                               },
//                             )}
//                           >
//                             {likeList.includes(record.id) ? "\ue8c3" : "\ue8ab"}
//                           </i>
//                         </div>
//                         <div className="text-gray-3">
//                           {(() => {
//                             const minutes = Math.floor(record.dt / 1000 / 60)
//                             const seconds = Math.floor((record.dt / 1000) % 60)
//                             return `${minutes}:${seconds.toString().padStart(2, "0")}`
//                           })()}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex justify-center h-full">歌单为空</div>
//           ))}
//       </div>
//     </Spin>
//   )
// }

// export default FSongList
