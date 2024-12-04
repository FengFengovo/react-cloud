import { Divider, message } from "antd"
import { Fragment } from "react"
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
  //给评论点赞
  const likeComment = async (id) => {
    await likeCommentAPI(songInfo.id, id)
    message.success("评论已点赞")
  }
  //打开评论框

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
        return (
          <Fragment key={item.commentId}>
            <div className="flex mt-4">
              <img
                className="w-40px h-40px rounded-full"
                src={item.user.avatarUrl}
              />
              <div className="ml-3 flex flex-col w-full">
                <div
                  onClick={() => checkUserHome(item)}
                  className="hover-cursor-pointer text-blue-3"
                >
                  {item.user.nickname}
                </div>
                <div>{item.content}</div>
                <div className="flex w-full my-2 justify-between">
                  <div className="text-3 text-gray-3">{item.timeStr}</div>
                  <div className="text-gray-2">
                    <span
                      className={classNames("text-3 text-gray-3", {
                        "text-red-5": item.liked,
                      })}
                    >
                      {item.likedCount > 0 ? item.likedCount : ""}
                      <i
                        onClick={() => likeComment(item.commentId)}
                        className={classNames(
                          "iconfont ml-1 hover:text-white hover:cursor-pointer",
                        )}
                      >
                        &#xe62a;
                      </i>
                    </span>
                    <span className="text-gray-3 ml-4">
                      <i className="iconfont">&#xe608;</i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
          </Fragment>
        )
      })}
    </>
  )
}
