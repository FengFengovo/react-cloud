import FSongList from "@/components/FSongList"
import useGetList from "@/components/FSongList/useGetList.ts"
import dayjs from "dayjs"

function PlayList() {
  const { info, playList, isLoading } = useGetList()
  return (
    info && (
      <div
        className={
          "text-white flex flex-col h-full w-100% m-auto overflow-y-scroll "
        }
      >
        <div className={"w-90% m-auto flex mt-20px my-20px"}>
          <div className={"flex"}>
            <img
              className={"h-200px w-200px rounded-xl"}
              src={info?.coverImgUrl}
            />
          </div>
          <div className={"flex flex-col justify-around ml-15px"}>
            <div className={"text-17px iconfont-bold"}>{info?.name}</div>
            <div className={"text-14px text-gray"}>{info?.description}</div>
            <div className={"text-14px flex items-center"}>
              <img className={"w-30px rd-full"} src={info?.creator.avatarUrl} />
              <div className={"mx-10px"}>{info?.creator.nickname}</div>
              <div>{dayjs(info?.createTime).format("YYYY-MM-DD")}创建</div>
            </div>
          </div>
        </div>
        <div className={"h-full"}>
          <FSongList isLoading={isLoading} playList={playList} />
        </div>
      </div>
    )
  )
}

export default PlayList
