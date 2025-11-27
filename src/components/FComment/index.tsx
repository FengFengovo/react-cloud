import { useAppSelector } from "@/store/hooks.ts"
import { getCommentByMusicIDAPI, getRecentlyCommentAPI } from "@/apis/song"
import { useEffect, useState, useRef } from "react"
import CommentItem from "./components/CommentItem"

const FComment = () => {
  const songInfo = useAppSelector((state) => state.playing.songInfo)
  const [page, setPage] = useState(1)
  const [cursor, setCursor] = useState("")
  const [hotCommentList, setHotCommentList] = useState([])
  const [recentlyComment, setRecentlyComment] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    const getComment = async () => {
      if (songInfo?.id) {
        setLoading(true)
        try {
          // 热门评论
          const hot = await getCommentByMusicIDAPI(songInfo?.id)
          // 最近评论
          const recently = await getRecentlyCommentAPI(songInfo?.id, 1, cursor)
          setCursor(recently.data.cursor)
          setHotCommentList(hot?.data.comments)
          setRecentlyComment(recently?.data.comments)
          setHasMore(recently?.data.hasMore ?? true)
        } finally {
          setLoading(false)
        }
      }
    }
    // 歌曲切换 重置评论为第一页
    setPage(1)
    setCursor("")
    setHasMore(true)
    getComment()
  }, [songInfo?.id])

  // 获取更多评论
  const getMoreComment = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const nextPage = page + 1
      const res = await getRecentlyCommentAPI(songInfo?.id, nextPage, cursor)
      // 扩展运算符 合并旧评论和新评论
      setRecentlyComment([...recentlyComment, ...res.data.comments])
      setCursor(res.data.cursor)
      setPage(nextPage)
      setHasMore(res?.data.hasMore ?? true)
    } finally {
      setLoading(false)
    }
  }

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      // 当滚动到距离底部100px时触发加载
      if (scrollHeight - scrollTop - clientHeight < 100) {
        getMoreComment()
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [loading, hasMore, page, cursor, recentlyComment, songInfo?.id])

  return (
    <div ref={containerRef} className="h-full pt-4 text-white overflow-y-auto">
      <div className="w-90% m-auto">
        <h2>热门评论</h2>
        <CommentItem CommentList={hotCommentList} />
        <h2 className="mb-5">最新评论</h2>
        <CommentItem CommentList={recentlyComment} />
        <div className="flex justify-center pb-90px pt-30px text-gray-4">
          {loading && hasMore && "加载中..."}
          {!loading && !hasMore && "没有更多评论了"}
        </div>
      </div>
    </div>
  )
}

export default FComment
