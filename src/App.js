import VideoElement from './VideoElement'
import './App.css'

function App() {
  //webrtc://113.31.109.36live/test/
  // `webrtc://106.75.32.7/live/haomo${item}`
  // webrtc://106.75.230.179/50913519/uaccessbox-p5dcqzjk__dev_video0_stream
  // webrtc://106.75.129.250/live/mogu_dev_video${item}

  return (
    <div className="App">
      {[0].map((item) => (
        <div className="video-item" key={item}>
          <VideoElement url="webrtc://106.75.32.7/live/yushi_dev_video2" />
        </div>
      ))}
    </div>
  )
}

export default App
