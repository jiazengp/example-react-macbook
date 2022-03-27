import './App.css'
import { Model, World, Camera, Group, useDocumentScroll, useWindowSize, usePreload } from "lingo3d-react"
import { settings } from "lingo3d"
import { mapRange } from "@lincode/math"

settings.defaultLight = false

const Game = () => {
  const scroll = useDocumentScroll()
  const screenAngle = mapRange(scroll.y, 0, 500, 110, 0, true)
  const angle = mapRange(scroll.y, 0, 500, 0, 30)
  const z = mapRange(scroll.y, 0, 500, 100, 200, true)
  const windowSize = useWindowSize()
  const fov = windowSize.width > windowSize.height ? 75 : 100

  return (
    <>
      <div style={{ fontSize: 50, textAlign: "center", marginTop: "50vh" }}>MacBook Pro</div>
      <div style={{ width: "100vw", height: "200vh" }} />

      <World position="fixed" color="transparent" defaultLight="studio" style={{ pointerEvents: "none" }}>
        <Group rotationY={angle}>
          <Model src="body.glb" boxVisible={false} />
          <Model y={-45} z={-35} src="screen.glb" innerY={47} innerZ={-20} rotationX={screenAngle} boxVisible={false} />
        </Group>
        <Camera z={z} active fov={fov} />
      </World>
    </>
  )
}

const App = () => {
  const progress = usePreload(["body.glb", "screen.glb"], "903kb")

  if (progress < 100)
    return (
      <div className="loading">
        loading {Math.round(progress)}%
      </div>
    )

  return (
    <Game />
  )
}

export default App
