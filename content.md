<!--
title: stylus-tutorial
description: a full tutorial of stylus
-->

#### CSS 预处理工具

Stylus 详解
=======

#### [@meathill](https://weibo.com/meathill/)

<!-- page -->

{{> author}}

<!-- page -->

## 教学目标

1. 了解使用预处理工具的必要性
2. 了解选择 Stylus 的原因
3. 学会 Stylus 的常见用法
4. 学会一些日常用法

<!-- page -->

## 课程大纲

1. 什么是 CSS 预处理？
2. 为什么选择 Stylus？
3. Stylus 入门
4. Stylus 进阶
5. Stylus 生态

<!-- page -->

## 什么是 CSS 预处理

<!-- page -->

### CSS 五大里程碑

1. Firebug
2. Chrome
3. CSS3
4. **预处理**
5. Flexbox & Grid

<!-- page -->

### CSS 开发的问题

1. 缺少可编程性
2. 浏览器存在兼容性差异

<!-- page -->

### 预处理器的目标

1. 增加逻辑、循环、函数，提高复用性
2. 增加编译打包，提供模块管理
3. 自动多平台处理
4. 提前使用新功能
4. 提供其它语法糖

<!-- section -->

总之，CSS 预处理工具的目的是提高 CSS 的开发效率。

<!-- page -->

## 为什么选择 Stylus？

<!-- page -->

### 常见预处理工具

1. LESS
2. SASS + Compass
3. Stylus
4. PostCSS

<!-- page -->

对战开始！

<!-- section -->

### Round 1: Sass vs LESS

### 胜利者：Sass

<!-- section -->

### Round 2: Sass vs Stylus

### 胜利者：Stylus

<!-- page -->

### Round 3: Stylus vs PostCSS

### 势均力敌

1. 都用 JS 实现
2. 都支持扩展

<!-- section -->

Stylus 的优势：

1. 语法上，无限接近 JS
2. 极尽简化，又向上兼容
3. 强力的 `@extend`

<!-- section -->

PostCSS 的优势：

1. 速度快
2. 可配置，插件丰富
3. 语法完全等同 CSS

<!-- section -->

我选择 Stylus 的原因：

1. 语法简单
2. 功能够用，不需要复杂的配置

Note:
我觉得如果你喜欢 React，应该就会喜欢 PostCSS。实际上，阿里系似乎的确推崇 PostCSS。

<!-- page -->

## Stylus 入门

<!-- page -->

```stylus
body
  font 12px Helvetica, Arial, sans-serif

a.button
  border-radius 5px
```

编译为

```css
body {
  font: 12px Helvetica, Arial, sans-serif;
}
a.button {
  border-radius: 5px;
}
```

<!-- page -->

### 嵌套

```stylus
.foo
  color red

  .bar
    color blue
```

编译为：

```css
.foo {
  color: red;
}
.foo .bar {
  color: blue;
}
```

<!-- section -->

### 引用嵌套

```stylus
a
  color red

  &:hover
    color yellow
```

编译为：

```css
a {
  color: red;
}
a:hover {
  color: yellow;
}
```

<!-- page -->

### 变量

```stylus
$font-size = 14px

body
  font-size $font-size
```

编译为：

```css
body {
  font-size: 14px;
}
```

<!-- page -->

### 命令行工具

安装

```bash
npm install stylus -g
```

使用

```bash
stylus [options] [文件|目录...] -o css/
```

<!-- section -->

常用 options

* **-i, --interactive**  启动一个交互工具
* **-U, --inline**  把图片转换成 Data URI
* **-w, --watch**  监测文件状态，自动重编译
* **-c, --compress**  压缩输出的 CSS
* **-m, --sourcemap**  生成 SourceMap
* **--include-css**  输出文件中包含 `@import` 导入的 CSS

<!-- page -->

### 游乐场

* [官方游乐场](http://stylus-lang.com/try.html#?code=body%20%7B%0A%20%20font%3A%2014px%2F1.5%20Helvetica%2C%20arial%2C%20sans-serif%3B%0A%20%20%23logo%20%7B%0A%20%20%20%20border-radius%3A%205px%3B%0A%20%20%7D%0A%7D)

<!-- page -->

## Stylus 进阶

<!-- page -->

### 日常

`package.json`

```json
{
  "scripts": {
    "stylus": "mkdir css & stylus -m -w styl/screen.styl -o css/"
  }
}
```

<!-- page -->

### Gulp

```bash
npm i gulp-stylus gulp-clean-css -D
```

gulpfile.js

```javascript
gulp.task('stylus', () => {
  return gulp.src('./styl/screen.styl')
    .pipe(stylus({
      compress: true,
      'include css': true
    }))
    .pipe(cleanCSS({
      level: 2,
      rebaseTo: 'css/'
    }))
    .pipe(gulp.dest(DEST + 'css/'));
});
```

<!-- page -->

### 选择器 `^[N..M]`

```stylus
a
  b
    c
      d
        font-size 14px

        .abc ^[-1..-1]:hover
          color red
```

编译为：

```css
a b c d {
  font-size: 14px;
}
.abc d:hover {
  color: #f00;
}
```

[Playground](http://stylus-lang.com/try.html#?code=a%0A%20%20b%0A%20%20%20%20c%0A%20%20%20%20%20%20d%0A%20%20%20%20%20%20%20%20font-size%2014px%0A%0A%20%20%20%20%20%20%20%20.abc%20%5E%5B-1..-1%5D%3Ahover%0A%20%20%20%20%20%20%20%20%20%20color%20red)

<!-- page -->

### 引用属性值

```stylus
p
  margin 10px
  padding (@margin / 2)
```

编译为：

```css
p {
  margin: 10px;
  padding: 5px;
}
```

<!-- section -->

适用场景：用绝对定位居中

```stylus
#logo
  position absolute
  top 50%
  left 50%
  width 150px
  height 80px
  margin-left -(@width / 2)
  margin-top -(@height / 2)
  margin (-@height / 2) 0 0 (-@width / 2)
```

<!-- page -->

### 循环

```stylus
for n in 1..10
  .col-{n}
    width 10% * n
```

编译成

```css
.col-1 {
  width: 10%;
}
.col-2 {
  width: 20%;
}
....
```

<!-- section -->

适用场景：[日历组件](https://meathill-freelance.github.io/date-picker/)

```stylus
for n in (0..6)
  saturday = 8 - n
  sunday = 9 - n

  &.empty-{n}
    flex n n 14.285714%*n
    min-width 14.285714%*n
    max-width 100%

    ~ :nth-child(7n + {saturday}),
    ~ :nth-child(7n + {sunday})
      color orange
```

<!-- section -->

适用场景：[spin](https://codepen.io/meathill/pen/xLwQaX?editors=0100)

```stylus
.bar
  animation shousuo 1s ease-in-out infinite

  for n in 1..5
    &:nth-child({n})
      animation-delay .1s * n
```

其它 [spinkit](http://tobiasahlin.com/spinkit/)

<!-- page -->

### 条件判断 `if/else`

```stylus
$need-support-ie = true

body
  if $need-support-ie
    padding 5px
  else
    margin 5px
```

编译为

```css
body {
  padding: 5px;
}
```

<!-- page -->

### Mixin & Functions

```stylus
border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius(5px) // function
  border-radius 5px // mixin
```

编译为：

```css
form input[type=button] {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
```

<!-- section -->

### 全部参数 `args...`

```stylus
box-shadow(args...)
   -webkit-box-shadow args
   -moz-box-shadow args
   box-shadow args

 #login
   box-shadow 1px 2px 5px #eee
```

编译为：

```css
#login {
  -webkit-box-shadow: 1px 2px 5px #eee;
  -moz-box-shadow: 1px 2px 5px #eee;
  box-shadow: 1px 2px 5px #eee;
}
```

<!-- page -->

实例：开发过渡效果墙

<!-- section -->

我的观点：

1. 预处理工具是必须的
2. 预处理工具只能锦上添花，CSS 更重要
3. 学会学习，学会积累

<!-- page -->

### 内建函数

* 颜色函数，如`darken`/`lighten`
* 嵌入图片 `embedurl`
* 添加前缀 `+prefix-classes(prefix)`

<!-- section -->

### 颜色函数

```stylus
.btn-primary
  background-color $primary-color
  border-color darken($primary-color, 15%)

.link
  color red

  &:hover
    color lighten(red, 10%)
```

[以及其它....](http://stylus-lang.com/docs/bifs.html)

<!-- section -->

### 嵌入图片

```stylus
background: embedurl('logo.png')
// => background: url("data:image/png;base64,…")

background: embedurl('logo.svg', 'utf8')
// => background: url("data:image/svg+xml;charset=utf-8,…")
```

<!-- section -->

### 添加前缀

```stylus
+prefix-classes('.tqb-dp-')
  .header
    height 2.5rem

    .back-button
      color white
```

```css
.tqb-dp-header {
  height: 2.5rem;
}
.tqb-dp-header .tqb-dp-back-button {
  color: white;
}
```

适用场景：独立组件

<!-- page -->

## 生态

<!-- page -->

### [Nib](http://tj.github.io/nib/)

1. Nib 是 Stylus 样式库，用于将样式进行兼容性处理
2. 类似 Compass

<!-- section -->

### 渐变色

```stylus
@import 'nib'

body
  background linear-gradient(top, white, black)
```

编译为：

```css
body {
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0, #fff), color-stop(1, #000));
  background: -webkit-linear-gradient(top, #fff 0%, #000 100%);
  background: -moz-linear-gradient(top, #fff 0%, #000 100%);
  background: linear-gradient(top, #fff 0%, #000 100%);
}
```

<!-- section -->

### position

```stylus
#back-to-top
  fixed bottom right
```

编译为

```css
#back-to-top {
  position: fixed;
  right: 0;
  bottom: 0;
}
```

<!-- page -->

### [animate.css](https://daneden.github.io/animate.css/)

1. 动画库
2. 可以和 Vue 连用

<!-- page -->

### [Magic animation](https://www.minimamente.com/example/magic_animations/)

1. 动画库
2. 可以和 Vue 连用

<!-- page -->

### [列表动画](http://ademilter.com/lab/liffect/)

1. 动画生成器
2. 需要自己集成到项目里

<!-- page -->

### [页面切换动画](https://tympanus.net/Development/PageTransitions/)

1. 动画库
2. 可以和 Vue 连用

<!-- page -->

### [CSS 形状](https://css-tricks.com/examples/ShapesOfCSS/)

1. CSS 资源
2. 你可以把它转换成 Stylus 库

<!-- page -->

## CSS 小技巧

<!-- page -->

### 固定比例的容器

```stylus
.intrinsic-ratio-box
  height 0
  padding-bottom 20%
  position relative

  .real-container
    absolute top left
    width 100%
    height 100%
```

<!-- page -->

### 视觉上不可见

屏幕上不可见，但对搜索引擎和阅读器可见。

```stylus
.visually-hidden
  border 0
  clip rect(0,0,0,0)
  position absolute
  width 1px
  height 1px
  margin -1px
  overflow hidden
  padding 0
```

<!-- page -->

## 一些实践经验

1. 变量前加 `$`，如 `$border-color`
2. 少用 `@extend`，多用 mixin
3. 平时注意积累，无论是库、插件、还是代码片段
4. 适当分文件，组织代码 [例子](https://github.com/meathill/Meart/tree/master/styl)

<!-- page -->

Q&A

<!-- page -->

参考阅读：


* [Stylus 官方文档](http://stylus-lang.com/)
* [Sass vs LESS](https://css-tricks.com/sass-vs-less/)
* [Stylus vs PostCSS](https://www.slant.co/versus/762/767/~stylus_vs_postcss)