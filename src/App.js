import VideoElement from './VideoElement'
import './App.css'

function App() {
  //webrtc://113.31.109.36/live/test
  // `webrtc://106.75.32.7/live/haomo${item}`
  // webrtc://106.75.230.179/50913519/uaccessbox-p5dcqzjk__dev_video0_stream

  return (
    <div className="App">
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <div className="video-item" key={item}>
          <VideoElement url={`webrtc://106.75.32.7/live/yushi_dev_video${item}`} />
        </div>
      ))}
    </div>
  )
}

export default App
