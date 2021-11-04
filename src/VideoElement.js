import { useEffect, useRef, useState } from 'react'
import JSWebrtc from './jswebrtc'

const VideoElement = ({ url }) => {
  const videoRef = useRef(null)
  const [videoVisible, setVideoVisible] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const playerRef = useRef(null)
  // const [statsInfo, setStatsInfo] = useState([])

  const bytesReceived = useRef(Number.MAX_SAFE_INTEGER)

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
      // const id = await playerRef.current.bytesReceived()

      // bytesReceived.current = id

      if (playerRef.current && videoVisible) {
        try {
          const _arr = await playerRef.current.getStats()
          const idInfo = _arr.find((item) => item.key === 'bytesReceived')
          // setStatsInfo(_arr)
          if (idInfo.value === bytesReceived.current) {
            setIsStart(false)
            stop()
            start()
          } else if (idInfo.value < bytesReceived.current) {
            setIsStart(false)
          }

          bytesReceived.current = idInfo.value
        } catch (e) {
          setIsStart(false)
          console.error(e)

          stop()
          start()
        }
      }
    }, 2000)

    return () => {
      stop()
      if (timerId) {
        clearInterval(timerId)
      }
    }
  }, [videoVisible, url])

  return (
    <div>
      <video
        ref={(el) => {
          setVideoVisible(true)
          videoRef.current = el
        }}
        width={640}
        className={isStart ? '' : 'disbaled-video'}
      ></video>
      {/* <div>
        {statsInfo.map((item) => (
          <div key={item.key}>
            <strong>{item.key}:</strong> {item.value}
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default VideoElement
