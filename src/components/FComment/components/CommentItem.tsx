import { Divider, message } from "antd"
import { Fragment, useState } from "react"
import { useAppSelector } from "@/store/hooks"
import { likeCommentAPI } from "@/apis/song"
import { useNavigate } from "react-router-dom"
import classNames from "classnames"
import { useAppDispatch } from "@/store/hooks"
import { setshowPopurPage } from "@/store/modules/playingStore"

export default function CommentItem({ CommentList }) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const songInfo = useAppSelector((state) => state.playing.songInfo)
  // 添加点赞状态管理
  const [likedComments, setLikedComments] = useState({})
  const [likedCounts, setLikedCounts] = useState({})

  //给评论点赞
  const likeComment = async (id, liked, currentLikedCount) => {
    try {
      const status = liked ? 0 : 1
      await likeCommentAPI(songInfo.id, id, status)
      setLikedComments((prev) => ({
        ...prev,
        [id]: !liked,
      }))
      setLikedCounts((prev) => ({
        ...prev,
        [id]: liked ? currentLikedCount - 1 : currentLikedCount + 1,
      }))
      message.success(liked ? "已取消点赞" : "评论已点赞")
    } catch (error) {
      message.error("操作失败")
    }
  }

  //查看用户主页
  const checkUserHome = (item) => {
    //此时关闭歌词页面
    dispatch(setshowPopurPage(false))
    const { userId } = item.user
    navigate(`userhome?id=${userId}`)
  }

  return (
    <>
      {CommentList?.map((item) => {
        const iconUrl =
          item?.user?.vipRights?.redplus?.iconUrl ||
          item?.user?.vipRights?.associator?.iconUrl
        return (
          <Fragment key={item.commentId}>
            <div className="flex mt-4">
              <img
                className="w-40px h-40px rounded-full"
                src={item.user.avatarUrl}
                alt="avatar"
              />
              <div className="ml-3 flex flex-col w-full">
                <div
                  onClick={() => checkUserHome(item)}
                  className="hover-cursor-pointer text-blue-3 h-15px flex items-center w-fit"
                >
                  {item.user.nickname}
                  {iconUrl && <img className="h-full ml-2" src={iconUrl} />}
                </div>
                <div className="w-fit my-1 whitespace-pre-wrap">
                  {item.content}
                </div>
                <div className="flex w-full my-1 justify-between">
                  <div className="text-3 text-gray-3">{item.timeStr}</div>
                  <div className="text-gray-2">
                    <span
                      className={classNames("text-3 text-gray-3", {
                        "text-red-5":
                          likedComments[item.commentId] ?? item.liked,
                      })}
                    >
                      {/* 显示点赞数量 */}
                      {(likedCounts[item.commentId] ?? item.likedCount) > 0
                        ? (likedCounts[item.commentId] ?? item.likedCount)
                        : ""}
                      <i
                        onClick={() =>
                          likeComment(
                            item.commentId,
                            likedComments[item.commentId] ?? item.liked,
                            likedCounts[item.commentId] ?? item.likedCount,
                          )
                        }
                        className={classNames(
                          "iconfont ml-1  hover:cursor-pointer",
                          {
                            "text-red-5":
                              likedComments[item.commentId] ?? item.liked,
                          },
                        )}
                      >
                        &#xe6b4;
                      </i>
                    </span>
                    <span className="text-gray-3 ml-4">
                      <i className="iconfont hover:cursor-pointer">&#xe608;</i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Divider className="bg-white  opacity-20" />
          </Fragment>
        )
      })}
    </>
  )
}
