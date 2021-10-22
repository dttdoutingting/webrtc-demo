import { useEffect, useRef, useState } from 'react'
import JSWebrtc from './jswebrtc'

const VideoElement = ({ url }) => {
  const videoRef = useRef(null)
  const [videoVisible, setVideoVisible] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const playerRef = useRef(null)
  const statusRef = useRef(false)

  useEffect(() => {
    function start() {
      if (videoVisible) {
        playerRef.current = new JSWebrtc.Player(url, {
          video: videoRef.current,
          autoplay: true,
        })
      }
    }

    function stop() {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy()
        playerRef.current = null
        statusRef.current = false
        setIsStart(false)
      }
    }
    start()

    return () => {
      stop()
    }
  }, [videoVisible, url])

  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     const video = videoRef.current
  //     const playing =
  //       video && !(video.paused || video.ended || video.seeking || video.readyState < video.HAVE_FUTURE_DATA)
  //     console.log(playing)
  //     // if (!playing) {
  //     //   stop()
  //     //   start()
  //     // }
  //   }, 5000)

  //   return () => {
  //     if (timerId) {
  //       clearInterval(timerId)
  //     }
  //   }
  // }, [])

  return (
    <video
      ref={(el) => {
        setVideoVisible(true)
        videoRef.current = el
      }}
      width={400}
      className={!isStart ? 'disbaled-video' : ''}
    ></video>
  )
}

export default VideoElement
