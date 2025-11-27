import { getArtistToplistAPI, Artist } from "@/apis/recommend"
import { useEffect, useState } from "react"
import { Tabs, Card, Avatar, Spin } from "antd"
import { UserOutlined, TrophyOutlined } from "@ant-design/icons"
import "./index.scss"

const { TabPane } = Tabs

export default function RankingList() {
  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(false)
  const [activeType, setActiveType] = useState(1)

  const regionTypes = [
    { key: 1, label: "华语" },
    { key: 2, label: "欧美" },
    { key: 3, label: "韩国" },
    { key: 4, label: "日本" },
  ]

  const getArtistToplist = async (type: number) => {
    setLoading(true)
    try {
      const res = await getArtistToplistAPI(type)
      setArtists(res.list.artists || [])
    } catch (error) {
      console.error("获取歌手榜失败:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getArtistToplist(activeType)
  }, [activeType])

  const handleTabChange = (key: string) => {
    setActiveType(Number(key))
  }

  const getRankClass = (index: number) => {
    if (index === 0) return "rank-first"
    if (index === 1) return "rank-second"
    if (index === 2) return "rank-third"
    return ""
  }

  return (
    <div className="ranking-list-container">
      <Tabs
        activeKey={String(activeType)}
        onChange={handleTabChange}
        centered
        className="region-tabs"
      >
        {regionTypes.map((region) => (
          <TabPane tab={region.label} key={String(region.key)} />
        ))}
      </Tabs>

      <Spin spinning={loading}>
        <div className="artist-list">
          {artists.map((artist, index) => (
            <Card key={artist.id} className="artist-card" hoverable>
              <div className="artist-content">
                <div className="rank-info pt-3">
                  <div className={`rank-number ${getRankClass(index)}`}>
                    <span>{index + 1}</span>
                  </div>
                  {artist.lastRank !== -1 && (
                    <div className="rank-change">
                      {artist.lastRank > index ? (
                        <span className="rank-up">
                          ↑ {artist.lastRank - index}
                        </span>
                      ) : artist.lastRank < index ? (
                        <span className="rank-down">
                          ↓ {index - artist.lastRank}
                        </span>
                      ) : (
                        <span className="rank-same">-</span>
                      )}
                    </div>
                  )}
                </div>

                <Avatar
                  size={64}
                  src={artist.picUrl}
                  icon={<UserOutlined />}
                  className="artist-avatar"
                />

                <div className="artist-info">
                  <div className="artist-name">{artist.name}</div>
                  {artist.alias && artist.alias.length > 0 && (
                    <div className="artist-alias">
                      ({artist.alias.join(" / ")})
                    </div>
                  )}
                  <div className="artist-stats">
                    <span>专辑: {artist.albumSize}</span>
                    <span className="ml-4">歌曲: {artist.musicSize}</span>
                  </div>
                </div>

                <div className="artist-score">
                  <div className="score-label">热度</div>
                  <div className="score-value">{artist.score || 0}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Spin>
    </div>
  )
}
