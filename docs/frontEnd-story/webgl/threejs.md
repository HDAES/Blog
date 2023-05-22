# Threejs基础

## 1.介绍

`threejs`的目的是创建一个易于使用、轻量级、跨浏览器的通用3D库。目前的版本只包括一个WebGL渲染器，但WebGPU（实验性）、SVG和CSS3D渲染器也可以作为附加组件使用。

## 2.如何使用

### 2.1安装

npm安装

```javascript
npm install three

// 方式 1: 导入整个 three.js核心库
import * as THREE from 'three';

const scene = new THREE.Scene();


// 方式 2: 仅导入你所需要的部分
import { Scene } from 'three';

const scene = new Scene();
```

Ad'dons(附加组件)

three.js的核心专注于3D引擎最重要的组件。其它很多有用的组件 —— 如控制器（control）、加载器（loader）以及后期处理效果（post-processing effect） —— 是 [examples/jsm](https://github.com/mrdoob/three.js/tree/dev/examples/jsm) 目录的一部分。它们被称为“示例”，虽然你可以直接将它们拿来使用，但它们也需要重新混合以及定制。这些组件和 three.js 的核心保持同步，而 npm 上类似的第三方包则由不同的作者进行维护，可能不是最新的。

```javascript
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const controls = new OrbitControls( camera, renderer.domElement );
```

### 2.2创建一个场景

为了真正能够让你的场景借助three.js来进行显示，我们需要以下几个对象：场景、相机和渲染器，这样我们就能透过摄像机渲染出场景。

```javascript
// 创建一个场景
const scene = new THREE.Scene();
// 创建一个透视相机（PerspectiveCamera）
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//设置位置
camera.position.set(100, 100, 220)

// 创建webgl 渲染器
const renderer = new THREE.WebGLRenderer({
    //设置抗锯齿
  antialias: true,
  //对数深度缓冲区
  logarithmicDepthBuffer: true,
});
// 设置渲染器大小
renderer.setSize( window.innerWidth, window.innerHeight);
// 设置设备像素比。通常用于避免HiDPI设备上绘图模糊
renderer.setPixelRatio(window.devicePixelRatio)
// 设置阴影贴图
renderer.shadowMap.enabled = true
// 获取需要挂在的dom节点
const container = ref<HTMLElement | null>(null)

// render 方法，使用请求动画帧函数重复调用
const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

// 首次进入挂在到节点上
onMounted(() => {
  container.value?.appendChild(renderer.domElement)
  render()
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {})
})
```

### 2.3创建一个几何体

```javascript
// 创建形状
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// 创建材质
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// 生成几何体
const cube = new THREE.Mesh( geometry, material );

// 把几何体添加到场景中 
scene.add( cube );
```

## 3.WebGL兼容性检查

虽然这个问题现在已经变得越来不明显，但不可否定的是，某些设备以及浏览器直到现在仍然不支持WebGL。

```javascript
if (WebGL.isWebGLAvailable()) {
    // Initiate function or other initializations here
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}
```

## 4.[文档地址](https://threejs.org/docs/)


## 5.[演示地址](https://stackblitz.com/edit/vitejs-vite-tmjde4?file=README.md)
<iframe id="iframe" width="100%" height="300" allowfullscreen="true" src="https://stackblitz.com/edit/vitejs-vite-tmjde4?file=README.md">  
 </iframe>
