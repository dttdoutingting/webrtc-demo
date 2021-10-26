import { useEffect, useRef, useState } from 'react'
import JSWebrtc from './jswebrtc'

const VideoElement = ({ url }) => {
  const videoRef = useRef(null)
  const [videoVisible, setVideoVisible] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const playerRef = useRef(null)

  const bytesReceivedID = useRef(Number.MAX_SAFE_INTEGER)

  useEffect(() => {
    function start() {
      if (videoVisible && !playerRef.current) {
        playerRef.current = new JSWebrtc.Player(url, {
          video: videoRef.current,
          autoplay: true,
          onPlay: () => {
            setIsStart(true)
          },
        })
      }
    }

    function stop() {
      if (playerRef.current) {
        // 停止播放并清理相关的播放资源
        playerRef.current?.destroy()
        playerRef.current = null
        if (videoRef.current) {
          // const _height = videoRef.current.clientHeight
          videoRef.current.srcObject = null
          // videoRef.current.height = _height
        }
      }
    }

    start()

    // 断开重连
    const timerId = setInterval(async () => {
      const id = await playerRef.current.bytesReceivedId()
      if (id === bytesReceivedID.current) {
        setIsStart(false)
        stop()
        start()
      } else if (id < bytesReceivedID.current) {
        setIsStart(false)
      }
      bytesReceivedID.current = id
    }, 5000)

    return () => {
      stop()
      if (timerId) {
        clearInterval(timerId)
      }
    }
  }, [videoVisible, url])

  return (
    <video
      ref={(el) => {
        setVideoVisible(true)
        videoRef.current = el
      }}
      width={400}
      className={isStart ? '' : 'disbaled-video'}
    ></video>
  )
}

export default VideoElement
