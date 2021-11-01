import VideoElement from './VideoElement'
import './App.css'

function App() {
  //webrtc://113.31.109.36/live/test
  // `webrtc://106.75.32.7/live/haomo${item}`
  // webrtc://106.75.230.179/50913519/uaccessbox-p5dcqzjk__dev_video0_stream

  return (
    <div className="App">
      {[0].map((item) => (
        <div className="video-item" key={item}>
          <VideoElement url="webrtc://box.ucloud.cn/50913519/uaccessbox-p5dcqzjk__dev_video0_stream" />
        </div>
      ))}
    </div>
  )
}

export default App
