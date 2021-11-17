import { useEffect, useRef, useState } from 'react'
import JSWebrtc from './jswebrtc'

const VideoElement = ({ url }) => {
  const videoRef = useRef(null)
  const [videoVisible, setVideoVisible] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const playerRef = useRef(null)
  // const [statsInfo, setStatsInfo] = useState([])
  const num = useRef(0)
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
        setIsStart(false)
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
      if (playerRef.current) {
        if (
          videoRef.current.paused ||
          videoRef.current.ended ||
          videoRef.current.seeking ||
          videoRef.current.readyState < videoRef.current.HAVE_FUTURE_DATA
        ) {
          stop()
          start()

          return
        }

        const _info = await playerRef.current.getStats((e) => {
          console.error(e.name + ': ' + e.message)
          num.current = 0
          stop()
          start()
        })

        if (_info.bytesReceived === bytesReceived.current && videoVisible && url) {
          num.current++
          if (num.current > 3) {
            num.current = 0
            stop()
            start()
          }

          // setIsStart(false)
        } else {
          num.current = 0
          bytesReceived.current = _info?.bytesReceived || Number.MAX_SAFE_INTEGER
        }
      }
    }, 3000)
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
        width={320}
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
