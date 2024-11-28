import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { useEffect, useRef, useState } from "react";
import Player from "@lrc-player/core";
import { setIsPlaying } from "@/store/modules/playingStore.ts";
import { getLyricAPI } from "@/apis/song.ts";
import { parseLrc, parseYrc } from "@lrc-player/parse";

const FLyric = ({ onClose, audioRef, onPlayerReady }) => {
  const isPlaying = useAppSelector((state) => state.playing.isPlaying);
  const songInfo = useAppSelector((state) => state.playing.songInfo);
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);
  const playerRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  // 重置滚动条位置
  useEffect(() => {
    const element = document.querySelector(".y-player-container");
    if (element) {
      element.scrollTop = 0;
    }
  }, [songInfo?.id]);

  // 处理歌词播放器
  useEffect(() => {
    if (!songInfo?.id || !audioRef.current) return;
    // 清除旧的歌词容器内容
    const container = document.querySelector(".geci");
    if (container) {
      container.innerHTML = "";
    }
    // 创建新的播放器实例
    const player = new Player({
      click(time: number, index: number) {
        if (audioRef.current) {
          audioRef.current.currentTime = time;
          audioRef.current.play();
          dispatch(setIsPlaying(true));
          player.syncIndex(index);
        }
      },
    });
    // 挂载播放器
    if (container) {
      player.mount(container, audioRef.current);
    }
    // 将方法传递给父组件
    onPlayerReady?.({ syncIndex: () => player.syncIndex() });
    // 获取并设置歌词
    const getLyric = async () => {
      try {
        const res = await getLyricAPI(songInfo.id);
        const lyricData = res?.yrc?.lyric || res.lrc?.lyric;
        if (lyricData) {
          const lyrics = lyricData.replace(/^\{.*}$/gm, "").trim();
          const parsedLrc = res?.yrc?.lyric
            ? parseLrc(lyrics)
            : parseYrc(lyrics);
          const type = res?.yrc?.lyric ? "lrc" : "yrc";
          // 确保在更新歌词前清空旧的内容
          if (container) {
            container.innerHTML = "";
          }
          // 更新歌词
          // @ts-ignore
          player.updateAudioLrc(parsedLrc, type);
        }
      } catch (err) {
        console.error("获取歌词失败:", err);
      }
    };
    playerRef.current = player;
    setCurrentPlayer(player);
    // 获取歌词并开始播放
    getLyric();
    if (isPlaying) {
      player.play();
    }
    // 清理函数
    return () => {
      if (container) {
        container.innerHTML = "";
      }
      playerRef.current = null;
    };
  }, [songInfo?.id]);
  // 处理播放状态变化
  useEffect(() => {
    if (currentPlayer) {
      if (isPlaying) {
        currentPlayer.play();
      } else {
        currentPlayer.pause();
      }
    }
  }, [isPlaying]);
  //跳转到评论页面
  const goComment = () => {};
  return (
    <div className="relative z-10 container m-auto  h-full  ">
      {/* 歌曲信息 */}
      <div className="flex items-center justify-around h-full">
        {/* 关闭按钮 */}
        <div className={"flex flex-col"}>
          <i
            onClick={onClose}
            className="iconfont text-35px text-white  transition-all duration-500 hover:bg-white/8 hover:backdrop-blur-3xl cursor-pointer"
          >
            &#xe626;
          </i>
          <i
            onClick={goComment}
            className="iconfont mt-10px text-30px flex justify-center text-white  transition-all duration-500 hover:bg-white/8 hover:backdrop-blur-2xl cursor-pointer"
          >
            &#xe60a;
          </i>
        </div>

        {/*<i className={'iconfont text-white text-30px pt-20px'}>&#xe601;</i>*/}
        {/* 封面信息 */}
        <div>
          <img
            src={songInfo?.al?.picUrl}
            className="w-320px h-320px rounded-lg shadow-2xl transition-all duration-500"
            alt={songInfo?.name}
          />
          <div className={"mt-4"}>
            <span className="text-2xl text-white font-bold">
              {songInfo?.name}
            </span>
            <span className="mt-2 ml-20px text-white text-lg opacity-80">
              {songInfo?.ar?.[0]?.name}
            </span>
            <div className="text-1em text-gray-2 opacity-80">
              专辑：{songInfo?.al?.name}
            </div>
          </div>
        </div>
        {/* 歌词容器 */}
        <div className="text-center text-white h-400px">
          <div className="geci overflow-auto h-full scroll-hidden" />
        </div>
      </div>
    </div>
  );
};
export default FLyric;
