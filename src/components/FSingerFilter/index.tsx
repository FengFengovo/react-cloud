import "./index.scss"
import { useEffect, useRef, useState } from "react"
import { getArtistListAPI } from "@/apis/singer"
import FSegmented from "../FSegmented"
import { useNavigate } from "react-router-dom"

const regionOptions = [
  { label: "全部", value: "-1" },
  { label: "华语", value: "7" },
  { label: "欧美", value: "96" },
  { label: "日本", value: "8" },
  { label: "韩国", value: "16" },
  { label: "其他", value: "0" },
]

const typeOptions = [
  { label: "全部", value: "-1" },
  { label: "男歌手", value: "1" },
  { label: "女歌手", value: "2" },
  { label: "乐队组合", value: "3" },
]
const letterOptions = Array.from({ length: 26 }, (_, i) => ({
  label: String.fromCharCode(65 + i), // 65 是大写字母 A 的 ASCII 码
  value: String.fromCharCode(97 + i), // 97 是小写字母 a 的 ASCII 码
}))
const initialOptions = [
  {
    label: "热门",
    value: "-1",
  },
  ...letterOptions,
  {
    label: "#",
    value: "0",
  },
]
export default function FSingerFilter() {
  //歌手类型状态
  const [type, setType] = useState<string | number>("-1")
  //歌手地区状态
  const [region, setRegion] = useState<string | number>("-1")
  //歌手首字母状态
  const [initial, setInitial] = useState<string | number>("-1")
  //歌手列表
  const [artistList, setArtistList] = useState([])
  const [page, setPage] = useState(0)
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  //获取歌手列表
  const getArtistList = async (currentPage = 0) => {
    const offset = currentPage * 30
    const res = await getArtistListAPI(type, region, initial, offset)
    //如果不是初始化数据 则将新旧数据合并
    currentPage > 0
      ? setArtistList((prev) => [...prev, ...res.artists])
      : setArtistList(res.artists)
  }
  useEffect(() => {
    //切换类型时 重置page
    setPage(0)
    getArtistList(0)
  }, [region, type, initial])
  //加载更多
  const loadingMore = async () => {
    //储存遍历 避免state异步导致问题
    const nextPage = page + 1
    setPage(nextPage)
    await getArtistList(nextPage)
  }
  //点击某个歌手item时跳转到对应歌手页
  const goSingerHome = (item) => {
    navigate("singerhome", {
      state: item,
    })
  }
  return (
    <div>
      <div className="flex flex-col gap-4">
        <FSegmented
          className="region"
          options={regionOptions}
          value={region}
          onChange={(value) => setRegion(value)}
        />
        <FSegmented
          className="type"
          options={typeOptions}
          value={type}
          onChange={(value) => setType(value)}
        />
        <FSegmented
          className="initial"
          options={initialOptions}
          value={initial}
          onChange={(value) => setInitial(value)}
        />
      </div>
      <div
        ref={ref}
        className="grid mt-10 grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 w-full"
      >
        {artistList?.map((item) => (
          <div
            onClick={() => goSingerHome(item)}
            key={item.id}
            className="flex-grow flex flex-col  hover:rounded-2xl hover:bg-white/7 cursor-pointer transition-all duration-300  hover:shadow-xl"
          >
            <img
              className="w-150px mt-4 m-auto object-cover aspect-square rounded-full"
              src={item.img1v1Url}
            />
            <div className="flex flex-col items-center mt-4 text-white">
              <div className="text-4">{item.name}</div>
              <div className="text-gray-3 text-3 mb-6">
                单曲：{item.musicSize}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={loadingMore}
        className="text-white flex justify-center py-3 cursor-pointer"
      >
        加载更多
      </div>
    </div>
  )
}
