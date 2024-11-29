import { useAppSelector } from "@/store/hooks.ts"
import { getCommentByMusicIDAPI, getRecentlyCommentAPI } from "@/apis/song"
import { useEffect, useState } from "react"
import CommentItem from "./components/CommentItem"
const FComment = () => {
  const songInfo = useAppSelector((state) => state.playing.songInfo)
  const [page, setPage] = useState(1)
  const [cursor, setCursor] = useState("")
  const [hotCommentList, setHotCommentList] = useState([])
  const [recentlyComment, setRecentlyComment] = useState([])
  useEffect(() => {
    const getComment = async () => {
      if (songInfo?.id) {
        //热门评论
        const hot = await getCommentByMusicIDAPI(songInfo?.id)
        //最近评论
        const recently = await getRecentlyCommentAPI(songInfo?.id, page, cursor)
        setCursor(recently.data.cursor)
        setHotCommentList(hot?.data.comments)
        setRecentlyComment(recently?.data.comments)
      }
    }
    getComment()
  }, [songInfo?.id])

  //获取更多评论
  const getMoreComment = async () => {
    setPage(page + 1)
    const nextPage = page + 1
    const res = await getRecentlyCommentAPI(songInfo?.id, nextPage, cursor)
    //扩展运算符 合并旧评论和新评论
    setRecentlyComment([...recentlyComment, ...res.data.comments])
    setCursor(res.data.cursor)
  }
  return (
    <div className="h-full pt-4 text-white">
      <div className="w-90% m-auto">
        <h2>热门评论</h2>
        <CommentItem CommentList={hotCommentList} />
        <h2 className="mb-5">最新评论</h2>
        <CommentItem CommentList={recentlyComment} />
        <div
          onClick={getMoreComment}
          className="flex justify-center cursor-pointer pb-20px"
        >
          更多评论
        </div>
      </div>
    </div>
  )
}
export default FComment
