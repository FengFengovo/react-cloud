import { getTopDetailAPI } from "@/apis/toplist"
import picImg from "@/assets/default.jpg"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function RecommendList({ recommend }) {
  const navigate = useNavigate()
  const [topList, setTopList] = useState([])
  useEffect(() => {
    const getTopDetail = async () => {
      const res = await getTopDetailAPI()
      setTopList(res.list)
    }
    getTopDetail()
  }, [])
  return (
    <div className={"h-full w-full flex flex-col items-center justify-center"}>
      <div className={"h-full flex flex-wrap gap-4"}>
        <div
          onClick={() => navigate("/dailySongs")}
          className={
            "w-[calc(50%-8px)] sm:w-[calc(33.333%-12px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-16px)]"
          }
        >
          <div>
            <img
              className={
                "w-full aspect-square object-cover rounded-lg hover:opacity-45"
              }
              src={picImg}
            />
          </div>
          <div className={"mt-2 text-sm truncate color-white"}>每日推荐</div>
        </div>
        {recommend?.map((item) => (
          <div
            onClick={() => navigate(`/playList?id=${item.id}`)}
            key={item.id}
            className={
              "w-[calc(50%-8px)] sm:w-[calc(33.333%-12px)] md:w-[calc(25%-12px)] lg:w-[calc(20%-16px)]"
            }
          >
            <div>
              <img
                className={
                  "w-full aspect-square object-cover rounded-lg hover:opacity-45"
                }
                src={item.picUrl}
                alt={item.name}
              />
            </div>
            <div className={"mt-2 text-sm whitespace-normal color-white"}>
              {item.name}
            </div>
          </div>
        ))}
      </div>
      {/* <div className=" w-full flex flex-wrap justify-between">
        {topList.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="w-[calc(50%-8px)] flex flex-col  my-2 bg-white h-140px rounded-2xl"
          >
            <div className="h-50px flex justify-between items-center">
              <span className="text-5 ml-4">{item.name}</span>
              <span className="mr-4 text-gray-4">{item.updateFrequency}</span>
            </div>
            <div className="ml-4 flex">
              <img className="h-80px rounded-xl" src={item.coverImgUrl} />
              <div className="ml-2 flex justify-between  flex-col">
                {item.tracks.map((item, index) => (
                  <div key={item.first} className="flex">
                    <span>{index + 1}</span>
                    <span className="ml-2">{item.first}</span>
                    <span className="ml-2">{item.second}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default RecommendList
