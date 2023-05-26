# Threejs 利用uv移动实现传送带

## 1.搭建好`threejs`基础模板



## 2.使用`CatmullRomCurve3`生成一个环线

使用Catmull-Rom算法从一系列的点创建一个平滑的三维花键曲线。

```javascript
// 定义一个二维数组 表示每个传送带点位
const point = [
  [-200, 0, -100],
  [200, 0, -100],
  [200, 0, 50],
  [-200, 0, 50],
]

// 组装成Threejs坐标类型
const points: any[] = []
arr.forEach((item: number[]) => {
  points.push(new THREE.Vector3(...item))
})

// 创建一个 罗姆曲线
const curve = new THREE.CatmullRomCurve3(points)
curve.closed = true //设置是否闭环
curve.curveType = 'catmullrom'
curve.tension = 0 // 设置曲线的张力 设置0时为直线

const curvepoints = curve.getPoints(50)
const curvegeometry = new THREE.BufferGeometry().setFromPoints(curvepoints)
const curvematerial = new THREE.LineBasicMaterial({ color: 0xff0000 })

const curveObject = new THREE.Line(curvegeometry, curvematerial)
scene.add(curveObject)
```

## 3.使用`TubeGeometry`生成一条传送带

三维曲线挤出的管子

```javascript
// 加载传送带纹理贴图
const texture = new THREE.TextureLoader().load('/three/Conveyor-belt.png')
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
// uv两个方向纹理重复数量
texture.repeat.set(30, 2)
const tubeGeometry = new THREE.TubeGeometry(curve, 64, 6, 2, false)
const tubematerial = new THREE.MeshBasicMaterial({ map: texture })
const mesh = new THREE.Mesh(tubeGeometry, tubematerial)
scene.add(mesh)
```

# 4.利用`uv`移动使传送带动起来

```javascript
const render = (now: any) => {
  renderer.render(scene, camera)
  texture.offset.x -= 0.01
  requestAnimationFrame(render)
}
```

# 5.添加物体，使物体跟着传送带移动

```javascript
const loader = new GLTFLoader()
let nuts: any = null
loader.load('/three/metal_nuts/scene.gltf', (gltf) => {
  const object = gltf.scene
  object.scale.set(5, 5, 5)
  scene.add(object)
  nuts = object
})
const progress = 0 // 物体运动时在运动路径的初始位置，范围0~1
const velocitySpeed = 0.01
function moveOnCurve() {
  if (curve == null || nuts == null) {
    console.log('Loading')
  } else {
    if (progress <= 1 - velocitySpeed) {
      const point = curve.getPointAt(progress) //获取样条曲线指定点坐标
      const pointBox = curve.getPointAt(progress + velocitySpeed) //获取样条曲线指定点坐标

      if (point && pointBox) {
        nuts.position.set(point.x, 5, point.z)
        // model.lookAt(pointBox.x, pointBox.y, pointBox.z); //因为这个模型加载进来默认面部是正对Z轴负方向的，所以直接lookAt会导致出现倒着跑的现象，这里用重新设置朝向的方法来解决。

        var targetPos = pointBox //目标位置点
        var offsetAngle = 0 //目标移动时的朝向偏移

        // //以下代码在多段路径时可重复执行
        var mtx = new THREE.Matrix4() //创建一个4维矩阵
        // .lookAt ( eye : Vector3, target : Vector3, up : Vector3 ) : this,构造一个旋转矩阵，从eye 指向 target，由向量 up 定向。
        mtx.lookAt(nuts.position, targetPos, nuts.up) //设置朝向
        mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, offsetAngle, 0)))
        var toRot = new THREE.Quaternion().setFromRotationMatrix(mtx) //计算出需要进行旋转的四元数值
        nuts.quaternion.slerp(toRot, 0.2)
      }
      progress += velocitySpeed
    } else {
      progress = 0
    }
  }
}


const render = (now: any) => {
  renderer.render(scene, camera)
  texture.offset.x -= 0.01
  moveOnCurve()
  requestAnimationFrame(render)
}
```

