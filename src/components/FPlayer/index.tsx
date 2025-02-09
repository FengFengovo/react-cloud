import "./index.scss"
import { Slider } from "antd"

import PlayerLeft from "@/components/FPlayer/Left"
import PlayerRight from "@/components/FPlayer/Right"
import PlayerCenter from "@/components/FPlayer/Center"
import { useAppSelector } from "@/store/hooks"
import { useEffect, useRef, useState } from "react"
import FPopupPage from "@/components/FPopupPage"

import usePlayingMusic from "@/hooks/usePlayingMusic.ts"
import { useAppDispatch } from "@/store/hooks"
import { setshowPopurPage } from "@/store/modules/playingStore"

const FPlayer = () => {
  // 创建对 audio 元素的引用
  const dispatch = useAppDispatch()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentUrl = useAppSelector((state) => state.playing.currentUrl)
  const [progress, setProgress] = useState(0)
  const showPopurPage = useAppSelector((state) => state.playing.showPopurPage)
  const { playNextMusic } = usePlayingMusic()
  const songInfo = useAppSelector((state) => state.playing.songInfo)
  // 存储子组件方法
  const [playerMethods, setPlayerMethods] = useState<{
    syncIndex: () => void
  } | null>(null)

  useEffect(() => {
    if (currentUrl && audioRef.current) {
      audioRef.current.src = currentUrl
      audioRef.current.play().catch((err) => {
        console.error("播放失败:", err)
      })
    }
  }, [currentUrl])

  // 添加音频时间更新事件监听
  useEffect(() => {
    const audio = audioRef.current
    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime
      const duration = audio.duration
      if (duration > 0) {
        setProgress((currentTime / duration) * 100)
      }
    }
    audio?.addEventListener("timeupdate", handleTimeUpdate)
    //组件销毁移除时间更新监听器
    return () => {
      audio?.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [])

  // 接收子组件方法的回调
  const handlePlayerReady = (methods: { syncIndex: () => void }) => {
    setPlayerMethods(methods)
  }

  // 处理进度条改变
  const handleSliderChange = (value) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = (value / 100) * audio.duration
      setProgress(value)
      // 调用子组件的同步歌词方法
      playerMethods?.syncIndex()
    }
  }

  //监听音乐播放结束
  useEffect(() => {
    const audio = audioRef.current
    const handleEnded = () => {
      playNextMusic()
    }
    //添加时间监听器 在播放结束后自动切换到下一首
    if (audio) {
      audio.addEventListener("ended", handleEnded)
    }
    //组件销毁 移除监听器
    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleEnded)
      }
    }
  }, [playNextMusic])

  return (
    <div
      className={
        "h-full bg-[#212121ff] w-full flex flex-col overflow-hidden relative"
      }
    >
      {/* 播放器内容 - 提高层级 */}
      <div className={"w-full flex justify-center"}>
        <Slider
          className={"w-99.5%"}
          // 取消悬浮时候的进度提示
          tooltip={{ open: false }}
          value={progress}
          onChange={handleSliderChange}
        />
        <audio ref={audioRef} src={currentUrl} autoPlay={true} />
      </div>

      <div
        onClick={(e) => {
          // 如果点击的是背景（当前div），而不是其子元素
          if (e.target === e.currentTarget && songInfo) {
            dispatch(setshowPopurPage(true))
          }
        }}
        className={
          "flex flex justify-between w-99% m-auto rounded-xl overflow-hidden h-60px bg-[#212121ff]"
        }
      >
        <PlayerLeft />
        <PlayerCenter audioRef={audioRef} />
        <PlayerRight audioRef={audioRef} />
      </div>

      {/* 弹出层 */}
      <FPopupPage
        audioRef={audioRef}
        isShow={showPopurPage}
        onPlayerReady={handlePlayerReady}
      />
    </div>
  )
}

export default FPlayer
