import { useEffect, useState } from "react";
import ColorThief from "colorthief";
import "./index.scss";
import "@lrc-player/core/dist/style.css";
import { useAppSelector } from "@/store/hooks.ts";
import FLyric from "@/components/FLyric";
import FComment from "../FComment";

const FPopupPage = ({ isShow, onClose, audioRef, onPlayerReady }) => {
  const songInfo = useAppSelector((state) => state.playing.songInfo);
  const [backgroundColor, setBackgroundColor] = useState("rgb(33, 33, 33)");

  useEffect(() => {
    if (songInfo?.al?.picUrl) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = songInfo.al.picUrl;

      img.onload = () => {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        // 将RGB值转换为深色调
        const darkColor = color.map((c) => Math.floor(c * 0.6));
        setBackgroundColor(`rgb(${darkColor.join(",")})`);
      };
    }
  }, [songInfo?.al?.picUrl]);

  return (
    <div
      className={`overflow-auto scrollbar-hide popup-page scroll-type ${
        isShow ? "show" : ""
      }`}
      style={{ background: backgroundColor }}
    >
      <div className="flex flex-col h-screen scroll-item">
        <div className="fixed inset-0 bg-gradient-to-b ">
          {/* 添加渐变遮罩 */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,9)_100%)]" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent, ${backgroundColor})`,
            }}
          />
        </div>
        {/* 内容层 */}
        <FLyric
          onClose={onClose}
          audioRef={audioRef}
          onPlayerReady={onPlayerReady}
        />
      </div>
      {/* 评论 */}
      <div className="h-screen overflow-y-scroll scroll-item">
        <FComment />
      </div>
    </div>
  );
};

export default FPopupPage;
