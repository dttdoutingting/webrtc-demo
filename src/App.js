import VideoElement from './VideoElement'
import './App.css'

function App() {
  //webrtc://113.31.109.36/live/test
  // `webrtc://106.75.32.7/live/haomo${item}`
  return (
    <div className="App">
      {[0, 1].map((item) => (
        <div className="video-item" key={item}>
          <VideoElement url="webrtc://113.31.109.36/live/test" />
        </div>
      ))}
    </div>
  )
}

export default App
