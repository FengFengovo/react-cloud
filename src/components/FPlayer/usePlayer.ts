// import {useEffect, useState,RefObject} from "react";
//
//
// function UsePlayer(audioRef?: RefObject<HTMLAudioElement>) {
//     // 管理播放状态
//     const [isPlaying, setIsPlaying] = useState(false)
//     // 管理进度
//     const [progress, setProgress] = useState(0)
//     // 管理音频总时长
//     const [duration, setDuration] = useState(0)
//     // 处理播放/暂停
//     const handlePlayPause = async() => {
//         try{
//             const audio=audioRef?.current
//             if (audio) {
//                 if (isPlaying) {
//                 await audio.pause()
//             } else {
//                 await audio.play()
//             }
//         }
//             setIsPlaying(!isPlaying)
//         }catch(e){
//             console.log(e);
//
//         }
//     }
//
// // 处理进度条变化
//     const handleSliderChange = (value: number) => {
//         if (audioRef!.current) {
//             const time = (value / 100) * duration
//             audioRef!.current.currentTime = time
//             setProgress(value)
//         }
//     }
//
// // 更新进度
//     useEffect(() => {
//         // const audio = audioRef!.current
//         // if (!audio) return
//         //
//         // // 当音频加载完成时获取总时长
//         // const handleLoadedMetadata = () => {
//         //     setDuration(audio.duration)
//         // }
//         //
//         // // 更新进度条
//         // const handleTimeUpdate = () => {
//         //     const progress = (audio.currentTime / audio.duration) * 100
//         //     setProgress(progress)
//         // }
//         //
//         // audio.addEventListener('loadedmetadata', handleLoadedMetadata)
//         // audio.addEventListener('timeupdate', handleTimeUpdate)
//         //
//         // return () => {
//         //     audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
//         //     audio.removeEventListener('timeupdate', handleTimeUpdate)
//         // }
//     }, [])
//     return{
//         isPlaying,
//         progress,
//         duration,
//         handlePlayPause,
//         handleSliderChange,
//     }
// }
// export default UsePlayer