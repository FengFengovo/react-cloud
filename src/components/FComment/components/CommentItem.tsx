import { Divider } from "antd";
import { Suspense } from "react";
import { useAppSelector } from "@/store/hooks";
import { likeCommentAPI } from "@/apis/song";
import classNames from "classnames";
export default function CommentItem({ CommentList }) {
  const songInfo = useAppSelector((state) => state.playing.songInfo);
  //给评论点赞
  const likeComment = async (id) => {
    await likeCommentAPI(songInfo.id, id);
  };

  return (
    <>
      {CommentList?.map((item) => {
        return (
          <Suspense key={item.commentId}>
            <div className="flex mt-4">
              <img
                className="w-40px h-40px rounded-full"
                src={item.user.avatarUrl}
              />
              <div className="ml-3 flex flex-col w-full">
                <div className="hover-cursor-pointer text-blue-3">
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
                          "iconfont ml-1 hover:text-white hover:cursor-pointer"
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
          </Suspense>
        );
      })}
    </>
  );
}
