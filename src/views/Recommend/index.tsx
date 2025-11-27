import "./index.scss"
import { Tabs, TabsProps } from "antd"
import RecommendList from "@/views/Recommend/compenents/RecommendList.tsx"
import { useEffect, useState } from "react"
import { getResourceAPI } from "@/apis/recommend.ts"
import FSingerFilter from "@/components/FSingerFilter"
import RankingList from "./compenents/RankingList"

const Recommend = () => {
  const [recommend, setRecommend] = useState([])
  //tabs
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "个性推荐",
      children: <RecommendList recommend={recommend} />,
    },
    {
      key: "2",
      label: "排行榜",
      children: <RankingList />,
    },
    {
      key: "3",
      label: "歌手",
      children: <FSingerFilter />,
    },
  ]
  useEffect(() => {
    const getResource = async () => {
      const res = await getResourceAPI()
      setRecommend(res.recommend)
    }
    getResource()
  }, [])
  return (
    <div className={"flex m-auto overflow-y-auto h-full w=full bg-[#13131aff]"}>
      <Tabs className={"w-90% h-full m-auto"} items={items}></Tabs>
    </div>
  )
}
export default Recommend
