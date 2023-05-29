# CSS  `filter`基本用法

## 1.`filter`介绍

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)属性 **`filter`** 将模糊或颜色偏移等图形效果应用于元素。滤镜通常用于调整图像、背景和边框的渲染。

<iframe id="iframe" width="100%" height="300" allowfullscreen="true" src="https://interactive-examples.mdn.mozilla.net/pages/css/filter.html">  
 </iframe>

## 2.常用语法

```css
/* URL to SVG filter */
filter: url("filters.svg#filter-id");

/* <filter-function> values */
filter: blur(5px);    						//将高斯模糊应用于输入图像
filter: brightness(0.4);					//函数将线性乘法器应用于输入图像，使其看起来或多或少地变得明亮
filter: contrast(200%);						//调整输入图像的对比度
filter: drop-shadow(16px 16px 20px blue);	 //函数对输入图像应用阴影效果
filter: grayscale(50%);						//改变输入图像灰度
filter: hue-rotate(90deg);					//输入图像上应用色相旋转
filter: invert(75%);						//函数反转输入图像
filter: opacity(25%);						//图像的透明程度
filter: saturate(30%);						//转换图像饱和度
filter: sepia(60%);							//将图像转换为深褐色

/* Multiple filters */
filter: contrast(175%) brightness(3%);

/* Use no filter */
filter: none;

/* Global values */
filter: inherit;
filter: initial;
filter: revert;
filter: unset;

```

## 3.`drop-shadow`改变纯色图片颜色

通过子元素绝对定位

```html
  <div style="position: relative;;width: 64px;height: 64px;overflow: hidden;">
        <img  style="position: absolute;width: 64px;height: 64px;left: -64px;filter: drop-shadow(64px 0 red);" src="./home.png" 				alt="home"/>
   </div>
```


  <img style="width: 64px;height: 64px;left: -64px" src="/home.png" alt="home"/>
<div style="position: relative;;width: 64px;height: 64px;overflow: hidden;">
        <img  style="position: absolute;width: 64px;height: 64px;left: -64px;filter: drop-shadow(64px 0 red);" src="/home.png" 				alt="home"/>
   </div>
