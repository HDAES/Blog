# Threejs常用组件

## 1.轨道控制器（OrbitControls）

Orbit controls（轨道控制器）可以使得相机围绕目标进行轨道运动。

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
...
//添加控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 将其设置为true以启用阻尼（惯性），这将给控制器带来重量感。默认值为false。
// 请注意，如果该值被启用，你将必须在你的动画循环里调用.update()。
controls.enableDamping = true

const render = (now: any) => {
 
  renderer.render(scene, camera)
  controls.update();
  requestAnimationFrame(render)
}
```

## 2.AxesHelper

用于简单模拟3个坐标轴的对象.红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.

```javascript
// 设置轴线段长度
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
```

## 3.Stats

提供了一个简单的信息框，可以帮助你监控你的代码性能

```javascript
import Stats from 'three/addons/libs/stats.module.js'

const stats = new Stats()
document.body.appendChild(stats.dom)

const render = (now: any) => {
 stats.update()
  ...
}
```

## 4.GUI

主要作用，获取一个对象和该对象上的属性名，并根据属性的类型自动生成一个界面组件来操作该属性,使用它后，我们可以通过界面组件来控制场景中的物体，提高调试效率；[官方文档](https://lil-gui.georgealways.com/)

```javascript
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

const gui = new GUI()
// 设置控制器的位置大小
gui.domElement.style.right = '0px'
gui.domElement.style.width = '300px'

obj = {
	myBoolean: true,
	myString: 'lil-gui',
	myNumber: 1,
	myFunction: function() { alert( 'hi' ) }
}

gui.add( obj, 'myBoolean' ); 	// checkbox
gui.add( obj, 'myString' ); 	// text field
gui.add( obj, 'myNumber' ); 	// number field
gui.add( obj, 'myFunction' ); 	// button
```
