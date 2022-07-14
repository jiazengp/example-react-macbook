import "./App.css"
import {
  Model,
  World,
  Camera,
  Group,
  useDocumentScroll,
  useWindowSize,
  usePreload
} from "lingo3d-react"
import { mapRange } from "@lincode/math"

const Game = () => {
  // document scroll hook
  // 文档滚动钩子
  const scroll = useDocumentScroll()

  // when scrollY is 0, screen angle is 110; when scrollY is 500, screen angle is 0
  // 当滚动Y为0时，屏幕角度为110；当滚动Y为500时，屏幕角度为0
  const screenAngle = mapRange(scroll.y, 0, 500, 110, 0, true)

  // when scrollY is 0, laptop rotation angle is 0; when scrollY is 500, laptop rotation angle is 30
  // 当滚动Y为0时，笔记本旋转角度为0；当滚动Y为500时，笔记本旋转角度为30
  const angle = mapRange(scroll.y, 0, 500, 0, 30)

  // when scrollY is 0, laptop z is 100; when scrollY is 500, laptop z is 200
  // 当滚动Y为0时，笔记本Z为100；当滚动Y为500时，笔记本Z为200
  const z = mapRange(scroll.y, 0, 500, 100, 200, true)

  // when window width is smaller than window height, change camera FOV to 100
  // 当窗口宽度小于窗口高度时，设置相机FOV为100
  const windowSize = useWindowSize()
  const fov = windowSize.width > windowSize.height ? 75 : 100

  return (
    <>
      <div style={{ fontSize: 50, textAlign: "center", marginTop: "50vh" }}>
        MacBook Pro
      </div>
      <div style={{ width: "100vw", height: "200vh" }} />

      <World
        position="fixed"
        color="transparent"
        defaultLight="studio"
        style={{ pointerEvents: "none" }}
        exposure={2}
      >
        <Group rotationY={angle}>
          {/* laptop body model */}
          {/* 笔记本机身模型 */}
          <Model
            src="body.glb"
            boxVisible={false}
            metalnessFactor={1}
            roughnessFactor={0.5}
          />

          {/* laptop screen model */}
          {/* 笔记本屏幕模型 */}
          <Model
            y={-45}
            z={-35}
            src="screen.glb"
            innerY={47}
            innerZ={-20}
            rotationX={screenAngle}
            boxVisible={false}
            metalnessFactor={1}
            roughnessFactor={0.5}
          />
        </Group>

        {/* camera */}
        {/* 相机 */}
        <Camera z={z} active fov={fov} />
      </World>
    </>
  )
}

// loading screen
// 加载屏幕
const App = () => {
  const progress = usePreload(["body.glb", "screen.glb"], "903kb")

  if (progress < 100)
    return <div className="loading">loading {Math.round(progress)}%</div>

  return <Game />
}

export default App
